import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { Card, CardTitle } from "@/components/ui/card";
import { SocialButton } from "@/components/shared/buttons/SocialButton";
import { WhatsAppButton } from "@/components/shared/buttons/WhatsAppButton";
import { Icon } from "@/components/ui/icon";
import { financialProject } from "@/config/financial";
import { travelProject } from "@/config/travel";
import { person } from "@/config/person";
import type { ContactPageContent, Locale } from "@/types";

/**
 * components/sections/ContactChannelsSection.tsx
 * ----------------------------------------------------------------------------
 * One card per project — per the architecture's per-project contact model
 * (config/contacts.ts), there is no single shared "site" WhatsApp/email to
 * show; a visitor picks the project they're reaching out about, same
 * reasoning as the homepage's <CtaSection>. Location and working hours
 * are genuinely shared (they describe the person, not a project), so they
 * render once, alongside the two project cards, in their own small card.
 */
export function ContactChannelsSection({
  content,
  locale = "en",
}: {
  content: ContactPageContent;
  locale?: Locale;
}) {
  const projects = [financialProject, travelProject];

  return (
    <AnimatedSection id="channels">
      <Container>
        <SectionHeading
          eyebrow={content.channelsHeading.eyebrow?.[locale]}
          heading={content.channelsHeading.heading[locale]}
          subtitle={content.channelsHeading.subtitle?.[locale]}
          align="center"
        />

        <StaggerGroup className="mt-12" staggerDelay={0.12}>
          <Grid cols={3}>
            {projects.map((project) => {
              const { instagram, telegram, whatsapp, email } = project.contacts;
              return (
                <StaggerItem key={project.id}>
                  <Card data-project={project.id} hover="lift" className="flex h-full flex-col gap-4">
                    <CardTitle>{project.name[locale]}</CardTitle>
                    <p className="text-body-sm text-ink-muted leading-body">{project.tagline[locale]}</p>
                    <div className="mt-auto flex flex-wrap gap-3 pt-2">
                      {instagram && <SocialButton platform="instagram" href={instagram.url} />}
                      {telegram && (
                        <SocialButton
                          platform="telegram"
                          href={telegram.url ?? `https://t.me/${telegram.username}`}
                        />
                      )}
                      {whatsapp && <WhatsAppButton channel={whatsapp} locale={locale} />}
                      {email && <SocialButton platform="email" href={`mailto:${email.address}`} />}
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}

            <StaggerItem>
              <Card hover="lift" className="flex h-full flex-col gap-5">
                <div className="flex items-start gap-3">
                  <Icon name="compass" size="md" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-caption font-semibold uppercase tracking-eyebrow text-ink-muted">
                      {content.locationLabel[locale]}
                    </p>
                    <p className="mt-1 text-body-md text-ink">{person.location[locale]}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="info" size="md" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-caption font-semibold uppercase tracking-eyebrow text-ink-muted">
                      {content.workingHoursLabel[locale]}
                    </p>
                    <p className="mt-1 text-body-md text-ink">{content.workingHours[locale]}</p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          </Grid>
        </StaggerGroup>
      </Container>
    </AnimatedSection>
  );
}
