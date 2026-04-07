<script setup lang="ts">
import type { ProjectRow } from '~/shared/types'

import { storeToRefs } from 'pinia'

const projectsStore = useProjectsStore()
const { projects } = storeToRefs(projectsStore)

const cardGradients = [
  'linear-gradient(135deg, #fcd34d 0%, #facc15 100%)',
  'linear-gradient(135deg, #5eead4 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #818cf8 0%, #6d28d9 100%)',
]

const cardTextColors = ['#0f172a', '#ffffff', '#ffffff']

const hashString = (value: string) => {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }
  return Math.abs(hash)
}

const layoutVariants = ['heroTop', 'heroBottom', 'splitOverlay', 'centerStack'] as const
type LayoutVariant = (typeof layoutVariants)[number]

const variantForProject = (slug: string): LayoutVariant =>
  layoutVariants[hashString(slug) % layoutVariants.length] as LayoutVariant

/** Use heroBottom when there are images so `deco-panel--tl` / `--tr` can show them; otherwise keep hashed layout. */
function effectiveVariant(project: ProjectRow): LayoutVariant {
  if (project.images.length > 0) return 'heroBottom'
  return variantForProject(project.slug)
}

function cardSurfaceStyle(index: number): Record<string, string> {
  return {
    background: cardGradients[index % cardGradients.length]!,
    color:      cardTextColors[index % cardTextColors.length]!,
  }
}

function panelImage(project: ProjectRow, index: number): string | undefined {
  return project.images[index]
}
</script>

<template>
  <section id="projects" class="projects-section">
    <v-container class="py-16 py-md-24 text-center">
      <template v-if="projects.length">
        <div class="mx-auto mb-8" style="max-width: 768px">
          <h2 class="text-h4 text-md-h3 font-weight-black text-high-emphasis mb-4">Projects</h2>
          <p class="text-h6 text-medium-emphasis">
            Prototypes, digital products and design systems that are visually pleasing,
            user-centric, and easy to use.
          </p>
        </div>

        <v-row class="py-2">
          <v-col
            v-for="(project, index) in projects"
            :key="project.id"
            cols="12"
            md="6"
          >
          <NuxtLink :to="`/projects/${project.slug}`" class="text-decoration-none">
            <div
              class="project-card rounded-xl"
              :style="cardSurfaceStyle(index)"
            >
              <template v-if="effectiveVariant(project) === 'heroTop'">
                <h3 class="project-title">{{ project.name }}</h3>
                <div class="project-deco-bottom">
                  <div class="deco-panel deco-panel--left" />
                  <div class="deco-panel deco-panel--right" />
                </div>
              </template>

              <template v-else-if="effectiveVariant(project) === 'heroBottom'">
                <div class="project-deco-top">
                  <div
                    class="deco-panel deco-panel--tl"
                    :class="{ 'deco-panel--image': Boolean(panelImage(project, 0)) }"
                  >
                    <img
                      v-if="panelImage(project, 0)"
                      :src="panelImage(project, 0)"
                      :alt="`${project.name} preview`"
                      loading="lazy"
                    >
                  </div>
                  <div
                    class="deco-panel deco-panel--tr"
                    :class="{ 'deco-panel--image': Boolean(panelImage(project, 1)) }"
                  >
                    <img
                      v-if="panelImage(project, 1)"
                      :src="panelImage(project, 1)"
                      :alt="`${project.name} preview 2`"
                      loading="lazy"
                    >
                  </div>
                </div>
                <div
                  v-if="project.images.length"
                  class="project-card__bottom-scrim"
                  aria-hidden="true"
                />
                <h3
                  class="project-title project-title--bottom"
                  :class="{ 'project-title--on-scrim': project.images.length > 0 }"
                >
                  {{ project.name }}
                </h3>
              </template>

              <template v-else-if="effectiveVariant(project) === 'splitOverlay'">
                <div class="project-deco-split">
                  <div class="deco-panel deco-panel--bl" />
                  <div class="deco-panel deco-panel--br-top" />
                </div>
                <h3 class="project-title project-title--top-left">{{ project.name }}</h3>
              </template>

              <template v-else>
                <div class="project-deco-center">
                  <div class="deco-panel deco-panel--center-top" />
                  <div class="deco-panel deco-panel--center-mid" />
                </div>
                <h3 class="project-title project-title--center">{{ project.name }}</h3>
              </template>
            </div>
          </NuxtLink>
        </v-col>
        </v-row>

        <p class="text-body-2 text-medium-emphasis mt-6">
          Click any project to open a dedicated page with company context, product details, and image sections.
        </p>
      </template>
    </v-container>
  </section>
</template>

<style scoped>
.projects-section {
  border-top: 1px solid rgba(var(--v-theme-on-background), 0.08);
  border-bottom: 1px solid rgba(var(--v-theme-on-background), 0.08);
  background: rgb(var(--v-theme-surface-variant));
}

.project-card {
  position: relative;
  min-height: 260px;
  padding: 1.5rem 2rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 300ms ease, box-shadow 300ms ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

/* Readable title over gradient + preview thumbnails */
.project-card__bottom-scrim {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 58%;
  z-index: 1;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    to top,
    rgba(15, 23, 42, 0.94) 0%,
    rgba(15, 23, 42, 0.55) 42%,
    rgba(15, 23, 42, 0.12) 72%,
    transparent 100%
  );
}

.project-title--on-scrim {
  z-index: 2;
  color: #f8fafc;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.45),
    0 4px 24px rgba(0, 0, 0, 0.35);
}

.project-title {
  position: relative;
  z-index: 2;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 900;
  line-height: 1.1;
  max-width: 65%;
}

.project-title--bottom {
  position: absolute;
  bottom: 0.25rem;
  left: 1.5rem;
  max-width: 70%;
}

.project-title--top-left {
  position: absolute;
  top: 0.25rem;
  left: 1.5rem;
  max-width: 60%;
}

.project-title--center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  max-width: 80%;
}

.deco-panel {
  position: absolute;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.38);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: transform 500ms ease;
}

.deco-panel--image {
  padding: 0;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.deco-panel--image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Frame + vignette so photos don’t fight the card gradient */
.deco-panel--image::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.22);
  background: linear-gradient(
    165deg,
    rgba(255, 255, 255, 0.14) 0%,
    transparent 42%,
    rgba(15, 23, 42, 0.28) 100%
  );
}

.project-card:hover .deco-panel {
  transform: translateY(-4px);
}

.deco-panel--left  { bottom: 24px; left: 56px; height: 112px; width: 58%; }
.deco-panel--right { bottom: 0;    right: 32px; height: 128px; width: 40%; }
.deco-panel--tl    { top: 22px; left: 46px; height: 128px; width: 60%; }
.deco-panel--tr    { top: 64px; right: -62px; height: 160px; width: 55%; }
.deco-panel--bl    { bottom: 20px; left: -32px; height: 144px; width: 55%; }
.deco-panel--br-top { top: 60px; right: 28px; height: 160px; width: 52%; }
.deco-panel--center-top { top: 64px; left: 50%; transform: translateX(-50%); height: 112px; width: 64%; }
.deco-panel--center-mid { top: 112px; left: 50%; transform: translateX(-50%); height: 128px; width: 74%; }

.project-card:hover .deco-panel--center-top,
.project-card:hover .deco-panel--center-mid {
  transform: translateX(-50%) translateY(-4px);
}
</style>
