import { DynamicModule, Inject, Module, Provider } from '@nestjs/common';
import { IoredisModuleAsyncOptions, IoredisModuleOptions, IoredisOptionsFactory } from './interfaces';
import { createIoredisClient } from './ioredis-client.provider';
import { IOREDIS_MODULE_OPTIONS } from './ioredis.constant';
import { getClientToken } from './ioredis.helper';

@Module({})
export class IoredisModule {

  constructor(@Inject(IOREDIS_MODULE_OPTIONS)
              private readonly options: IoredisModuleOptions) {}

  static register(options: IoredisModuleOptions): DynamicModule {
    return {
      module: IoredisModule,
      providers: [
        createIoredisClient(options.name),
        { provide: IOREDIS_MODULE_OPTIONS, useValue: options },
      ],
      exports: [getClientToken(options.name)],
    };
  }

  static registerAsync(options: IoredisModuleAsyncOptions): DynamicModule {
    return {
      module: IoredisModule,
      imports: options.imports || [],
      providers: [
        createIoredisClient(options.name),
        ...this.createAsyncProviders(options),
      ],
      exports: [getClientToken(options.name)],
    };
  }

  private static createAsyncProviders(options: IoredisModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  private static createAsyncOptionsProvider(options: IoredisModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: IOREDIS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: IOREDIS_MODULE_OPTIONS,
      useFactory: async (optionsFactory: IoredisOptionsFactory) => await optionsFactory.createRedisOptions(options.name),
      inject: [options.useExisting || options.useClass],
    };
  }

  // async onModuleDestroy() {
  //   const client = this.moduleRef.get<Redis>(getClientToken(this.options.name));
  //   client && (await client.quit());
  // }
}
