import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BorrowingDto, ReturnBorrowingDto } from './dto';
@Injectable()
export class BorrowingService {
  constructor(private readonly prisma: PrismaService) {}

  async borrow(borrowingDto: BorrowingDto) {
    const { userId, bookId, dueDate } = borrowingDto;
    return this.prisma.$transaction(async (tx) => {
      // check user status
      const user = await tx.user.findFirst({
        where: { id: userId, status: 0, deleted: false },
      });
      if (!user) {
        throw new BadRequestException('用户不存在');
      }
      // check book status and available copies
      const book = await tx.book.findFirst({
        where: {
          id: bookId,
          status: 1,
          deleted: false,
        },
      });
      if (!book) {
        throw new BadRequestException('书籍不存在');
      }
      if (book.availableCopies <= 0) {
        throw new BadRequestException('书籍已借完');
      }

      const borrowing = await tx.borrowing.create({
        data: {
          userId,
          bookId,
          dueDate,
          status: 0,
        },
      });

      await tx.book.update({
        where: { id: bookId },
        data: { availableCopies: { decrement: 1 } },
      });

      return borrowing;
    });
  }

  async returnBook(returnBorrowingDto: ReturnBorrowingDto) {
    const { isbn, username } = returnBorrowingDto;

    return this.prisma.$transaction(async (tx) => {
      // find user
      const user = await tx.user.findFirst({
        where: { username, deleted: false },
      });

      if (!user) {
        throw new BadRequestException('用户不存在');
      }

      // find book
      const book = await tx.book.findFirst({
        where: {
          isbn,
          deleted: false,
        },
      });

      if (!book) {
        throw new BadRequestException('书籍不存在');
      }

      // find borrowing
      const borrowing = await tx.borrowing.findFirst({
        where: {
          userId: user.id,
          bookId: book.id,
          status: 0,
          deleted: false,
        },
      });

      if (!borrowing) {
        throw new BadRequestException('借阅记录不存在');
      }

      const now = new Date();
      const status = now > borrowing.dueDate ? 2 : 1;

      // update borrowing
      const [updatedBorrowing] = await Promise.all([
        tx.borrowing.update({
          where: { id: borrowing.id },
          data: { status },
        }),
        tx.book.update({
          where: { id: book.id },
          data: { availableCopies: { increment: 1 } },
        }),
      ]);

      return updatedBorrowing;
    });
  }

  /** 获取用户借阅记录 */
  async getUserBorrowing(userId: number) {
    const list = await this.prisma.borrowing.findMany({
      where: { userId, deleted: false },
      include: {
        book: true,
        user: true,
      },
      orderBy: {
        borrowDate: 'desc',
      },
    });

    return list;
  }

  /** 获取逾期借阅记录 */
  async getOverdueBorrowing() {
    const now = new Date();
    return this.prisma.borrowing.findMany({
      where: {
        status: 0,
        dueDate: { lt: now },
        deleted: false,
      },
      include: {
        user: true,
        book: true,
      },
    });
  }
}
