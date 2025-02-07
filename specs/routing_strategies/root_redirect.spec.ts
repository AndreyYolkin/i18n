import { test, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, url, fetch } from '@nuxt/test-utils'

await setup({
  rootDir: fileURLToPath(new URL(`../fixtures/basic`, import.meta.url)),
  browser: true,
  // overrides
  nuxtConfig: {
    i18n: {
      strategy: 'prefix',
      defaultLocale: 'en',
      rootRedirect: 'fr'
    }
  }
})

test('can redirect to rootRedirect option path', async () => {
  const res = await fetch('/')
  expect(res.url).toBe(url('/fr'))
})
