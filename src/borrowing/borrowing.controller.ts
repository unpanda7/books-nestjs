import { Controller, Post, Res, Body, Get, Query } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { ApiOperation, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { BorrowingDto, ReturnBorrowingDto } from './dto';
import { Response } from 'express';

@ApiTags('借还')
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post('borrow')
  @ApiOperation({ summary: '借书' })
  @ApiBody({ type: BorrowingDto })
  @ApiResponse({ status: 200, description: '借书成功' })
  async borrow(@Body() borrowingDto: BorrowingDto, @Res() res: Response) {
    const borrowing = await this.borrowingService.borrow(borrowingDto);
    res.status(200).json(borrowing);
  }

  @Post('return')
  @ApiOperation({ summary: '还书' })
  @ApiBody({ type: BorrowingDto })
  @ApiResponse({ status: 200, description: '还书成功' })
  async return(@Body() borrowingDto: ReturnBorrowingDto, @Res() res: Response) {
    const borrowing = await this.borrowingService.returnBook(borrowingDto);
    res.status(200).json(borrowing);
  }

  @Get('user')
  @ApiOperation({ summary: '获取用户借阅记录' })
  @ApiResponse({ status: 200, description: '获取用户借阅记录成功' })
  async getUserBorrowing(
    @Query() query: { userId: number },
    @Res() res: Response,
  ) {
    const borrowing = await this.borrowingService.getUserBorrowing(
      query.userId,
    );
    res.status(200).json(borrowing);
  }

  @Get('overdue')
  @ApiOperation({ summary: '获取逾期借阅记录' })
  @ApiResponse({ status: 200, description: '获取逾期借阅记录成功' })
  async getOverdueBorrowing(@Res() res: Response) {
    const borrowing = await this.borrowingService.getOverdueBorrowing();
    res.status(200).json(borrowing);
  }
}
