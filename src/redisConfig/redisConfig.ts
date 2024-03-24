import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { RedisModuleOptions } from '@nestjs-modules/ioredis';

const redisClient = createClient({
  url: 'redis://redis:6379',
});
// { // put these configurations in createClient
//   port: 6379,
//   host: 'localhost',
//   family: 4, // 4 (IPv4) or 6 (IPv6)
//   password: 'your-redis-server-password',
//   db: 0, //Redis database number
// }
redisClient.connect().catch(console.error);

export const redisSessionStore = new RedisStore({
  client: redisClient,
  prefix: 'session:',
  ttl: 1000 * 60 * 60 * 24 * 90,
});

export const redisPromptStore: RedisModuleOptions = {
  type: 'single',
  url: 'redis://redis:6379',
};
// Two different redis configurations one is used in main to store session data and other is used in appModule to store prompt data
