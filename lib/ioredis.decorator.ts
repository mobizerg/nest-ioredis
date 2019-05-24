import { Inject } from '@nestjs/common';
import { getClientToken } from './ioredis.helper';

export function InjectRedis(name?: string): ParameterDecorator {
  return Inject(getClientToken(name));
}