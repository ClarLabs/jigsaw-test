import { Request, Response, NextFunction } from 'express'
import { Post } from '../../../models/Post'
import { isMongoId } from '../../../utils'

export const getPostById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params

		if (!isMongoId(id)) {
			res.status(400).json({ error: 'Invalid or missing post ID' })
			return
		}

		const post = await Post.findById(id)
		if (!post) {
			res.status(404).json({ error: 'Post not found' })
			return
		}
		res.json(post)
	} catch (err) {
		next(err)
	}
}
