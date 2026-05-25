"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Send } from "lucide-react";
import { submitRegistrationAction } from "@/lib/registration-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function RegistrationForm({
  submitted,
  error
}: {
  submitted?: boolean;
  error?: string;
}) {
  const [preview, setPreview] = useState("");
  const errorMessage = getErrorMessage(error);

  function handlePreview(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) {
      setPreview("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <Card className="p-5 md:p-8">
      <form action={submitRegistrationAction} className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input id="fullName" name="fullName" placeholder="Nguyễn Văn A" minLength={2} required />
          </Field>

          <Field>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <Label htmlFor="phone">Điện thoại</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+84 900 000 000"
              pattern="[0-9+\-\s()]{8,20}"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="address">Địa chỉ</Label>
            <Input id="address" name="address" placeholder="Tỉnh/thành, quận/huyện, đường" minLength={5} required />
          </Field>
        </div>

        <Field>
          <Label htmlFor="image">Tải ảnh lên</Label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 px-5 py-8 text-center hover:bg-muted">
            <ImagePlus className="h-8 w-8 text-primary" />
            <span className="mt-3 text-sm font-semibold">Chọn ảnh</span>
            <span className="mt-1 text-xs text-muted-foreground">PNG, JPG, WEBP hoặc GIF</span>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
              required
              onChange={(event) => handlePreview(event.target.files?.[0])}
            />
          </label>
          {preview ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted">
              <Image
                src={preview}
                alt="Ảnh đăng ký đã chọn"
                fill
                unoptimized
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          ) : null}
        </Field>

        <Field>
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            name="description"
            minLength={20}
            required
            placeholder="Giới thiệu bản thân và lý do bạn muốn tham gia sự kiện."
          />
        </Field>

        {submitted ? (
          <p className="rounded-md bg-muted px-4 py-3 text-sm font-medium text-primary">
            Gửi hồ sơ đăng ký thành công.
          </p>
        ) : null}

        {errorMessage ? (
          <p className="rounded-md bg-muted px-4 py-3 text-sm font-medium text-primary">
            {errorMessage}
          </p>
        ) : null}

        <Button type="submit" className="gap-2">
          <Send className="h-4 w-4" />
          Gửi đăng ký
        </Button>
      </form>
    </Card>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-2">{children}</div>;
}

function getErrorMessage(error?: string) {
  if (error === "validation") return "Vui lòng kiểm tra lại thông tin và thử lại.";
  if (error === "image") return "Vui lòng tải lên ảnh hợp lệ.";
  if (error === "server") return "Gửi hồ sơ thất bại. Vui lòng thử lại sau.";
  return "";
}
