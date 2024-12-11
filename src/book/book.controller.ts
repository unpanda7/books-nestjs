import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, QueryBookDto, UpdateBookDto } from './dto';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: '获取所有书籍' })
  @ApiResponse({ status: 200, description: '成功获取所有书籍' })
  @Get()
  async findAll(@Query() query: QueryBookDto, @Res() res: Response) {
    const data = await this.bookService.findAll(query);
    return res.status(200).json({ message: '成功获取所有书籍', data });
  }

  @ApiOperation({ summary: '添加书籍' })
  @ApiBody({ type: CreateBookDto, description: '参数' })
  @ApiResponse({ status: 200, description: '添加成功' })
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    const data = await this.bookService.create(createBookDto);
    return res.status(200).json({ message: '添加成功', data });
  }

  @ApiOperation({ summary: '删除书籍' })
  @ApiParam({ name: 'id', description: '书籍ID' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const data = await this.bookService.delete(Number(id));
    return res.status(200).json({ message: '删除成功', data });
  }

  @ApiOperation({ summary: '获取书籍详情' })
  @ApiParam({ name: 'id', description: '书籍ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.bookService.findOne(Number(id));
    return res.status(200).json({ message: '获取成功', data });
  }

  @ApiOperation({ summary: '更新书籍' })
  @ApiParam({ name: 'id', description: '书籍ID' })
  @ApiBody({ type: UpdateBookDto, description: '参数' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ) {
    const data = await this.bookService.update(Number(id), updateBookDto);
    return res.status(200).json({ message: '更新成功', data });
  }
}
