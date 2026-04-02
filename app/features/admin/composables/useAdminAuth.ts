import { ref, onMounted, type Ref } from 'vue'
import { useSessionStorage } from '@vueuse/core'

/** Handles admin password authentication with session persistence. */
export function useAdminAuth(onAuthenticated: () => void): {
  authenticated: Ref<boolean>
  passwordInput: Ref<string>
  passwordError: Ref<boolean>
  login: () => Promise<void>
  logout: () => void
} {
  const storedAuthToken = useSessionStorage<string>('admin-auth', '')
  const authenticated = ref(false)
  const passwordInput = ref('')
  const passwordError = ref(false)

  onMounted(() => {
    if (storedAuthToken.value === '1') {
      authenticated.value = true
      onAuthenticated()
    }
  })

  async function login() {
    try {
      await $fetch('/api/admin/auth', { method: 'POST', body: { password: passwordInput.value } })
      storedAuthToken.value = '1'
      authenticated.value = true
      passwordError.value = false
      onAuthenticated()
    } catch {
      passwordError.value = true
      passwordInput.value = ''
    }
  }

  function logout() {
    storedAuthToken.value = ''
    authenticated.value = false
  }

  return { authenticated, passwordInput, passwordError, login, logout }
}
