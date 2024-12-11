import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto, QueryBookDto, UpdateBookDto } from './dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryBookDto) {
    const { page, pageSize, categoryId, keyword } = query;
    const skip = (page - 1) * pageSize;

    const where = {
      deleted: false,
      ...(categoryId && { categoryId }),
      ...(keyword && {
        OR: [
          { title: { contains: keyword } },
          { author: { contains: keyword } },
          { isbn: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      }),
    };

    const [total, books] = await Promise.all([
      this.prisma.book.count({ where }),
      this.prisma.book.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { total, page, pageSize, items: books };
  }

  async findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async create(createBookDto: CreateBookDto) {
    const book = await this.prisma.book.create({
      data: {
        ...createBookDto,
        isbn: createBookDto.isbn || '',
        title: createBookDto.title || '',
      },
    });

    return book;
  }

  async delete(id: number) {
    return this.prisma.book.update({
      where: { id },
      data: { deleted: true },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    // 是否存在
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException('书籍不存在');
    }

    const books = this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });

    return books;
  }
}
