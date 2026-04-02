<script setup lang="ts">
interface Props {
  passwordError: boolean
}

const passwordInput = defineModel<string>({ required: true })
defineProps<Props>()
const emit = defineEmits<{ submit: [] }>()
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card rounded="xl" elevation="2" class="pa-4">
          <v-card-title class="text-h6 font-weight-bold">Admin</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="emit('submit')">
              <v-text-field
                v-model="passwordInput"
                type="password"
                label="Password"
                autofocus
                :error="passwordError"
                :error-messages="passwordError ? 'Incorrect password.' : ''"
                variant="outlined"
                density="comfortable"
                class="mt-1"
              />
              <v-btn
                type="submit"
                color="primary"
                variant="elevated"
                block
                class="mt-2"
                size="large"
              >
                Enter
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
