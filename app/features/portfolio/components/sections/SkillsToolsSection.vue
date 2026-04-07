<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { ShownSkillsOnHome, Skill } from '~/shared/types'
import { SHOWN_SKILLS_ON_HOME, SHOWN_SKILLS_ON_HOME_LABEL } from '~/shared/constants'

const projectsStore = useProjectsStore()
const skillsStore = useSkillsStore()

const { allSkills } = storeToRefs(projectsStore)
const { skills } = storeToRefs(skillsStore)

/** Skill rows for ids that appear on any project stack (catalog lookup by id). */
const usedSkillsCatalog = computed((): Skill[] => {
  const byId = new Map(skills.value.map((s) => [s.id, s] as const))
  return allSkills.value.map((id) => byId.get(id)).filter((s): s is Skill => s != null)
})

const categories = computed((): ShownSkillsOnHome[] => {
  const present = new Set(usedSkillsCatalog.value.map((s) => s.category))
  return SHOWN_SKILLS_ON_HOME.filter((cat) => present.has(cat))
})

const activeCategory = ref<ShownSkillsOnHome>('web')

watch(
  categories,
  (cats) => {
    if (cats.length === 0) return
    if (!cats.includes(activeCategory.value)) {
      activeCategory.value = cats[0]!
    }
  },
  { immediate: true },
)

const filteredSkills = computed(() =>
  [...usedSkillsCatalog.value]
    .filter((skill) => skill.category === activeCategory.value)
    .sort((a, b) => b.orderWeight - a.orderWeight)
    .slice(0, 16),
)

function iconForSkill(label: string): string {
  return label.trim().charAt(0).toUpperCase()
}

const skillIcons = import.meta.glob('../../assets/icons/skills/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const iconSrcById = Object.fromEntries(
  Object.entries(skillIcons).map(([path, src]) => {
    const skillId = path.split('/').pop()!.replace('.svg', '')
    return [skillId, src]
  }),
)
</script>

<template>
  <v-sheet
    v-if="usedSkillsCatalog.length"
    id="skills-tools"
    tag="section"
    border="t"
    color="background"
  >
    <v-container class="py-16 py-md-24">
      <div class="text-center mx-auto mb-10" style="max-width: 640px">
        <h2 class="text-h4 text-md-h3 font-weight-black text-high-emphasis">
          Skills &amp; Tools
        </h2>
        <p class="text-h6 text-medium-emphasis mt-3">
          For those who know what they're looking for.
        </p>

        <v-btn-toggle
          v-if="categories.length"
          v-model="activeCategory"
          mandatory
          rounded="pill"
          class="mt-7"
          density="comfortable"
        >
          <v-btn
            v-for="category in categories"
            :key="category"
            :value="category"
            rounded="pill"
            class="px-6"
          >
            {{ SHOWN_SKILLS_ON_HOME_LABEL[category] }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <v-row>
        <v-col
          v-for="skill in filteredSkills"
          :key="skill.id"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :elevation="isHovering ? 3 : 0"
              border
              rounded="xl"
              class="pa-4 text-center"
            >
              <v-sheet
                color="surface-variant"
                rounded="lg"
                width="40"
                height="40"
                class="d-flex align-center justify-center mx-auto mb-3"
              >
                <v-img
                  v-if="iconSrcById[skill.id]"
                  :src="iconSrcById[skill.id]"
                  :alt="`${skill.label} icon`"
                  :width="24"
                  :height="24"
                  contain
                />
                <span v-else class="text-subtitle-2 font-weight-bold text-medium-emphasis">
                  {{ iconForSkill(skill.label) }}
                </span>
              </v-sheet>
              <p class="text-caption font-weight-semibold text-high-emphasis">
                {{ skill.label }}
              </p>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
