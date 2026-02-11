# Supabase + Prisma 설정 가이드

## 1. 환경 변수 확인

`.env` 파일에 다음이 포함되어 있는지 확인하세요:

```env
# Supabase Database
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require"

# Next Auth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Upload Thing
UPLOADTHING_TOKEN=your_uploadthing_token
```

## 2. Prisma 초기화

```bash
# Prisma Client 생성
npm run prisma:generate

# 데이터베이스 마이그레이션
npm run prisma:migrate
```

마이그레이션 이름을 물어볼 때: `init`

## 3. Prisma Studio (선택사항)

데이터베이스를 GUI로 관리하려면:

```bash
npm run prisma:studio
```

## 4. API 엔드포인트

### Worklog API

- **GET** `/api/worklog` - 모든 워크로그 조회
- **POST** `/api/worklog` - 새 워크로그 생성
  ```json
  {
    "title": "작업 제목",
    "content": "작업 내용",
    "userId": "사용자 ID",
    "imageUrl": "https://...",
    "tags": ["tag1", "tag2"],
    "status": "draft" // draft, completed, archived
  }
  ```

- **GET** `/api/worklog/[id]` - 특정 워크로그 조회
- **PUT** `/api/worklog/[id]` - 워크로그 수정
- **DELETE** `/api/worklog/[id]` - 워크로그 삭제

## 5. NextAuth 통합

session에 `user.id`가 자동으로 추가됩니다.

```typescript
const session = await getSession();
const userId = session?.user?.id;
```

## 6. 데이터베이스 스키마

### User 테이블
- id: 고유 ID
- email: 이메일 (고유)
- name: 이름
- image: 프로필 이미지 URL

### Worklog 테이블
- id: 고유 ID
- title: 제목
- content: 내용
- imageUrl: 이미지 URL
- startTime: 시작 시간
- endTime: 종료 시간
- duration: 소요 시간 (분)
- tags: 태그 배열
- status: 상태 (draft, completed, archived)
- userId: 사용자 ID (외래키)
