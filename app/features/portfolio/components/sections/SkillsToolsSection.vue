<script setup lang="ts">
import { computed, ref } from 'vue'
import { skillsCatalog } from '~/shared/data/skills'
import type { ShownSkillsOnHome } from '~/shared/types'
import { SHOWN_SKILLS_ON_HOME, SHOWN_SKILLS_ON_HOME_LABEL } from '~/shared/constants'

const { portfolio } = usePortfolio()

const usedSkillIds = computed(() => {
  const set = new Set<string>()
  for (const project of portfolio.projects) {
    for (const id of (project.stack ?? [])) set.add(String(id))
  }
  return set
})

const usedSkillsCatalog = computed(() =>
  skillsCatalog.filter((skill) => usedSkillIds.value.has(skill.id)),
)

const categories = computed(() => {
  const present = new Set<string>(usedSkillsCatalog.value.map((s) => s.category))
  return SHOWN_SKILLS_ON_HOME.filter((cat) => present.has(cat))
})

const activeCategory = ref<ShownSkillsOnHome>(categories.value[0] ?? 'web')

const filteredSkills = computed(() =>
  [...usedSkillsCatalog.value]
    .filter((skill) => skill.category === activeCategory.value)
    .sort((a, b) => b.orderWeight - a.orderWeight)
    .slice(0, 16),
)

const skillAbbreviations: Record<string, string> = {
  Angular: 'A', Vue: 'V', React: 'R', TypeScript: 'TS', Nuxt: 'N',
  Node: 'N', Redux: 'Rx', Ionic: 'Io', Laravel: 'Lr',
  Figma: 'Fg', Adobe: 'XD', Photoshop: 'Ps', Illustrator: 'Ai',
}

const iconForSkill = (label: string) => {
  const match = Object.keys(skillAbbreviations).find((key) => label.includes(key))
  return match ? skillAbbreviations[match] : label.slice(0, 2).toUpperCase()
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
  <v-sheet id="skills-tools" tag="section" border="t" color="background">
    <v-container class="py-16 py-md-24">
      <div class="text-center mx-auto mb-10" style="max-width: 640px">
        <h2 class="text-h4 text-md-h3 font-weight-black text-high-emphasis">
          Skills &amp; Tools
        </h2>
        <p class="text-h6 text-medium-emphasis mt-3">
          For those who know what they're looking for.
        </p>

        <v-btn-toggle
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
