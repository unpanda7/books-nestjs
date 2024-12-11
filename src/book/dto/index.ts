import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createBookSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  isbn: z.string().min(1, 'ISBN不能为空'),
  author: z.string().min(1, '作者不能为空'),
  publisher: z.string().optional(),
  publishDate: z.string().optional(),
  totalCopies: z.number().min(1, '总数量不能为空'),
  availableCopies: z.number().min(1, '可用数量不能为空'),
  location: z.string().optional(),
  status: z.number().default(1), // 0: 下架, 1: 正常
});

export const QueryBookSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
  categoryId: z.number().int().positive().optional(),
  keyword: z.string().optional(),
});

export class CreateBookDto extends createZodDto(createBookSchema) {}
export class QueryBookDto extends createZodDto(QueryBookSchema) {}
export class UpdateBookDto extends createZodDto(createBookSchema) {}