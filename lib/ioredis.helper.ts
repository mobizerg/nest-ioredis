export function getClientToken(name?: string): string {
  return name ? `IOREDIS_CLIENT_${name.toUpperCase()}` : 'IOREDIS_CLIENT_DEFAULT';
}
