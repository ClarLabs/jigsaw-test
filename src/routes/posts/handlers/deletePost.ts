import { Request, Response, NextFunction } from 'express'
import { Post } from '../../../models/Post'
import { isMongoId } from '../../../utils'

export const deletePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params

		if (!isMongoId(id)) {
			res.status(400).json({ error: 'Invalid or missing post ID' })
			return
		}

		const result = await Post.findOneAndDelete({ _id: id })
		if (!result) {
			res.status(404).json({ error: 'Post not found' })
			return
		}
		res.json({ success: true })
	} catch (err) {
		next(err)
	}
}
