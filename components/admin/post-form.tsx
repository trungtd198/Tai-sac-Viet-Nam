import { Post, PublishStatus } from "@prisma/client";
import { savePostAction } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ThumbnailField } from "@/components/admin/thumbnail-field";

type PostFormProps = {
  post?: Post;
};

function getContentHtml(post?: Post) {
  const content = post?.content;

  if (
    content &&
    typeof content === "object" &&
    !Array.isArray(content) &&
    "html" in content &&
    typeof content.html === "string"
  ) {
    return content.html;
  }

  return "";
}

export function PostForm({ post }: PostFormProps) {
  return (
    <form action={savePostAction} className="grid gap-6">
      <input type="hidden" name="id" value={post?.id || ""} />

      <Card>
        <CardHeader>
          <CardTitle>{post ? "Sửa bài viết" : "Tạo bài viết"}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input id="title" name="title" defaultValue={post?.title || ""} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Đường dẫn</Label>
            <Input id="slug" name="slug" defaultValue={post?.slug || ""} placeholder="khoi-dong-mua-thi" required />
          </div>

          <div className="grid gap-2">
            <Label>Ảnh đại diện</Label>
            <ThumbnailField defaultValue={post?.thumbnail || post?.coverImage || ""} />
          </div>

          <div className="flex items-center gap-3 rounded-md border border-border bg-muted/40 px-4 py-3">
            <input
              id="published"
              name="published"
              type="checkbox"
              defaultChecked={post?.status === PublishStatus.PUBLISHED}
              className="h-4 w-4"
            />
            <Label htmlFor="published">Đã xuất bản</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nội dung</CardTitle>
        </CardHeader>
        <CardContent>
          <RichTextEditor name="content" defaultValue={getContentHtml(post)} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">Lưu bài viết</Button>
      </div>
    </form>
  );
}
