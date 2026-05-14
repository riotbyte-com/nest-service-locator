import { describe, expect, it } from 'vitest'
import { defineTag, TAG_METADATA_KEY } from '../src'

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

  it('should attach tag metadata to a class via decorator()', () => {
    const tag = defineTag<{ name: string }>('middleware')

    @tag.decorator({ name: 'my-middleware' })
    class Decorated {}

    const attached = Reflect.getMetadata(TAG_METADATA_KEY, Decorated)

    expect(attached).toEqual([
      { name: tag.name, metadata: { name: 'my-middleware' } },
    ])
  })

  it('should not attach metadata to undecorated classes', () => {
    class Bare {}

    expect(Reflect.getMetadata(TAG_METADATA_KEY, Bare)).toBeUndefined()
  })

  it('should accept classes with strongly-typed constructor params', () => {
    class Dependency {}
    const tag = defineTag<{ kind: string }>('typed-ctor')

    @tag.decorator({ kind: 'typed' })
    class Consumer {
      constructor(public readonly dep: Dependency) {}
    }

    expect(Reflect.getMetadata(TAG_METADATA_KEY, Consumer)).toHaveLength(1)
  })
})
