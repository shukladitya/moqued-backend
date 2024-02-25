import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { redisStore } from 'cache-manager-redis-yet';

const redisClient = createClient();
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

export const redisPromptStore = {
  store: redisStore,
  url: `redis://localhost:6379`,
  isGlobal: true,
  ttl: 24 * 60 * 60,
};
// Two different redis configurations one is used in main to store session data and other is used in appModule to store prompt data
