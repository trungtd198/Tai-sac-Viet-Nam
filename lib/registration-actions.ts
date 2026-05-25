"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { hasUploadFile, uploadImage } from "@/lib/supabase-storage";

function readString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

const registrationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9+\-\s()]{8,20}$/),
  address: z.string().min(5),
  description: z.string().min(20)
});

export async function submitRegistrationAction(formData: FormData) {
  const parsed = registrationSchema.safeParse({
    fullName: readString(formData, "fullName"),
    email: readString(formData, "email"),
    phone: readString(formData, "phone"),
    address: readString(formData, "address"),
    description: readString(formData, "description")
  });

  if (!parsed.success) {
    redirect("/dang-ky-du-thi?error=validation");
  }

  const imageFile = formData.get("image");
  if (!hasUploadFile(imageFile)) {
    redirect("/dang-ky-du-thi?error=image");
  }

  let imageUrl: string;

  try {
    imageUrl = await uploadImage(imageFile, "registrations");

    await db.registration.create({
      data: {
        ...parsed.data,
        imageUrl
      }
    });
  } catch (error) {
    console.error("Failed to submit registration", error);
    redirect("/dang-ky-du-thi?error=server");
  }

  revalidatePath("/admin/registrations");
  redirect("/dang-ky-du-thi?submitted=1");
}
