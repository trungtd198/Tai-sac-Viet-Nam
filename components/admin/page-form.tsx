import { Page, PublishStatus } from "@prisma/client";
import { blockTemplates } from "@/lib/blocks";
import { savePageAction } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PageFormProps = {
  page?: Page;
};

export function PageForm({ page }: PageFormProps) {
  const blocks = page?.blocks || blockTemplates;

  return (
    <form action={savePageAction} className="grid gap-6">
      <input type="hidden" name="id" value={page?.id || ""} />
      <Card>
        <CardHeader>
          <CardTitle>{page ? "Sửa trang" : "Tạo trang mới"}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input id="title" name="title" defaultValue={page?.title || ""} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Đường dẫn</Label>
            <Input id="slug" name="slug" defaultValue={page?.slug || ""} placeholder="gioi-thieu" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Trạng thái</Label>
            <select
              id="status"
              name="status"
              defaultValue={page?.status || PublishStatus.DRAFT}
              className="h-11 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value={PublishStatus.DRAFT}>Bản nháp</option>
              <option value={PublishStatus.PUBLISHED}>Đã xuất bản</option>
            </select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="seoTitle">Tiêu đề SEO</Label>
            <Input id="seoTitle" name="seoTitle" defaultValue={page?.seoTitle || ""} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="seoDescription">Mô tả SEO</Label>
            <Textarea id="seoDescription" name="seoDescription" defaultValue={page?.seoDescription || ""} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Khối nội dung</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Textarea
            name="blocks"
            className="min-h-[520px] font-mono text-xs"
            defaultValue={JSON.stringify(blocks, null, 2)}
            required
          />
          <p className="text-sm text-muted-foreground">
            Các khối được lưu dưới dạng JSON để có thể thêm, xóa, sắp xếp lại và tái sử dụng mà không cần sửa code.
          </p>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="submit">Lưu trang</Button>
      </div>
    </form>
  );
}
