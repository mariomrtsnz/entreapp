import { Route } from '.'

let route

beforeEach(async () => {
  route = await Route.create({ pois: 'test', name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = route.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(route.id)
    expect(view.pois).toBe(route.pois)
    expect(view.name).toBe(route.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = route.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(route.id)
    expect(view.pois).toBe(route.pois)
    expect(view.name).toBe(route.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
