/** To be used when using SSR or SSG. This avoids the dates serialization error  */
export function overcomeSerialization<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
