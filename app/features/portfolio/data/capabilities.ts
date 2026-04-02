import type { CapabilityGroup } from '../types'
import capabilitiesJson from './db/capabilities.json'

export const capabilities: CapabilityGroup[] = capabilitiesJson as CapabilityGroup[]
