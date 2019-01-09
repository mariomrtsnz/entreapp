import { Comment } from '.'
import { User } from '../user'

let user, comment

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  comment = await Comment.create({ user, rating: 'test', content: 'test', poi: 'test', photos: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = comment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(comment.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.rating).toBe(comment.rating)
    expect(view.content).toBe(comment.content)
    expect(view.poi).toBe(comment.poi)
    expect(view.photos).toBe(comment.photos)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = comment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(comment.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.rating).toBe(comment.rating)
    expect(view.content).toBe(comment.content)
    expect(view.poi).toBe(comment.poi)
    expect(view.photos).toBe(comment.photos)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
