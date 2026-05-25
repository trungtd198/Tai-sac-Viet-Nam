import Image from "next/image";
import { savePageBlocksAction } from "@/lib/admin-actions";
import { getAdminPageBlocks } from "@/lib/queries/page-blocks";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function getBlockImage(block: Awaited<ReturnType<typeof getAdminPageBlocks>>[number]) {
  if (block.media?.url) return block.media.url;

  const content = block.content;
  if (
    content &&
    typeof content === "object" &&
    !Array.isArray(content) &&
    "image" in content &&
    typeof content.image === "string"
  ) {
    return content.image;
  }

  return "";
}

function blockTypeLabel(type: string) {
  const labels: Record<string, string> = {
    HERO: "Hero",
    RICH_TEXT: "Nội dung",
    COUNTDOWN: "Đếm ngược",
    SCHEDULE: "Lịch trình",
    AWARDS: "Giải thưởng",
    NEWS: "Tin tức",
    PARTNERS: "Đối tác",
    VIDEO: "Video",
    GALLERY: "Thư viện ảnh",
    CTA: "Kêu gọi hành động"
  };

  return labels[type] || type;
}

export default async function AdminBlocksPage() {
  const blocks = await getAdminPageBlocks("home");

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        title="Khối trang chủ"
        description="Sắp xếp, ẩn/hiện và chỉnh nội dung JSON của các khối trên trang chủ."
      />

      <form action={savePageBlocksAction} className="grid gap-4">
        <input type="hidden" name="ids" value={JSON.stringify(blocks.map((block) => block.id))} />

        {blocks.map((block) => {
          const image = getBlockImage(block);

          return (
            <Card key={block.id} className="grid gap-5 p-5">
              {image ? (
                <div className="relative aspect-[16/5] overflow-hidden rounded-lg border border-border bg-muted">
                  <Image
                    src={image}
                    alt={block.title || blockTypeLabel(block.type)}
                    fill
                    sizes="(min-width: 768px) 70vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              ) : null}

            <div className="grid gap-4 md:grid-cols-[120px_1fr_120px_auto] md:items-end">
              <div className="grid gap-2">
                <Label>Loại</Label>
                <Input value={blockTypeLabel(block.type)} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`title_${block.id}`}>Tiêu đề</Label>
                <Input id={`title_${block.id}`} name={`title_${block.id}`} defaultValue={block.title || ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`order_${block.id}`}>Thứ tự</Label>
                <Input
                  id={`order_${block.id}`}
                  name={`order_${block.id}`}
                  type="number"
                  defaultValue={block.order}
                />
              </div>
              <label className="flex h-11 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium">
                <input
                  type="checkbox"
                  name={`isActive_${block.id}`}
                  defaultChecked={block.isActive}
                />
                Hiển thị
              </label>
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`image_${block.id}`}>Tải ảnh lên</Label>
              <Input id={`image_${block.id}`} name={`image_${block.id}`} type="file" accept="image/*" />
              {block.media?.url ? (
                <p className="text-xs text-muted-foreground">URL hiện tại: {block.media.url}</p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`content_${block.id}`}>Nội dung JSON</Label>
              <Textarea
                id={`content_${block.id}`}
                name={`content_${block.id}`}
                className="min-h-44 font-mono text-xs"
                defaultValue={JSON.stringify(block.content, null, 2)}
              />
            </div>
            </Card>
          );
        })}

        {blocks.length === 0 ? (
          <Card className="p-5 text-sm text-muted-foreground">Chưa có khối trang chủ.</Card>
        ) : null}

        <div className="flex justify-end">
          <Button type="submit">Lưu khối</Button>
        </div>
      </form>
    </div>
  );
}
