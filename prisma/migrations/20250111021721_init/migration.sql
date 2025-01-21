-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "siteFull" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "siteSection" TEXT,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "language" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "country" TEXT,
    "mainImage" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_uuid_key" ON "Post"("uuid");
