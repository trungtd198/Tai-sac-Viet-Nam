import { redirect } from "next/navigation";

// /register redirects to canonical URL /dang-ky-du-thi
export default function RegisterRedirectPage() {
  redirect("/dang-ky-du-thi");
}
