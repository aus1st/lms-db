ALTER TABLE "centers" DROP CONSTRAINT "centers_city_id_cities_city_id_fk";

ALTER TABLE "centers" DROP COLUMN IF EXISTS "city_id";