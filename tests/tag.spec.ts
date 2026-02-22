import { defineTag } from '../src'

describe('defineTag', () => {
  it('should create a tag definition with a unique symbol name', () => {
    const tag = defineTag<object>('my-tag')

    expect(typeof tag.name).toBe('symbol')
    expect(tag.name.toString()).toBe('Symbol(my-tag)')
  })

  it('should produce unique symbols for the same string name', () => {
    const tag1 = defineTag<object>('duplicate')
    const tag2 = defineTag<object>('duplicate')

    expect(tag1.name).not.toBe(tag2.name)
  })

  it('should create tags with the correct metadata via make()', () => {
    const tag = defineTag<{ handles: string }>('handler')
    const result = tag.make({ handles: 'my-message' })

    expect(result.name).toBe(tag.name)
    expect(result.metadata).toEqual({ handles: 'my-message' })
  })

  it('should return a decorator function from decorator()', () => {
    const tag = defineTag<{ name: string }>('middleware')
    const decorator = tag.decorator({ name: 'my-middleware' })

    expect(typeof decorator).toBe('function')
  })
})
