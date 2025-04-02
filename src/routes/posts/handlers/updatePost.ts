import { Request, Response, NextFunction } from 'express'
import { Post } from '../../../models/Post'
import { isMongoId } from '../../../utils'

export const updatePost = async (
	req: Request<{ id: string }, null, { title: string; content: string; tags: string[] }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params
		const updates = req.body

		if (!isMongoId(id)) {
			res.status(400).json({ error: 'Invalid or missing post ID' })
			return
		}

		const post = await Post.findById(id)
		if (!post) {
			res.status(404).json({ error: 'Post not found' })
			return
		}

		Object.assign(post, updates)

		await post.save()

		res.json(post)
	} catch (err) {
		next(err)
	}
}
