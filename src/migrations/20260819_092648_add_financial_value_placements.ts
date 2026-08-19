import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_value_propositions_placement" ADD VALUE 'financial-formats';
  ALTER TYPE "public"."enum_value_propositions_placement" ADD VALUE 'financial-benefits';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "value_propositions" ALTER COLUMN "placement" SET DATA TYPE text;
  ALTER TABLE "value_propositions" ALTER COLUMN "placement" SET DEFAULT 'why-choose-me'::text;
  DROP TYPE "public"."enum_value_propositions_placement";
  CREATE TYPE "public"."enum_value_propositions_placement" AS ENUM('why-choose-me', 'mission-values');
  ALTER TABLE "value_propositions" ALTER COLUMN "placement" SET DEFAULT 'why-choose-me'::"public"."enum_value_propositions_placement";
  ALTER TABLE "value_propositions" ALTER COLUMN "placement" SET DATA TYPE "public"."enum_value_propositions_placement" USING "placement"::"public"."enum_value_propositions_placement";`)
}
