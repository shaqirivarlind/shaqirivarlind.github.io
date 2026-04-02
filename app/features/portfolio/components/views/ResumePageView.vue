<script setup lang="ts">
import { skillLabelById } from '~/shared/data/skills'
import { formatDateRange } from '~/shared/utils/date'
import { experienceStartDate, experienceEndDate, latestPosition } from '~/features/portfolio/utils'
import PortfolioLayoutHeaderNav from '~/features/portfolio/components/layout/HeaderNav.vue'
import PortfolioLayoutPageFooter from '~/features/portfolio/components/layout/PageFooter.vue'

const { portfolio } = usePortfolio()
const { person, experiences, education, certificates } = portfolio

function printResume(): void {
  window.print()
}

useHead({
  title: `${person.firstName} ${person.lastName} — Resume`,
})
</script>

<template>
  <div>
    <PortfolioLayoutHeaderNav class="no-print" />

    <v-main>
      <v-container class="py-8 resume-container" max-width="1280">
        <v-row>
          <v-col cols="auto" class="d-none d-md-flex no-print">
            <div class="resume-sidebar">
              <v-card flat rounded="xl" class="pa-1">
                <a
                  v-for="link in person.socialLinks"
                  :key="link.platform"
                  :href="link.href"
                  :target="link.platform !== 'email' ? '_blank' : undefined"
                  :rel="link.platform !== 'email' ? 'noopener noreferrer' : undefined"
                  :aria-label="link.label"
                  class="sidebar-link d-flex align-center justify-center rounded-xl"
                >
                  <span v-if="link.platform === 'linkedin'" class="text-caption font-weight-bold">in</span>
                  <span v-else-if="link.platform === 'email'" class="text-caption font-weight-bold">@</span>
                  <span v-else-if="link.platform === 'github'" class="text-caption font-weight-bold">gh</span>
                  <span v-else class="text-caption">↗</span>
                </a>
                <button
                  type="button"
                  aria-label="Download resume as PDF"
                  class="sidebar-link d-flex align-center justify-center rounded-xl"
                  @click="printResume"
                >
                  <span class="text-caption font-weight-bold">pdf</span>
                </button>
              </v-card>
            </div>
          </v-col>

          <v-col>
            <v-card rounded="xl" elevation="1" class="pa-6 pa-sm-8">
              <v-row class="text-body-2 text-medium-emphasis mb-8 pb-6 border-b">
                <v-col cols="12" sm="4">
                  <a :href="person.websiteUrl" class="text-decoration-none text-medium-emphasis">
                    {{ person.websiteUrl.replace('https://', '') }}
                  </a>
                </v-col>
                <v-col cols="12" sm="4" class="text-sm-center">{{ person.location }}</v-col>
                <v-col cols="12" sm="4" class="text-sm-right">
                  <a :href="`mailto:${person.email}`" class="text-decoration-none text-medium-emphasis">
                    {{ person.email }}
                  </a>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" lg="8">
                  <h1 class="text-h3 text-sm-h2 font-weight-black text-high-emphasis resume-name">
                    {{ person.firstName }}<br>{{ person.lastName }}
                  </h1>
                  <h2 class="text-h5 text-medium-emphasis mt-3">{{ person.role }}.</h2>
                  <p class="text-body-2 text-medium-emphasis mt-4 resume-intro">
                    {{ person.bio }}
                  </p>

                  <section class="mt-10">
                    <h3 class="text-overline text-medium-emphasis resume-overline">Experience</h3>
                    <p class="text-body-2 text-medium-emphasis mt-3">
                      Hands-on delivery experience across product teams in Kosovo, Switzerland, and Germany.
                    </p>

                    <div class="mt-5">
                      <article
                        v-for="(experience, index) in experiences"
                        :key="experience.id"
                        :class="['py-5', index < experiences.length - 1 ? 'border-b' : '']"
                      >
                        <div class="d-flex flex-wrap align-center justify-space-between ga-2">
                          <h4 class="text-subtitle-1 font-weight-semibold text-high-emphasis">
                            {{ experience.company.name }}
                            <span class="text-medium-emphasis font-weight-regular">
                              - {{ latestPosition(experience).role }}
                            </span>
                          </h4>
                          <span class="text-caption text-medium-emphasis">
                            {{ formatDateRange(experienceStartDate(experience), experienceEndDate(experience)) }}
                          </span>
                        </div>
                        <p class="text-body-2 text-medium-emphasis mt-2">
                          {{ latestPosition(experience).description }}
                        </p>
                      </article>
                    </div>
                  </section>
                </v-col>

                <v-col cols="12" lg="4">
                  <v-sheet rounded="xl" color="surface-variant" class="pa-4 mb-4">
                    <h3 class="text-overline text-medium-emphasis resume-overline-sm">Core Technologies</h3>
                    <div class="d-flex flex-wrap ga-2 mt-3">
                      <v-chip
                        v-for="skillId in person.coreSkills"
                        :key="skillId"
                        size="small"
                        variant="elevated"
                        color="surface"
                      >
                        {{ skillLabelById[skillId] ?? skillId }}
                      </v-chip>
                    </div>
                  </v-sheet>

                  <v-sheet rounded="xl" color="surface-variant" class="pa-4 mb-4">
                    <h3 class="text-overline text-medium-emphasis resume-overline-sm">Others</h3>
                    <ul class="mt-3 list-unstyled">
                      <li
                        v-for="competency in person.otherCompetencies"
                        :key="competency"
                        class="text-body-2 text-medium-emphasis mb-1"
                      >
                        {{ competency }}
                      </li>
                    </ul>
                  </v-sheet>

                  <v-sheet
                    v-for="edu in education"
                    :key="edu.institution"
                    rounded="xl"
                    color="surface-variant"
                    class="pa-4 mb-4"
                  >
                    <h3 class="text-overline text-medium-emphasis resume-overline-sm">Education</h3>
                    <p class="text-subtitle-2 font-weight-semibold text-high-emphasis mt-3">
                      {{ edu.degree }}, {{ edu.field }}
                    </p>
                    <p class="text-body-2 text-medium-emphasis">{{ edu.institution }}</p>
                    <p class="text-caption text-disabled">{{ edu.startYear }} - {{ edu.endYear }}</p>
                  </v-sheet>

                  <v-sheet v-if="certificates.length" rounded="xl" color="surface-variant" class="pa-4 mb-4">
                    <h3 class="text-overline text-medium-emphasis resume-overline-sm">Certifications</h3>
                    <div class="mt-3">
                      <div v-for="cert in certificates" :key="cert.title" class="mb-4">
                        <v-img
                          v-if="cert.imageSrc"
                          :src="cert.imageSrc"
                          :alt="cert.title"
                          rounded="lg"
                          class="mb-2"
                          cover
                        />
                        <p class="text-subtitle-2 font-weight-semibold text-high-emphasis">{{ cert.title }}</p>
                        <p class="text-body-2 text-medium-emphasis">{{ cert.issuer }}</p>
                        <p class="text-caption text-disabled">{{ cert.date }}</p>
                        <a
                          v-if="cert.verifyUrl"
                          :href="cert.verifyUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-caption text-primary text-decoration-none"
                        >Verify</a>
                      </div>
                    </div>
                  </v-sheet>

                  <v-sheet rounded="xl" color="surface-variant" class="pa-4">
                    <h3 class="text-overline text-medium-emphasis resume-overline-sm">Quick Links</h3>
                    <div class="d-flex flex-wrap ga-2 mt-3">
                      <v-btn
                        size="small"
                        color="primary"
                        variant="elevated"
                        rounded="lg"
                        class="no-print"
                        @click="printResume"
                      >
                        Download PDF
                      </v-btn>
                      <v-btn
                        v-for="link in person.socialLinks.filter((l) => l.platform !== 'email')"
                        :key="link.platform"
                        :href="link.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        variant="tonal"
                        rounded="lg"
                      >
                        {{ link.label }}
                      </v-btn>
                    </div>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <PortfolioLayoutPageFooter class="no-print" />
  </div>
</template>

<style scoped>
.resume-name {
  line-height: 1.05;
}

.list-unstyled {
  list-style: none;
  padding: 0;
  margin: 0;
}

.border-b {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.resume-sidebar {
  position: sticky;
  top: 80px;
}

.sidebar-link {
  width: 40px;
  height: 40px;
  text-decoration: none;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s, background 0.2s;
}

.sidebar-link:hover {
  opacity: 1;
  background: rgb(var(--v-theme-surface-variant));
}

.resume-intro {
  max-width: 640px;
  line-height: 1.8;
}

.resume-overline {
  letter-spacing: 0.2em;
}

.resume-overline-sm {
  letter-spacing: 0.18em;
}

@media print {
  .no-print { display: none !important; }
  @page { size: A4; margin: 16mm 14mm; }
  article { break-inside: avoid; page-break-inside: avoid; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
