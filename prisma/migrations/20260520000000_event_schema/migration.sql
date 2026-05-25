-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR', 'USER');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "PageBlockType" AS ENUM ('HERO', 'RICH_TEXT', 'COUNTDOWN', 'SCHEDULE', 'AWARDS', 'NEWS', 'PARTNERS', 'VIDEO', 'GALLERY', 'CTA');

-- CreateTable
CREATE TABLE "users" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'USER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavigationItem" (
  "id" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "NavigationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
  "blocks" JSONB NOT NULL,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "thumbnail" TEXT,
  "coverImage" TEXT,
  "content" JSONB,
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "status" "PublishStatus" NOT NULL DEFAULT 'DRAFT',
  "blocks" JSONB NOT NULL,
  "authorId" TEXT,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
  "id" TEXT NOT NULL,
  "date" TIMESTAMP(3) NOT NULL,
  "time" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "awards" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "prize" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partners" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "website" TEXT,
  "logoUrl" TEXT,
  "tier" TEXT NOT NULL DEFAULT 'Partner',
  "order" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
  "altText" TEXT,
  "postId" TEXT,
  "partnerId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrations" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "imageUrl" TEXT,
  "description" TEXT,
  "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
  "userId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_blocks" (
  "id" TEXT NOT NULL,
  "pageKey" TEXT NOT NULL,
  "type" "PageBlockType" NOT NULL,
  "title" TEXT,
  "content" JSONB NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "mediaId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "page_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "portfolio" TEXT,
  "message" TEXT,
  "consent" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");

-- CreateIndex
CREATE INDEX "NavigationItem_order_idx" ON "NavigationItem"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_slug_status_idx" ON "Page"("slug", "status");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE INDEX "posts_slug_status_idx" ON "posts"("slug", "status");

-- CreateIndex
CREATE INDEX "posts_authorId_idx" ON "posts"("authorId");

-- CreateIndex
CREATE INDEX "posts_publishedAt_idx" ON "posts"("publishedAt");

-- CreateIndex
CREATE INDEX "schedules_date_order_idx" ON "schedules"("date", "order");

-- CreateIndex
CREATE INDEX "awards_order_idx" ON "awards"("order");

-- CreateIndex
CREATE INDEX "partners_tier_order_idx" ON "partners"("tier", "order");

-- CreateIndex
CREATE INDEX "media_type_idx" ON "media"("type");

-- CreateIndex
CREATE INDEX "media_postId_idx" ON "media"("postId");

-- CreateIndex
CREATE INDEX "media_partnerId_idx" ON "media"("partnerId");

-- CreateIndex
CREATE INDEX "registrations_email_idx" ON "registrations"("email");

-- CreateIndex
CREATE INDEX "registrations_status_idx" ON "registrations"("status");

-- CreateIndex
CREATE INDEX "registrations_createdAt_idx" ON "registrations"("createdAt");

-- CreateIndex
CREATE INDEX "registrations_userId_idx" ON "registrations"("userId");

-- CreateIndex
CREATE INDEX "page_blocks_pageKey_order_idx" ON "page_blocks"("pageKey", "order");

-- CreateIndex
CREATE INDEX "page_blocks_type_idx" ON "page_blocks"("type");

-- CreateIndex
CREATE INDEX "page_blocks_mediaId_idx" ON "page_blocks"("mediaId");

-- CreateIndex
CREATE INDEX "Application_createdAt_idx" ON "Application"("createdAt");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_blocks" ADD CONSTRAINT "page_blocks_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
