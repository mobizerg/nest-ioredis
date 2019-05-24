import { upperCase } from 'lodash';

export function getClientToken(name?: string): string {
  return name ? `IOREDIS_CLIENT_${upperCase(name)}` : 'IOREDIS_CLIENT_DEFAULT';
}