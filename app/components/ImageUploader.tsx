'use client';

import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

interface Props {
  onUpload: (url: string) => void;
}

export default function ImageUploader({ onUpload }: Props) {
  return (
    <UploadButton<OurFileRouter, 'imageUploader'>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (!res?.[0]) return;
        onUpload(res[0].url);
      }}
      onUploadError={(error) => {
        alert(error.message);
      }}
    />
  );
}
