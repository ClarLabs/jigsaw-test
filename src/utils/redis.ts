import redis from 'ioredis'

const redisClient = new redis(process.env.REDIS_URI)

export const setCache = async (key: string, value: string, expiry: number) => {
	if (isNaN(expiry)) {
		throw new Error('Expiry time must be a number')
	}

	try {
		await redisClient.set(key, value, 'EX', expiry)
	} catch (e) {
		console.error('Error setting cache:', e)
		throw new Error('Failed to set cache')
	}

	await redisClient.set(key, value, 'EX', expiry)
}

export const getCache = async (key: string) => {
	try {
		const value = await redisClient.get(key)
		return value
	} catch (e) {
		console.error('Error getting cache:', e)
		throw new Error('Failed to get cache')
	}
}

export const delCache = async (key: string) => {
	try {
		await redisClient.del(key)
	} catch (e) {
		console.error('Error deleting cache:', e)
		throw new Error('Failed to delete cache')
	}
}

export const flushCache = async () => {
	try {
		await redisClient.flushall()
	} catch (e) {
		console.error('Error flushing cache:', e)
		throw new Error('Failed to flush cache')
	}
}
