import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // process.env에서 직접 가져오되, 타입스크립트 에러 방지를 위해 as string 추가
    url: process.env.DATABASE_URL as string,
  },
});