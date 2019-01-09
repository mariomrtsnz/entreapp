import { Badge } from '.'

let badge

beforeEach(async () => {
  badge = await Badge.create({ name: 'test', points: 'test', description: 'test', icon: 'test', pois: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = badge.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(badge.id)
    expect(view.name).toBe(badge.name)
    expect(view.points).toBe(badge.points)
    expect(view.description).toBe(badge.description)
    expect(view.icon).toBe(badge.icon)
    expect(view.pois).toBe(badge.pois)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = badge.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(badge.id)
    expect(view.name).toBe(badge.name)
    expect(view.points).toBe(badge.points)
    expect(view.description).toBe(badge.description)
    expect(view.icon).toBe(badge.icon)
    expect(view.pois).toBe(badge.pois)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
