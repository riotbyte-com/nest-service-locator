import { Injectable } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { beforeAll, describe, expect, it } from 'vitest'
import { defineTag, ServiceLocator, ServiceLocatorModule } from '../src'

interface GreeterService {
  greet(): string
}

const GreeterTag = defineTag<{ language: string }, GreeterService>(
  'test.greeter',
)

@GreeterTag.decorator({ language: 'en' })
class EnglishGreeter implements GreeterService {
  greet() {
    return 'hello'
  }
}

@GreeterTag.decorator({ language: 'nl' })
class DutchGreeter implements GreeterService {
  greet() {
    return 'hallo'
  }
}

const UnrelatedTag = defineTag<object>('test.unrelated')

@UnrelatedTag.decorator({})
class UnrelatedService {}

@Injectable()
class UntaggedService {}

describe('ServiceLocator', () => {
  let locator: ServiceLocator

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ServiceLocatorModule],
      providers: [
        EnglishGreeter,
        DutchGreeter,
        UnrelatedService,
        UntaggedService,
      ],
    }).compile()

    await moduleRef.init()

    locator = moduleRef.get(ServiceLocator)
  })

  it('should find all providers tagged with a given tag', () => {
    const greeters = locator.tagged(GreeterTag)

    expect(greeters).toHaveLength(2)
  })

  it('should return the correct service instances', () => {
    const greeters = locator.tagged(GreeterTag)
    const greetings = greeters.map((g) => g.service.greet()).sort()

    expect(greetings).toEqual(['hallo', 'hello'])
  })

  it('should return the correct metadata for each tagged service', () => {
    const greeters = locator.tagged(GreeterTag)
    const languages = greeters.map((g) => g.metadata.language).sort()

    expect(languages).toEqual(['en', 'nl'])
  })

  it('should not include providers tagged with a different tag', () => {
    const greeters = locator.tagged(GreeterTag)

    expect(greeters.every((g) => 'greet' in g.service)).toBe(true)
  })

  it('should not include untagged providers', () => {
    const greeters = locator.tagged(GreeterTag)

    expect(greeters.every((g) => !(g.service instanceof UntaggedService))).toBe(
      true,
    )
  })

  it('should return an empty array when no providers match the tag', () => {
    const emptyTag = defineTag<object>('test.nonexistent')
    const result = locator.tagged(emptyTag)

    expect(result).toEqual([])
  })
})
