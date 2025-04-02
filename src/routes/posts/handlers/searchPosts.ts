import { Request, Response, NextFunction } from 'express'
import { Post } from '../../../models/Post'

export const searchPosts = async (
	req: Request<null, null, null, { q: string; page?: string; limit?: string }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { page = 1, limit = 10, q } = req.query

		if (!q) {
			throw { status: 400, message: 'Title and content are required' }
		}

		const results = await Post.find({
			$or: [{ title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } }]
		})
			.limit(parseInt(`${limit}`))
			.skip((parseInt(`${page}`) - 1) * parseInt(`${limit}`))
			.sort({ createdAt: -1 })

		if (results.length === 0) {
			res.status(404).json({ message: 'No posts found' })
			return
		}

		res.json({ results, totalCount: results.length, pages: Math.ceil(results.length / parseInt(`${limit}`)) })
	} catch (err) {
		console.log(err)
		next(err)
	}
}
