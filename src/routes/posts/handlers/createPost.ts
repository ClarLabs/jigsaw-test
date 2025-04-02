import { Request, Response, NextFunction } from 'express'
import { Post } from '../../../models/Post'

export const createPost = async (
	req: Request<null, null, { title: string; content: string; tags: string }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { title, content, tags } = req.body

		if (!title || !content) {
			throw { status: 400, message: 'Title and content are required' }
		}

		const newPost = new Post({
			title,
			content,
			tags
		})

		await newPost.save()
		res.json(newPost)
	} catch (err) {
		next(err)
	}
}
