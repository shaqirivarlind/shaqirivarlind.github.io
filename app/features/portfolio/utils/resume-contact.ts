export function resumeContactEntryIcon(entry: string): string {
  switch (entry) {
    case 'portfolio':
      return 'mdi-file-account'
    case 'location':
      return 'mdi-map-marker-outline'
    case 'phone':
      return 'mdi-phone-outline'
    case 'linkedin':
      return 'mdi-linkedin'
    case 'github':
      return 'mdi-github'
    case 'gitlab':
      return 'mdi-gitlab'
    case 'email':
      return 'mdi-email-outline'
    default:
      return 'mdi-link-variant'
  }
}
