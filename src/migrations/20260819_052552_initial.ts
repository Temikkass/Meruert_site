import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ru', 'en', 'kk');
  CREATE TYPE "public"."enum_projects_offerings_icon" AS ENUM('compass', 'languages', 'tent', 'wallet', 'trending-up', 'star');
  CREATE TYPE "public"."enum_projects_project_id" AS ENUM('financial', 'travel');
  CREATE TYPE "public"."enum_gallery_project" AS ENUM('shared', 'financial', 'travel');
  CREATE TYPE "public"."enum_testimonials_project" AS ENUM('shared', 'financial', 'travel');
  CREATE TYPE "public"."enum_faq_project" AS ENUM('shared', 'financial', 'travel');
  CREATE TYPE "public"."enum_statistics_placement" AS ENUM('home', 'about');
  CREATE TYPE "public"."enum_statistics_project" AS ENUM('shared', 'financial', 'travel');
  CREATE TYPE "public"."enum_value_propositions_placement" AS ENUM('why-choose-me', 'mission-values');
  CREATE TYPE "public"."enum_value_propositions_icon" AS ENUM('star', 'compass', 'wallet', 'trending-up', 'languages', 'tent', 'check', 'info');
  CREATE TYPE "public"."enum_social_links_platform" AS ENUM('instagram', 'telegram', 'whatsapp', 'email', 'phone');
  CREATE TYPE "public"."enum_social_links_project" AS ENUM('shared', 'financial', 'travel');
  CREATE TYPE "public"."enum_site_settings_footer_columns_links_href" AS ENUM('/', '/about', '/financial-literacy', '/tours-and-courses', '/contact', '/privacy-policy');
  CREATE TABLE "projects_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_description_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_projects_offerings_icon" DEFAULT 'compass',
  	"image_id" integer
  );
  
  CREATE TABLE "projects_offerings_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" "enum_projects_project_id" NOT NULL,
  	"title" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"logo_id" integer,
  	"contacts_whatsapp_phone" varchar,
  	"contacts_telegram_username" varchar,
  	"contacts_instagram_username" varchar,
  	"contacts_email" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_locales" (
  	"name" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"contacts_whatsapp_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"project" "enum_gallery_project" DEFAULT 'shared' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_name" varchar NOT NULL,
  	"avatar_id" integer,
  	"rating" numeric,
  	"project" "enum_testimonials_project" DEFAULT 'shared' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"author_role" varchar,
  	"quote" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question_title" varchar NOT NULL,
  	"project" "enum_faq_project" DEFAULT 'shared' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faq_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "statistics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"value" numeric NOT NULL,
  	"prefix" varchar,
  	"suffix" varchar,
  	"placement" "enum_statistics_placement" DEFAULT 'home' NOT NULL,
  	"project" "enum_statistics_project" DEFAULT 'shared' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "statistics_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "value_propositions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"placement" "enum_value_propositions_placement" DEFAULT 'why-choose-me' NOT NULL,
  	"icon" "enum_value_propositions_icon" DEFAULT 'star' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "value_propositions_locales" (
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "timeline" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "timeline_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "certificates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "certificates_locales" (
  	"name" varchar NOT NULL,
  	"issuer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "social_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"platform" "enum_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"project" "enum_social_links_project" DEFAULT 'shared' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"gallery_id" integer,
  	"testimonials_id" integer,
  	"faq_id" integer,
  	"statistics_id" integer,
  	"value_propositions_id" integer,
  	"timeline_id" integer,
  	"certificates_id" integer,
  	"social_links_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "person_biography" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "person_biography_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "person_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar
  );
  
  CREATE TABLE "person_credentials_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "person" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"photo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "person_locales" (
  	"tagline" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_headline" varchar NOT NULL,
  	"hero_intro" varchar NOT NULL,
  	"hero_primary_cta_label" varchar NOT NULL,
  	"hero_secondary_cta_label" varchar NOT NULL,
  	"hero_scroll_indicator_label" varchar NOT NULL,
  	"about_preview_eyebrow" varchar,
  	"about_preview_heading" varchar NOT NULL,
  	"about_preview_subtitle" varchar,
  	"projects_eyebrow" varchar,
  	"projects_heading" varchar NOT NULL,
  	"projects_subtitle" varchar,
  	"projects_card_cta_label" varchar NOT NULL,
  	"why_choose_me_eyebrow" varchar,
  	"why_choose_me_heading" varchar NOT NULL,
  	"why_choose_me_subtitle" varchar,
  	"statistics_eyebrow" varchar,
  	"statistics_heading" varchar NOT NULL,
  	"statistics_subtitle" varchar,
  	"testimonials_eyebrow" varchar,
  	"testimonials_heading" varchar NOT NULL,
  	"testimonials_subtitle" varchar,
  	"gallery_preview_eyebrow" varchar,
  	"gallery_preview_heading" varchar NOT NULL,
  	"gallery_preview_subtitle" varchar,
  	"faq_preview_eyebrow" varchar,
  	"faq_preview_heading" varchar NOT NULL,
  	"faq_preview_subtitle" varchar,
  	"cta_eyebrow" varchar,
  	"cta_heading" varchar NOT NULL,
  	"cta_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_headline" varchar NOT NULL,
  	"hero_intro" varchar NOT NULL,
  	"hero_primary_cta_label" varchar NOT NULL,
  	"hero_secondary_cta_label" varchar NOT NULL,
  	"hero_scroll_indicator_label" varchar NOT NULL,
  	"biography_eyebrow" varchar,
  	"biography_heading" varchar NOT NULL,
  	"biography_subtitle" varchar,
  	"mission_values_eyebrow" varchar,
  	"mission_values_heading" varchar NOT NULL,
  	"mission_values_subtitle" varchar,
  	"timeline_eyebrow" varchar,
  	"timeline_heading" varchar NOT NULL,
  	"timeline_subtitle" varchar,
  	"achievements_eyebrow" varchar,
  	"achievements_heading" varchar NOT NULL,
  	"achievements_subtitle" varchar,
  	"certificates_eyebrow" varchar,
  	"certificates_heading" varchar NOT NULL,
  	"certificates_subtitle" varchar,
  	"gallery_eyebrow" varchar,
  	"gallery_heading" varchar NOT NULL,
  	"gallery_subtitle" varchar,
  	"cta_eyebrow" varchar,
  	"cta_heading" varchar NOT NULL,
  	"cta_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "financial_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "financial_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_intro" varchar NOT NULL,
  	"about_eyebrow" varchar,
  	"about_heading" varchar NOT NULL,
  	"about_subtitle" varchar,
  	"services_eyebrow" varchar,
  	"services_heading" varchar NOT NULL,
  	"services_subtitle" varchar,
  	"learning_formats_eyebrow" varchar,
  	"learning_formats_heading" varchar NOT NULL,
  	"learning_formats_subtitle" varchar,
  	"benefits_eyebrow" varchar,
  	"benefits_heading" varchar NOT NULL,
  	"benefits_subtitle" varchar,
  	"success_stories_eyebrow" varchar,
  	"success_stories_heading" varchar NOT NULL,
  	"success_stories_subtitle" varchar,
  	"gallery_eyebrow" varchar,
  	"gallery_heading" varchar NOT NULL,
  	"gallery_subtitle" varchar,
  	"faq_eyebrow" varchar,
  	"faq_heading" varchar NOT NULL,
  	"faq_subtitle" varchar,
  	"cta_eyebrow" varchar,
  	"cta_heading" varchar NOT NULL,
  	"cta_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "travel_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "travel_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_intro" varchar NOT NULL,
  	"about_eyebrow" varchar,
  	"about_heading" varchar NOT NULL,
  	"about_subtitle" varchar,
  	"programs_eyebrow" varchar,
  	"programs_heading" varchar NOT NULL,
  	"programs_subtitle" varchar,
  	"tours_eyebrow" varchar,
  	"tours_heading" varchar NOT NULL,
  	"tours_subtitle" varchar,
  	"language_courses_eyebrow" varchar,
  	"language_courses_heading" varchar NOT NULL,
  	"language_courses_subtitle" varchar,
  	"camps_eyebrow" varchar,
  	"camps_heading" varchar NOT NULL,
  	"camps_subtitle" varchar,
  	"gallery_eyebrow" varchar,
  	"gallery_heading" varchar NOT NULL,
  	"gallery_subtitle" varchar,
  	"reviews_eyebrow" varchar,
  	"reviews_heading" varchar NOT NULL,
  	"reviews_subtitle" varchar,
  	"faq_eyebrow" varchar,
  	"faq_heading" varchar NOT NULL,
  	"faq_subtitle" varchar,
  	"cta_eyebrow" varchar,
  	"cta_heading" varchar NOT NULL,
  	"cta_subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"channels_heading_eyebrow" varchar,
  	"channels_heading_heading" varchar NOT NULL,
  	"channels_heading_subtitle" varchar,
  	"primary_action_label" varchar NOT NULL,
  	"location_label" varchar NOT NULL,
  	"working_hours_label" varchar NOT NULL,
  	"working_hours" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "legal_page_sections_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "legal_page_sections_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "legal_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "legal_page_sections_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "legal_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"last_updated" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "legal_page_locales" (
  	"title" varchar NOT NULL,
  	"last_updated_label" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" "enum_site_settings_footer_columns_links_href" NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"default_og_image_id" integer NOT NULL,
  	"footer_owner_name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"default_title" varchar NOT NULL,
  	"default_description" varchar NOT NULL,
  	"footer_copyright_notice" varchar NOT NULL,
  	"nav_about_label" varchar NOT NULL,
  	"nav_contact_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "projects_description" ADD CONSTRAINT "projects_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_description_locales" ADD CONSTRAINT "projects_description_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_description"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_offerings" ADD CONSTRAINT "projects_offerings_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_offerings" ADD CONSTRAINT "projects_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_offerings_locales" ADD CONSTRAINT "projects_offerings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_offerings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_locales" ADD CONSTRAINT "gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_locales" ADD CONSTRAINT "faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statistics_locales" ADD CONSTRAINT "statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "value_propositions_locales" ADD CONSTRAINT "value_propositions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."value_propositions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "timeline_locales" ADD CONSTRAINT "timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates_locales" ADD CONSTRAINT "certificates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_statistics_fk" FOREIGN KEY ("statistics_id") REFERENCES "public"."statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_value_propositions_fk" FOREIGN KEY ("value_propositions_id") REFERENCES "public"."value_propositions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_timeline_fk" FOREIGN KEY ("timeline_id") REFERENCES "public"."timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certificates_fk" FOREIGN KEY ("certificates_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "person_biography" ADD CONSTRAINT "person_biography_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "person_biography_locales" ADD CONSTRAINT "person_biography_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."person_biography"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "person_credentials" ADD CONSTRAINT "person_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "person_credentials_locales" ADD CONSTRAINT "person_credentials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."person_credentials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "person" ADD CONSTRAINT "person_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "person_locales" ADD CONSTRAINT "person_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."person"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "financial_page_locales" ADD CONSTRAINT "financial_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."financial_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "travel_page_locales" ADD CONSTRAINT "travel_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."travel_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_page_sections_body" ADD CONSTRAINT "legal_page_sections_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_page_sections_body_locales" ADD CONSTRAINT "legal_page_sections_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_page_sections_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_page_sections" ADD CONSTRAINT "legal_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_page_sections_locales" ADD CONSTRAINT "legal_page_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_page_locales" ADD CONSTRAINT "legal_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_links" ADD CONSTRAINT "site_settings_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_links_locales" ADD CONSTRAINT "site_settings_footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns" ADD CONSTRAINT "site_settings_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_locales" ADD CONSTRAINT "site_settings_footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_description_order_idx" ON "projects_description" USING btree ("_order");
  CREATE INDEX "projects_description_parent_id_idx" ON "projects_description" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_description_locales_locale_parent_id_unique" ON "projects_description_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_offerings_order_idx" ON "projects_offerings" USING btree ("_order");
  CREATE INDEX "projects_offerings_parent_id_idx" ON "projects_offerings" USING btree ("_parent_id");
  CREATE INDEX "projects_offerings_image_idx" ON "projects_offerings" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_offerings_locales_locale_parent_id_unique" ON "projects_offerings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "projects_project_id_idx" ON "projects" USING btree ("project_id");
  CREATE INDEX "projects_hero_image_idx" ON "projects" USING btree ("hero_image_id");
  CREATE INDEX "projects_logo_idx" ON "projects" USING btree ("logo_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE UNIQUE INDEX "gallery_locales_locale_parent_id_unique" ON "gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE UNIQUE INDEX "faq_locales_locale_parent_id_unique" ON "faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "statistics_updated_at_idx" ON "statistics" USING btree ("updated_at");
  CREATE INDEX "statistics_created_at_idx" ON "statistics" USING btree ("created_at");
  CREATE UNIQUE INDEX "statistics_locales_locale_parent_id_unique" ON "statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "value_propositions_updated_at_idx" ON "value_propositions" USING btree ("updated_at");
  CREATE INDEX "value_propositions_created_at_idx" ON "value_propositions" USING btree ("created_at");
  CREATE UNIQUE INDEX "value_propositions_locales_locale_parent_id_unique" ON "value_propositions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "timeline_updated_at_idx" ON "timeline" USING btree ("updated_at");
  CREATE INDEX "timeline_created_at_idx" ON "timeline" USING btree ("created_at");
  CREATE UNIQUE INDEX "timeline_locales_locale_parent_id_unique" ON "timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "certificates_image_idx" ON "certificates" USING btree ("image_id");
  CREATE INDEX "certificates_updated_at_idx" ON "certificates" USING btree ("updated_at");
  CREATE INDEX "certificates_created_at_idx" ON "certificates" USING btree ("created_at");
  CREATE UNIQUE INDEX "certificates_locales_locale_parent_id_unique" ON "certificates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "social_links_updated_at_idx" ON "social_links" USING btree ("updated_at");
  CREATE INDEX "social_links_created_at_idx" ON "social_links" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX "payload_locked_documents_rels_statistics_id_idx" ON "payload_locked_documents_rels" USING btree ("statistics_id");
  CREATE INDEX "payload_locked_documents_rels_value_propositions_id_idx" ON "payload_locked_documents_rels" USING btree ("value_propositions_id");
  CREATE INDEX "payload_locked_documents_rels_timeline_id_idx" ON "payload_locked_documents_rels" USING btree ("timeline_id");
  CREATE INDEX "payload_locked_documents_rels_certificates_id_idx" ON "payload_locked_documents_rels" USING btree ("certificates_id");
  CREATE INDEX "payload_locked_documents_rels_social_links_id_idx" ON "payload_locked_documents_rels" USING btree ("social_links_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "person_biography_order_idx" ON "person_biography" USING btree ("_order");
  CREATE INDEX "person_biography_parent_id_idx" ON "person_biography" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "person_biography_locales_locale_parent_id_unique" ON "person_biography_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "person_credentials_order_idx" ON "person_credentials" USING btree ("_order");
  CREATE INDEX "person_credentials_parent_id_idx" ON "person_credentials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "person_credentials_locales_locale_parent_id_unique" ON "person_credentials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "person_photo_idx" ON "person" USING btree ("photo_id");
  CREATE UNIQUE INDEX "person_locales_locale_parent_id_unique" ON "person_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "financial_page_locales_locale_parent_id_unique" ON "financial_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "travel_page_locales_locale_parent_id_unique" ON "travel_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "legal_page_sections_body_order_idx" ON "legal_page_sections_body" USING btree ("_order");
  CREATE INDEX "legal_page_sections_body_parent_id_idx" ON "legal_page_sections_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "legal_page_sections_body_locales_locale_parent_id_unique" ON "legal_page_sections_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "legal_page_sections_order_idx" ON "legal_page_sections" USING btree ("_order");
  CREATE INDEX "legal_page_sections_parent_id_idx" ON "legal_page_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "legal_page_sections_locales_locale_parent_id_unique" ON "legal_page_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "legal_page_locales_locale_parent_id_unique" ON "legal_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_footer_columns_links_order_idx" ON "site_settings_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_links_parent_id_idx" ON "site_settings_footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_footer_columns_links_locales_locale_parent_id_" ON "site_settings_footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_footer_columns_order_idx" ON "site_settings_footer_columns" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_parent_id_idx" ON "site_settings_footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_footer_columns_locales_locale_parent_id_unique" ON "site_settings_footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_description" CASCADE;
  DROP TABLE "projects_description_locales" CASCADE;
  DROP TABLE "projects_offerings" CASCADE;
  DROP TABLE "projects_offerings_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "gallery_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "faq_locales" CASCADE;
  DROP TABLE "statistics" CASCADE;
  DROP TABLE "statistics_locales" CASCADE;
  DROP TABLE "value_propositions" CASCADE;
  DROP TABLE "value_propositions_locales" CASCADE;
  DROP TABLE "timeline" CASCADE;
  DROP TABLE "timeline_locales" CASCADE;
  DROP TABLE "certificates" CASCADE;
  DROP TABLE "certificates_locales" CASCADE;
  DROP TABLE "social_links" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "person_biography" CASCADE;
  DROP TABLE "person_biography_locales" CASCADE;
  DROP TABLE "person_credentials" CASCADE;
  DROP TABLE "person_credentials_locales" CASCADE;
  DROP TABLE "person" CASCADE;
  DROP TABLE "person_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "financial_page" CASCADE;
  DROP TABLE "financial_page_locales" CASCADE;
  DROP TABLE "travel_page" CASCADE;
  DROP TABLE "travel_page_locales" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "legal_page_sections_body" CASCADE;
  DROP TABLE "legal_page_sections_body_locales" CASCADE;
  DROP TABLE "legal_page_sections" CASCADE;
  DROP TABLE "legal_page_sections_locales" CASCADE;
  DROP TABLE "legal_page" CASCADE;
  DROP TABLE "legal_page_locales" CASCADE;
  DROP TABLE "site_settings_footer_columns_links" CASCADE;
  DROP TABLE "site_settings_footer_columns_links_locales" CASCADE;
  DROP TABLE "site_settings_footer_columns" CASCADE;
  DROP TABLE "site_settings_footer_columns_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_projects_offerings_icon";
  DROP TYPE "public"."enum_projects_project_id";
  DROP TYPE "public"."enum_gallery_project";
  DROP TYPE "public"."enum_testimonials_project";
  DROP TYPE "public"."enum_faq_project";
  DROP TYPE "public"."enum_statistics_placement";
  DROP TYPE "public"."enum_statistics_project";
  DROP TYPE "public"."enum_value_propositions_placement";
  DROP TYPE "public"."enum_value_propositions_icon";
  DROP TYPE "public"."enum_social_links_platform";
  DROP TYPE "public"."enum_social_links_project";
  DROP TYPE "public"."enum_site_settings_footer_columns_links_href";`)
}
