<template>
  <div v-if="role" class="mb-1">
    <span class="text-title-medium font-weight-medium">{{ role.title }}</span>

    <div class="text-title-small text-medium-emphasis mt-n1 mb-1">
      <span v-if="role.workType">{{ role.workType }}</span>
      <span v-if="role.employmentType"> · {{ role.employmentType }}</span>
      <span>
        · {{ formatYearMonth(role.dateRange.start) }} –
        {{ endDate }}
      </span>
    </div>

    <p
      v-if="role.summary"
      class="text-label-medium text-medium-emphasis ma-0 mb-1"
    >
      {{ role.summary }}
    </p>

    <ul
      v-if="role.achievements.length"
      class="text-label-medium text-medium-emphasis ma-0 mb-1 pl-4"
    >
      <li v-for="(achievement, index) in role.achievements" :key="index" class="pr-2">
        {{ achievement }}
      </li>
    </ul>

    <ResumeProjectSection :ids="role.projectIds" />
  </div>
</template>

<script setup lang="ts">
import type { Role } from "@/shared/type-data";
import { formatYearMonth } from "@/utils/date";
import ResumeProjectSection from "../../projects/components/ResumeProjectSection.vue";

const props = defineProps<{ roleId: string }>();

const rolesStore = useRolesStore();

const role = computed<Role | undefined>(() => rolesStore.roleById(props.roleId));
const endDate = computed<string>(() =>
  role.value?.dateRange.end
    ? formatYearMonth(role.value.dateRange.end)
    : "Present",
);
</script>
