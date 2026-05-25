"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";

type ThumbnailFieldProps = {
  defaultValue?: string;
};

export function ThumbnailField({ defaultValue = "" }: ThumbnailFieldProps) {
  const [thumbnail, setThumbnail] = useState(defaultValue);

  function handleUpload(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setThumbnail(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid gap-3">
      <Input
        value={thumbnail}
        onChange={(event) => setThumbnail(event.target.value)}
        placeholder="Dán URL ảnh hoặc tải ảnh lên"
      />
      <input type="hidden" name="thumbnail" value={thumbnail} />
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/60 px-4 py-5 text-sm font-medium hover:bg-muted">
        <ImagePlus className="h-4 w-4 text-primary" />
        Tải ảnh đại diện
        <input
          name="thumbnailFile"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => handleUpload(event.target.files?.[0])}
        />
      </label>
      {thumbnail ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted">
          <Image
            src={thumbnail}
            alt="Ảnh đại diện bài viết"
            fill
            unoptimized={thumbnail.startsWith("data:")}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      ) : null}
    </div>
  );
}
