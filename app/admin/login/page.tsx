import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { loginAction } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đăng nhập quản trị",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLoginPage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <CardTitle>Đăng nhập CMS</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue="admin@event.vn"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {searchParams.error ? (
              <p className="text-sm font-medium text-primary">Email hoặc mật khẩu không đúng.</p>
            ) : null}
            <Button type="submit">Đăng nhập</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
