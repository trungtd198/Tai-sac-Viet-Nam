import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await db.post.findUnique({
    where: { id: params.id }
  });

  if (!post) {
    notFound();
  }

  return <PostForm post={post} />;
}
