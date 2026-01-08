import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { getServerSession } from 'next-auth';

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({
    image: { maxFileSize: '8MB', maxFileCount: 5 },
  })
    .middleware(async () => {
      const session = await getServerSession();
      if (!session) throw new Error('Unauthorized');

      return {
        userId: session.user?.email,
      };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        url: file.url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;
