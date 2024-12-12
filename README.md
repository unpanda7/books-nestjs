# 图书管理系统 API

基于 NestJS + Prisma + PostgreSQL 开发的图书管理系统后端 API。

## 技术栈

- NestJS 8.x
- Prisma 6.x
- PostgreSQL
- TypeScript 4.x
- Swagger/OpenAPI
- Zod (数据验证)

## 功能特性

- 图书管理 (CRUD)
- 分类管理
- 借还书管理
- 用户管理
- API 文档 (Swagger)
- 数据验证 (Zod)
- 数据库迁移

## 开始使用

### 环境要求

- Node.js 16+
- PostgreSQL
- pnpm/npm/yarn

### 安装

bash
安装依赖
pnpm install
配置环境变量
cp .env.example .env
编辑 .env 文件，配置数据库连接等信息
数据库迁移
pnpm prisma migrate dev
运行开发服务器
pnpm start:dev