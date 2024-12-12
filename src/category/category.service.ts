import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryCategoryDto, CreateCategoryDto } from './dto';
@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryCategoryDto) {
    const { page, pageSize, name } = query;
    const skip = (page - 1) * pageSize;
    const where = {
      deleted: false,
      ...(name && { name: { contains: name } }),
    };
    const [total, categories] = await Promise.all([
      this.prisma.category.count({ where }),
      this.prisma.category.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          createAt: 'desc',
        },
      }),
    ]);

    return { total, page, pageSize, items: categories };
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
      },
    });
  }

  async update(id: number, updateCategoryDto: CreateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async delete(id: number) {
    return this.prisma.category.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
