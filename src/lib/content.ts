import { DbTableKey } from "../shared/types";

export async function loadContent<T>(key: DbTableKey): Promise<T> {
  const mod = await import(`../content/${key}.json`);

  return mod.default as T;
}
