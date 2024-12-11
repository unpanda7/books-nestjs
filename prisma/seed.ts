// import { faker } from '@faker-js/faker';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   // 清空现有数据
//   await prisma.borrowing.deleteMany();
//   await prisma.book.deleteMany();
//   await prisma.category.deleteMany();
//   await prisma.user.deleteMany();

//   // 创建分类
//   const categories = await Promise.all(
//     Array(5)
//       .fill(null)
//       .map(() =>
//         prisma.category.create({
//           data: {
//             name: faker.commerce.department(),
//             description: faker.commerce.productDescription(),
//           },
//         }),
//       ),
//   );

//   // 创建用户
//   const users = await Promise.all(
//     Array(20)
//       .fill(null)
//       .map(() =>
//         prisma.user.create({
//           data: {
//             username: faker.internet.userName(),
//             password: faker.internet.password(),
//             realName: faker.person.fullName(), // 注意这里的改变
//             email: faker.internet.email(),
//             phone: faker.phone.number(),
//             userType: faker.number.int({ min: 0, max: 1 }), // 注意这里的改变
//             status: faker.number.int({ min: 0, max: 1 }),
//           },
//         }),
//       ),
//   );

//   // 创建图书
//   const books = await Promise.all(
//     Array(20)
//       .fill(null)
//       .map(() => {
//         const totalCopies = faker.number.int({ min: 1, max: 10 });
//         return prisma.book.create({
//           data: {
//             title: faker.lorem.words(3),
//             author: faker.person.fullName(),
//             isbn: faker.string.uuid(), // 注意这里的改变
//             categoryId:
//               categories[Math.floor(Math.random() * categories.length)].id,
//             totalCopies,
//             availableCopies: faker.number.int({ min: 0, max: totalCopies }),
//             location: faker.location.streetAddress(), // 注意这里的改变
//             status: faker.number.int({ min: 0, max: 1 }),
//           },
//         });
//       }),
//   );

//   // 创建借阅记录
//   await Promise.all(
//     Array(20)
//       .fill(null)
//       .map(() => {
//         const borrowDate = faker.date.past();
//         return prisma.borrowing.create({
//           data: {
//             userId: users[Math.floor(Math.random() * users.length)].id,
//             bookId: books[Math.floor(Math.random() * books.length)].id,
//             borrowDate,
//             dueDate: faker.date.future({ refDate: borrowDate }),
//             status: faker.number.int({ min: 0, max: 2 }),
//           },
//         });
//       }),
//   );

//   console.log('Seed data created successfully');
// }

// main()
//   .catch((e) => {
//     console.error('Error seeding data:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
