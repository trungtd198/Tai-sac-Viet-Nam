import Link from "next/link";
import { Blocks, CalendarDays, Handshake, Home, Images, LogOut, Newspaper, UserRoundCheck } from "lucide-react";
import { logoutAction } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Tổng quan", icon: Home },
  { href: "/admin/blocks", label: "Khối trang", icon: Blocks },
  { href: "/admin/posts", label: "Bài viết", icon: Newspaper },
  { href: "/admin/schedule", label: "Lịch trình", icon: CalendarDays },
  { href: "/admin/partners", label: "Đối tác", icon: Handshake },
  { href: "/admin/media", label: "Thư viện", icon: Images },
  { href: "/admin/registrations", label: "Đăng ký", icon: UserRoundCheck }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-card p-5 md:block">
        <Link href="/admin" className="text-lg font-bold">
          CMS Sự Kiện
        </Link>
        <nav className="mt-8 grid gap-1">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <form action={logoutAction} className="absolute bottom-5 left-5 right-5">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Button>
        </form>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur md:hidden">
          <div className="flex min-h-14 items-center justify-between px-4">
            <Link href="/admin" className="font-bold">
              CMS Sự Kiện
            </Link>
            <form action={logoutAction}>
              <Button variant="ghost" size="icon" aria-label="Đăng xuất">
                <LogOut className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-4 pb-3">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-md border border-border px-3 py-2 text-xs font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="container py-8">{children}</main>
      </div>
    </div>
  );
}
