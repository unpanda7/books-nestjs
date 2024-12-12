import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const BorrowingSchema = z.object({
  userId: z.number(),
  bookId: z.number(),
  dueDate: z.date(),
});

export class BorrowingDto extends createZodDto(BorrowingSchema) {}

export const ReturnBorrowingSchema = z.object({
  isbn: z.string(),
  username: z.string(),
});

export class ReturnBorrowingDto extends createZodDto(ReturnBorrowingSchema) {}
