import { RedisOptions } from 'ioredis';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface IoredisModuleOptions extends RedisOptions {
  name?: string;
}

export interface IoredisOptionsFactory {
  createRedisOptions(name?: string): Promise<IoredisModuleOptions> | IoredisModuleOptions;
}

export interface IoredisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<IoredisOptionsFactory>;
  useClass?: Type<IoredisOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<IoredisModuleOptions> | IoredisModuleOptions;
  inject?: any[];
}
