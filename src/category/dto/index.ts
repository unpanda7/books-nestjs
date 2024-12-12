import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, '名称不能为空'),
  description: z.string().optional(),
});

export const queryCategorySchema = z.object({
  name: z.string().optional(),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
});

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}
export class QueryCategoryDto extends createZodDto(queryCategorySchema) {}
