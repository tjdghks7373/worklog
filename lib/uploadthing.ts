import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerSession } from 'next-auth';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // 로그인 체크 (나중에 확장 가능)
      const session = await getServerSession();

      if (!session?.user) {
        throw new Error('Unauthorized');
      }

      return {
        userEmail: session.user.email,
      };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        url: file.url,
        userEmail: metadata.userEmail,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
