import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageForm } from "@/components/admin/page-form";

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const page = await db.page.findUnique({
    where: { id: params.id }
  });

  if (!page) {
    notFound();
  }

  return <PageForm page={page} />;
}
