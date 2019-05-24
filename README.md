<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A Ioredis integration module for Nest.js framework.
</p>

### Installation

**Yarn**
```bash
yarn add @mobizerg/nest-ioredis ioredis
yarn add @types/ioredis --dev
```

**NPM**
```bash
npm install @mobizerg/nest-ioredis ioredis --save
npm install @types/ioredis --save-dev
```

### Description
Redis integration module for [Nest.js](https://github.com/nestjs/nest) based on the [Ioredis](https://github.com/luin/ioredis) package.

### Usage

Import the **IoredisModule** in `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { IoredisModule } from '@mobizerg/nest-ioredis';

@Module({
    imports: [
        IoredisModule.register(options);
    ],
})
export class AppModule {}
```
With Async
```typescript
import { Module } from '@nestjs/common';
import { IoredisModule } from '@mobizerg/nest-ioredis';

@Module({
    imports: [
        IoredisModule.registerAsync({
            imports: [ConfigModule],
            useExisting: IoredisConfigService,
        }),
    ],
})
export class AppModule {}
```

Example config file (async)
```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';
import { IoredisModuleOptions, IoredisOptionsFactory } from '@mobizerg/nest-ioredis';

@Injectable()
export class IoredisConfigService implements IoredisOptionsFactory {

  constructor(private readonly config: ConfigService) {}

  createIoredisOptions(name?: string): IoredisModuleOptions {
      
    return {
      name,
      host: this.config.redisHost,
      port: this.config.redisPort,
      db: this.config.redisDatabase,
      keyPrefix: this.config.redisPrefix,
    };
  }
}
```

Importing inside services
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@mobizerg/nest-ioredis';
import { Redis } from 'ioredis';
import { serialize } from 'class-transformer';

@Injectable()
export class IoredisService {

  constructor(@InjectRedis(REDIS_CLIENT_NAME)
              private readonly client: Redis) {}

  async publish<T>(event: string, payload: T): Promise<number> {
    return await this.client.publish(event, serialize(payload));
  }
}
```

### License

MIT
