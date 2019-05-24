import * as Redis from 'ioredis';
import { getClientToken } from './ioredis.helper';
import { FactoryProvider } from '@nestjs/common/interfaces';
import { IoredisModuleOptions } from './interfaces';
import { IOREDIS_MODULE_OPTIONS } from './ioredis.constant';

export const createIoredisClient: (name?: string) => FactoryProvider = (name?: string) => ({
  provide: getClientToken(name),
  useFactory: (options: IoredisModuleOptions) => {
    return new Redis(options);
  },
  inject: [IOREDIS_MODULE_OPTIONS],
});