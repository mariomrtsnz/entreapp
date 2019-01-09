import { Supercategory } from '.'

let supercategory

beforeEach(async () => {
  supercategory = await Supercategory.create({ name: 'test', categories: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = supercategory.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(supercategory.id)
    expect(view.name).toBe(supercategory.name)
    expect(view.categories).toBe(supercategory.categories)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = supercategory.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(supercategory.id)
    expect(view.name).toBe(supercategory.name)
    expect(view.categories).toBe(supercategory.categories)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
