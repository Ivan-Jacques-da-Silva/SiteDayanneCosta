/*
  Warnings:

  - You are about to drop the column `neighborhood` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('NEW_DEVELOPMENTS', 'SINGLE_FAMILY_HOMES', 'LUXURY_CONDOS', 'NEIGHBORHOODS');

-- CreateEnum
CREATE TYPE "Bairro" AS ENUM ('BRICKELL', 'EDGEWATER', 'COCONUT_GROVE', 'THE_ROADS');

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parentId_fkey";

-- DropForeignKey
ALTER TABLE "property_categories" DROP CONSTRAINT "property_categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "property_categories" DROP CONSTRAINT "property_categories_propertyId_fkey";

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "neighborhood",
ADD COLUMN     "bairro" "Bairro",
ADD COLUMN     "categoria" "Categoria" NOT NULL DEFAULT 'NEW_DEVELOPMENTS';

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "property_categories";
