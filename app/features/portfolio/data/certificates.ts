import type { Certificate } from '../types'
import certificatesJson from './db/certificates.json'

export const certificates: Certificate[] = certificatesJson as Certificate[]
