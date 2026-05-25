import { saveBrandAction, saveNavigationAction } from "@/lib/admin-actions";
import { getBrand } from "@/lib/cms";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function NavigationPage() {
  const [brand, navigation] = await Promise.all([
    getBrand(),
    db.navigationItem.findMany({ orderBy: { order: "asc" } })
  ]);

  const items = navigation.map((item) => ({
    label: item.label,
    href: item.href,
    isActive: item.isActive
  }));

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Thương hiệu và điều hướng</h1>
        <p className="mt-1 text-sm text-muted-foreground">Quản lý header, footer và nhận diện website công khai.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Thương hiệu</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveBrandAction} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên website</Label>
              <Input id="name" name="name" defaultValue={brand.name} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tagline">Khẩu hiệu</Label>
              <Input id="tagline" name="tagline" defaultValue={brand.tagline || ""} />
            </div>
            <div>
              <Button type="submit">Lưu thương hiệu</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Mục điều hướng</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveNavigationAction} className="grid gap-4">
            <Textarea
              name="items"
              className="min-h-[320px] font-mono text-xs"
              defaultValue={JSON.stringify(items, null, 2)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Sắp xếp lại bằng cách di chuyển các object trong mảng. Dùng đường dẫn công khai như /gioi-thieu, /lich-trinh, /tin-tuc và /dang-ky-du-thi.
            </p>
            <div>
              <Button type="submit">Lưu điều hướng</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
