import { Like } from '.'

let like

beforeEach(async () => {
  like = await Like.create({ name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = like.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(like.id)
    expect(view.name).toBe(like.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = like.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(like.id)
    expect(view.name).toBe(like.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
