-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "siteFull" DROP NOT NULL,
ALTER COLUMN "site" DROP NOT NULL,
ALTER COLUMN "language" DROP NOT NULL;
