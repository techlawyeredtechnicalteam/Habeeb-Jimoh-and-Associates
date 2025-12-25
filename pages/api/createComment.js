// pages/api/createComment.js
import { client } from '../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' })
  }

  try {
    const { _id, name, email, comment } = JSON.parse(req.body)

    // Basic validation
    const missingFields = []
    if (!_id) missingFields.push('_id')
    if (!name) missingFields.push('name')
    if (!email) missingFields.push('email')
    if (!comment) missingFields.push('comment')

    if (missingFields.length > 0) {
      console.log(`Missing fields: ${missingFields.join(', ')}`)
      return res.status(400).json({ message: 'Missing required fields', missingFields })
    }

    const result = await client.create({
      _type: 'comment',
      post: { _type: 'reference', _ref: _id },
      name,
      email,
      comment,
      approved: false, // default to false for moderation
    })

    res.status(200).json({ message: 'Comment submitted', result })
  } catch (err) {
    console.error('Create Comment Error:', err.message)
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
}
