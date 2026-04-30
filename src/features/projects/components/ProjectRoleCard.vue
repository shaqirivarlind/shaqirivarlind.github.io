<template>
  <section v-if="roles.length" class="mb-8">
    <h2 class="text-h6 font-weight-bold mb-4">Delivered In</h2>
    <v-row>
      <v-col v-for="role in roles" :key="role.id" cols="12">
        <v-card border flat rounded="xl" class="pa-5">
          <div
            class="d-flex align-start justify-space-between ga-2 mb-3"
          >
            <div style="flex: 1 1 0; min-width: 0">
              <p class="text-subtitle-1 font-weight-bold ma-0 mb-1">{{ role.title }}</p>
              <ProjectDetailsCompaniesInfo :company-id="role.companyId" :show-description="false" />
            </div>
            <div class="d-flex flex-column align-end ga-1 flex-shrink-0">
              <v-chip
                v-if="role.employmentType"
                variant="tonal"
                color="primary"
                label
              >
                {{ role.employmentType }}
              </v-chip>
              <v-chip
                v-if="role.workType"
                variant="tonal"
                label
                prepend-icon="mdi-map-marker-outline"
              >
                {{ role.workType }}
              </v-chip>
            </div>
          </div>

          <p
            v-if="role.dateRange"
            class="text-caption text-medium-emphasis mb-3"
          >
            <v-icon size="x-small" class="mr-1">mdi-calendar-outline</v-icon>
            {{ formatYearMonth(role.dateRange.start) }} –
            {{
              role.dateRange.end
                ? formatYearMonth(role.dateRange.end)
                : "Present"
            }}
          </p>

          <v-list
            v-if="role.achievements?.length"
            lines="one"
            class="pa-0 bg-transparent"
          >
            <v-list-item
              v-for="(achievement, index) in role.achievements"
              :key="index"
              class="px-0"
              min-height="28"
            >
              <template #prepend>
                <v-icon color="primary" size="x-small"
                  >mdi-circle-medium</v-icon
                >
              </template>
              <v-list-item-title class="text-body-2 text-wrap">{{
                achievement
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import type { Role } from "@/shared/type-data";
import ProjectDetailsCompaniesInfo from "../../companies/components/ProjectDetailsCompaniesInfo.vue";
import { formatYearMonth } from "@/utils/date";

const props = defineProps<{ roleIds: string[] }>();

const rolesStore = useRolesStore();

const roles = computed<Role[]>(() =>
  props.roleIds
    .map((id) => rolesStore.roleById(id))
    .filter((role): role is Role => role !== undefined),
);
</script>
