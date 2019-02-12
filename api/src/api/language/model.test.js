import { Language } from '.'

let language

beforeEach(async () => {
  language = await Language.create({ name: 'test', isoCode: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = language.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(language.id)
    expect(view.name).toBe(language.name)
    expect(view.isoCode).toBe(language.isoCode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = language.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(language.id)
    expect(view.name).toBe(language.name)
    expect(view.isoCode).toBe(language.isoCode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
