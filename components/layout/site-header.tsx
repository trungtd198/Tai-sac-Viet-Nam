import { getBrand, getNavigation } from "@/lib/cms";
import { NavbarClient } from "@/components/layout/navbar-client";

export async function SiteHeader() {
  const [brand, navigation] = await Promise.all([getBrand(), getNavigation()]);
  const registerItem = navigation.find(
    (item) => item.href === "/dang-ky-du-thi" || item.href === "/register"
  ) || { id: "register", label: "Đăng ký dự thi", href: "/dang-ky-du-thi" };
  const ticketItem = navigation.find((item) => item.href === "/dat-ve") || {
    id: "tickets",
    label: "Đặt vé",
    href: "/dat-ve"
  };
  const primaryHrefs = new Set(["/", "/lich-trinh", "/ung-vien", "/tin-tuc", "/doi-tac"]);
  const primaryNavigation = navigation.filter((item) => primaryHrefs.has(item.href));

  return (
    <NavbarClient
      brand={brand}
      navigation={primaryNavigation.length ? primaryNavigation : navigation.filter((item) => item.href !== registerItem.href)}
      ticketItem={ticketItem}
      registerItem={registerItem}
    />
  );
}
