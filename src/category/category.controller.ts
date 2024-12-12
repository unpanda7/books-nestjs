import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { QueryCategoryDto, CreateCategoryDto } from './dto';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '获取分类列表' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @Get()
  async findAll(@Query() query: QueryCategoryDto, @Res() res: Response) {
    const items = await this.categoryService.findAll(query);
    return res.status(200).json({ message: '获取成功', data: items });
  }

  @ApiOperation({ summary: '获取分类详情' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const items = await this.categoryService.findOne(+id);
    return res.status(200).json({ message: '获取成功', data: items });
  }

  @ApiOperation({ summary: '创建分类' })
  @ApiBody({ type: CreateCategoryDto, description: '分类信息' })
  @ApiResponse({ status: 200, description: '创建成功' })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    const items = await this.categoryService.create(createCategoryDto);
    return res.status(200).json({ message: '创建成功', data: items });
  }

  @ApiOperation({ summary: '更新分类' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiBody({ type: CreateCategoryDto, description: '分类信息' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    const items = await this.categoryService.update(+id, updateCategoryDto);
    return res.status(200).json({ message: '更新成功', data: items });
  }

  @ApiOperation({ summary: '删除分类' })
  @ApiParam({ name: 'id', description: '分类ID' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const items = await this.categoryService.delete(+id);
    return res.status(200).json({ message: '删除成功', data: items });
  }
}
