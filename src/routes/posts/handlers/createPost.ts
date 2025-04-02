import { NextFunction, Request, Response } from 'express'
import { Post } from '../../../models/Post'
import { AppError, asyncHandler, flushCache } from '../../../utils'

export const createPost = asyncHandler(
	async (req: Request<null, null, { title: string; content: string; tags: string }>, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { title, content, tags } = req.body

			if (!title || !content) {
				throw new AppError('Title and content are required', 400)
			}

			const newPost = new Post({
				title,
				content,
				tags
			})

			await newPost.save()

			await flushCache()
			res.json(newPost)
		} catch (err) {
			next(err)
		}
	}
)
