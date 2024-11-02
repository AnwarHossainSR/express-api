import redisClient from '../config/redis.js';
import { logMsg } from './logProducer.js';

export const getDataFromRedis = async (key) => {
    const cachedData = await redisClient.get(key);
    return JSON.parse(cachedData);
};

export const setDataToRedis = async (key, data, cacheDuration) => {
    await redisClient.setex(key, cacheDuration, JSON.stringify(data));
    return;
};

export const invalidKey = async (key, logId) => {
    logMsg(logId, `invalidating redis key : ${key}`, {});
    await redisClient.del(key);
};