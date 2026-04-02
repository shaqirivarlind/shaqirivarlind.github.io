import type { Person } from '../types'
import profileImage from '~/assets/images/profile_image.png'
import personJson from './db/person.json'

export const person: Person = {
  ...(personJson as Omit<Person, 'profileImage'>),
  profileImage: profileImage as unknown as string,
}
