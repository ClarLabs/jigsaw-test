import { NextFunction, Request, Response } from 'express'
import { Post } from '../../../models/Post'
import { AppError, asyncHandler, delCache, isMongoId } from '../../../utils'

export const deletePost = asyncHandler(async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params

		if (!isMongoId(id)) {
			throw new AppError('Invalid or missing post ID', 400)
		}

		const result = await Post.findOneAndDelete({ _id: id })
		if (!result) {
			throw new AppError('Post not found', 404)
		}

		const cacheKey = `post:${id}`
		await delCache(cacheKey)

		res.json({ success: true })
	} catch (err) {
		next(err)
	}
})
