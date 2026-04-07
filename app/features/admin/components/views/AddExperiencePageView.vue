<script setup lang="ts">
import AdminAuthGate from '~/features/admin/components/auth/AdminAuthGate.vue'
import AdminAddExperienceEditor from '~/features/admin/components/views/AdminAddExperienceEditor.vue'
</script>

<template>
  <v-container class="py-10">
    <AdminAuthGate>
      <AdminAddExperienceEditor />
    </AdminAuthGate>
  </v-container>
</template>
