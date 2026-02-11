# 🎉 Supabase + Prisma 연동 완료 가이드

## 📌 설정 요약

프로젝트에 **Supabase PostgreSQL** + **Prisma ORM** 연동이 완료되었습니다.

## 🔧 설치된 패키지

```json
"@prisma/client": "^5.x"
"prisma": "^5.x"
"dotenv-cli": "^7.x"
```

## 📁 생성된 파일 구조

```
prisma/
├── schema.prisma          ← 데이터베이스 스키마

lib/
├── prisma.ts              ← Prisma 클라이언트 싱글톤
├── auth.ts                ← NextAuth + Prisma 통합
└── worklogExamples.ts     ← 사용 예제

app/api/
├── worklog/
│   ├── route.ts           ← GET/POST 워크로그 API
│   └── [id]/route.ts      ← GET/PUT/DELETE 워크로그 API
└── auth/[...nextauth]/
    └── route.ts           ← 업데이트됨 (Prisma 통합)

types/
├── worklog.ts             ← 업데이트됨
└── next-auth.d.ts         ← 새로 생성
```

## 🚀 빠른 시작

### 1️⃣ 개발 서버 시작
```bash
npm run dev
```

### 2️⃣ Prisma Studio 열기 (GUI 데이터베이스 관리)
```bash
npm run prisma:studio
```

### 3️⃣ 새 마이그레이션 생성
```bash
npm run prisma:migrate
```

## 💾 데이터베이스 스키마

### User (사용자)
```typescript
{
  id: string (기본 키)
  email: string (고유)
  name?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}
```

### Worklog (작업 로그)
```typescript
{
  id: string (기본 키)
  title: string
  content?: string
  imageUrl?: string
  startTime?: Date
  endTime?: Date
  duration?: number (분 단위)
  tags: string[]
  status: 'draft' | 'completed' | 'archived'
  userId: string (외래 키)
  createdAt: Date
  updatedAt: Date
}
```

## 🔌 API 엔드포인트

### Worklog API

| 메소드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/worklog` | 모든 워크로그 조회 |
| POST | `/api/worklog` | 새 워크로그 생성 |
| GET | `/api/worklog/[id]` | 특정 워크로그 조회 |
| PUT | `/api/worklog/[id]` | 워크로그 수정 |
| DELETE | `/api/worklog/[id]` | 워크로그 삭제 |

## 💻 코드 예제

### 1. 워크로그 생성
```typescript
// Server Action 또는 API 클라이언트에서
const response = await fetch('/api/worklog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: '오늘의 작업',
    content: '작업 설명',
    userId: session.user.id,
    tags: ['개발', '버그수정'],
    status: 'draft'
  })
});
```

### 2. 사용자의 워크로그 조회
```typescript
import { prisma } from '@/lib/prisma';

const worklogs = await prisma.worklog.findMany({
  where: { userId: 'user-id' },
  include: { user: true },
  orderBy: { createdAt: 'desc' }
});
```

### 3. React 컴포넌트에서 사용
```typescript
'use client';
import { useEffect, useState } from 'react';
import type { WorkLog } from '@/types/worklog';

export function WorklogList() {
  const [worklogs, setWorklogs] = useState<WorkLog[]>([]);

  useEffect(() => {
    fetch('/api/worklog')
      .then(res => res.json())
      .then(data => setWorklogs(data));
  }, []);

  return (
    <div>
      {worklogs.map(log => (
        <div key={log.id}>
          <h3>{log.title}</h3>
          <p>{log.content}</p>
          <small>{new Date(log.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}
```

### 4. NextAuth 세션에서 사용자 정보
```typescript
import { getSession } from 'next-auth/react';

export async function SomeComponent() {
  const session = await getSession();
  
  if (!session?.user?.id) {
    return <p>로그인이 필요합니다.</p>;
  }

  // session.user.id가 자동으로 Prisma User와 연동됨
  const userWorklogs = await prisma.worklog.findMany({
    where: { userId: session.user.id }
  });

  return <pre>{JSON.stringify(userWorklogs, null, 2)}</pre>;
}
```

## 🔐 보안 설정 확인

✅ DATABASE_URL은 `.env`에 안전하게 저장됨
✅ `.env` 파일은 `.gitignore`에 포함되어 커밋 제외
✅ NextAuth 시크릿 설정됨
✅ HTTPS SSL 연결 활성화됨

## 🧪 테스트 방법

### 1. API 직접 테스트
```bash
# 모든 워크로그 조회
curl http://localhost:3000/api/worklog

# 새 워크로그 생성
curl -X POST http://localhost:3000/api/worklog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "content": "Test content",
    "userId": "test-user-id"
  }'
```

### 2. Prisma Studio에서 테스트
```bash
npm run prisma:studio
# http://5555 포트에서 GUI 열림
```

## 🔄 마이그레이션 워크플로우

스키마 변경 후:

```bash
# 1. schema.prisma 수정
# 예: new field 추가

# 2. 마이그레이션 생성
npm run prisma:migrate

# 3. 마이그레이션 이름 입력 (예: "add_new_field")

# 4. Prisma Client 재생성 (자동)

# 5. 변경사항 확인
npm run prisma:studio
```

## 📚 추가 리소스

- [Prisma 문서](https://www.prisma.io/docs/)
- [Supabase 문서](https://supabase.com/docs)
- [Next.js 문서](https://nextjs.org/docs)
- [NextAuth.js 문서](https://next-auth.js.org)

## ⚠️ 주의사항

1. **프로덕션 배포 시**: DATABASE_URL을 환경 변수로 설정해야 함
2. **스키마 변경**: 반드시 마이그레이션을 통해 진행
3. **데이터 삭제**: DELETE는 신중하게 사용 (onDelete: Cascade 설정됨)

## 🆘 문제 해결

### Prisma Client 에러
```bash
npm run prisma:generate
```

### 데이터베이스 연결 실패
1. `.env`에서 DATABASE_URL 확인
2. Supabase에서 DB 연결 상태 확인
3. 방화벽/네트워크 확인

### 타입 에러
```bash
npm run build
```

---

**✨ 이제 Supabase + Prisma를 사용할 준비가 완료되었습니다!**
