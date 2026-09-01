import { getSortedPostsData } from '../../../lib/posts'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const posts = getSortedPostsData().map((post, index) => ({
    ...post,
    category: post.category || (index % 2 ? 'Product' : 'Engineering')
  }))

  return res.status(200).json({ posts })
}