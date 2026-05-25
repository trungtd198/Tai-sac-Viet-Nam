import { randomUUID } from "node:crypto";

function getStorageConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "product-images";

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase storage environment variables are missing.");
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/$/, ""),
    serviceRoleKey,
    bucket
  };
}

function getExtension(file: File) {
  const fromName = file.name.split(".").pop();
  if (fromName && fromName.length <= 8) return fromName.toLowerCase();

  return file.type.split("/").pop() || "jpg";
}

export function hasUploadFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

async function ensureBucket() {
  const { supabaseUrl, serviceRoleKey, bucket } = getStorageConfig();

  const response = await fetch(`${supabaseUrl}/storage/v1/bucket/${bucket}`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`
    }
  });

  if (response.ok) return;

  const createResponse = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: bucket,
      name: bucket,
      public: true,
      allowed_mime_types: ["image/png", "image/jpeg", "image/webp", "image/gif"]
    })
  });

  if (!createResponse.ok && createResponse.status !== 409) {
    const message = await createResponse.text();
    if (message.includes("already exists")) return;
    throw new Error(`Supabase bucket create failed: ${message}`);
  }
}

export async function uploadImage(file: File, folder: string) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  await ensureBucket();

  const { supabaseUrl, serviceRoleKey, bucket } = getStorageConfig();
  const extension = getExtension(file);
  const path = `${folder}/${randomUUID()}.${extension}`;
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${path}`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": file.type,
      "x-upsert": "true"
    },
    body: Buffer.from(await file.arrayBuffer())
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase upload failed: ${message}`);
  }

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
