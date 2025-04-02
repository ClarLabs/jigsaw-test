import redis from 'ioredis'

const redisClient = new redis(process.env.REDIS_URI)

export const setCache = async (key: string, value: string, expiry: number) => {
	if (isNaN(expiry)) {
		throw new Error('Expiry time must be a number')
	}

	await redisClient.set(key, value, 'EX', expiry)
}

export const getCache = async (key: string) => {
	const value = await redisClient.get(key)
	return value
}

export const delCache = async (key: string) => {
	await redisClient.del(key)
}

export const flushCache = async () => {
	await redisClient.flushall()
}
