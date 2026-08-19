import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { SectionHeading } from "@/components/shared/content/SectionHeading";
import { Card, CardTitle } from "@/components/ui/card";
import { SocialButton } from "@/components/shared/buttons/SocialButton";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { createWhatsappLink } from "@/lib/phone";
import type { ContactPageContent, Locale, Person, Project } from "@/types";

/**
 * components/sections/ContactChannelsSection.tsx
 * ----------------------------------------------------------------------------
 * One card per project — per the architecture's per-project contact model
 * (config/contacts.ts), there is no single shared "site" WhatsApp/email to
 * show; a visitor picks the project they're reaching out about, same
 * reasoning as the homepage's <CtaSection>. Location and working hours
 * are genuinely shared (they describe the person, not a project), so they
 * render once, alongside the two project cards, in their own small card.
 *
 * This section is the Contact page's primary call to action — it replaced a
 * template contact form that validated input and showed a success toast
 * without sending anything anywhere. WhatsApp is therefore promoted to a
 * full labelled button per project rather than one more icon in a row: it is
 * how this audience actually starts a conversation, and an icon-only control
 * gives no indication of what happens when you press it. The remaining
 * channels stay as icon buttons, which is the correct weight for them.
 */
export function ContactChannelsSection({
  content,
  projects,
  person,
  locale = "en",
}: {
  content: ContactPageContent;
  projects: Project[];
  person: Person;
  locale?: Locale;
}) {
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
                    <div className="mt-auto flex flex-col gap-4 pt-2">
                      {whatsapp && (
                        <Button asChild variant="primary" size="md" className="w-full">
                          <a
                            href={createWhatsappLink(whatsapp, locale)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon name="whatsapp" size="sm" />
                            {content.primaryActionLabel[locale]}
                          </a>
                        </Button>
                      )}
                      <div className="flex flex-wrap gap-3">
                        {instagram && <SocialButton platform="instagram" href={instagram.url} />}
                        {telegram && (
                          <SocialButton
                            platform="telegram"
                            href={telegram.url ?? `https://t.me/${telegram.username}`}
                          />
                        )}
                        {email && <SocialButton platform="email" href={`mailto:${email.address}`} />}
                      </div>
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
