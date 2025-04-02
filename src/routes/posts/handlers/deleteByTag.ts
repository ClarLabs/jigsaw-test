import { Request, Response, NextFunction } from 'express'
import { Post } from '../../../models/Post'

export const deleteByTag = async (req: Request<null, null, null, { tag: string }>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { tag } = req.query

		if (!tag) {
			res.status(400).json({ error: 'Tag is required' })
			return
		}

		const result = await Post.deleteMany({ tags: tag })
		if (!result) {
			res.status(404).json({ error: 'Post not found' })
			return
		}
		res.json({ success: true })
	} catch (err) {
		next(err)
	}
}
