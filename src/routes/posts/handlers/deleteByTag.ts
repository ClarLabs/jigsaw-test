import { NextFunction, Request, Response } from 'express'
import { Post } from '../../../models/Post'
import { AppError, asyncHandler, flushCache } from '../../../utils'

export const deleteByTag = asyncHandler(async (req: Request<null, null, null, { tag: string }>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { tag } = req.query

		if (!tag) {
			throw new AppError('Tag is required', 400)
		}

		const result = await Post.deleteMany({ tags: tag })
		if (!result) {
			throw new AppError('No posts found with the given tag', 404)
		}

		await flushCache()

		res.json({ success: true })
	} catch (err) {
		next(err)
	}
})
