import { findBrowserLocale, getComposer } from 'vue-i18n-routing'
import { useRoute, useRouter, useRequestHeaders, useCookie as _useCookie, useNuxtApp } from '#imports'
import { parseAcceptLanguage } from '#build/i18n.internal.mjs'
import { nuxtI18nInternalOptions, nuxtI18nOptionsDefault, localeCodes as _localeCodes } from '#build/i18n.options.mjs'
import {
  useRouteBaseName as _useRouteBaseName,
  useLocalePath as _useLocalePath,
  useLocaleRoute as _useLocaleRoute,
  useSwitchLocalePath as _useSwitchLocalePath,
  useLocaleHead as _useLocaleHead
} from 'vue-i18n-routing'

import type { Ref } from 'vue'
import type { DetectBrowserLanguageOptions } from '#build/i18n.options.mjs'

export * from 'vue-i18n'
export type { LocaleObject } from 'vue-i18n-routing'
import type { Locale } from 'vue-i18n'

export function useRouteBaseName(
  route: NonNullable<Parameters<typeof _useRouteBaseName>[0]> = useRoute()
): ReturnType<typeof _useRouteBaseName> {
  const router = useRouter()
  return _useRouteBaseName(route, { router })
}

export function useLocalePath(
  options: Pick<NonNullable<Parameters<typeof _useLocalePath>[0]>, 'i18n'> = {}
): ReturnType<typeof _useLocalePath> {
  const i18n = options.i18n || getComposer(useNuxtApp().$i18n)
  const route = useRoute()
  const router = useRouter()
  return _useLocalePath({
    router,
    route,
    i18n
  })
}

export function useLocaleRoute(
  options: Pick<NonNullable<Parameters<typeof _useLocaleRoute>[0]>, 'i18n'> = {}
): ReturnType<typeof _useLocaleRoute> {
  const i18n = options.i18n || getComposer(useNuxtApp().$i18n)
  const route = useRoute()
  const router = useRouter()
  return _useLocaleRoute({
    router,
    route,
    i18n
  })
}

export function useSwitchLocalePath(
  options: Pick<NonNullable<Parameters<typeof _useSwitchLocalePath>[0]>, 'i18n'> = {}
): ReturnType<typeof _useSwitchLocalePath> {
  const i18n = options.i18n || getComposer(useNuxtApp().$i18n)
  const route = useRoute()
  const router = useRouter()
  return _useSwitchLocalePath({
    router,
    route,
    i18n
  })
}

export function useLocaleHead(
  options: Pick<
    NonNullable<Parameters<typeof _useLocaleHead>[0]>,
    'i18n' | 'addDirAttribute' | 'addSeoAttributes' | 'identifierAttribute'
  > = {
    addDirAttribute: false,
    addSeoAttributes: false,
    identifierAttribute: 'hid'
  }
): ReturnType<typeof _useLocaleHead> {
  const { addDirAttribute, addSeoAttributes, identifierAttribute } = options
  const i18n = options.i18n || getComposer(useNuxtApp().$i18n)
  const route = useRoute()
  const router = useRouter()
  return _useLocaleHead({
    addDirAttribute,
    addSeoAttributes,
    identifierAttribute,
    router,
    route,
    i18n
  })
}

export function useBrowserLocale(normalizedLocales = nuxtI18nInternalOptions.__normalizedLocales): string | null {
  const headers = useRequestHeaders(['accept-language'])
  return (
    findBrowserLocale(
      normalizedLocales,
      process.client ? (navigator.languages as string[]) : parseAcceptLanguage(headers['accept-language'] || '')
    ) || null
  )
}

export function useCookieLocale({
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  cookieKey = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieKey,
  localeCodes = _localeCodes
}: Pick<DetectBrowserLanguageOptions, 'useCookie' | 'cookieKey'> & {
  localeCodes: readonly string[]
}): Ref<string> {
  // @ts-ignore NOTE: `ref` is auto-imported from `nuxt`
  const locale: Ref<string> = ref('')

  if (useCookie) {
    let code: string | null = null
    if (process.client) {
      const cookie = _useCookie<string>(cookieKey) as Ref<string>
      code = cookie.value
    } else if (process.server) {
      const cookie = useRequestHeaders(['cookie'])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      code = (cookie as any)[cookieKey]
    }

    if (code && localeCodes.includes(code)) {
      locale.value = code
    }
  }

  return locale
}

const warnRuntimeUsage = (method: string) =>
  console.warn(
    method +
      '() is a compiler-hint helper that is only usable inside ' +
      'the script block of a single file component. Its arguments should be ' +
      'compiled away and passing it at runtime has no effect.'
  )

/**
 * TODO:
 *  `paths`, `locales` completions like `unplugin-vue-router`
 *  ref: https://github.com/posva/unplugin-vue-router
 */

/**
 * The i18n custom route for page components
 */
export interface I18nRoute {
  /**
   * Customize page component routes per locale.
   *
   * @description You can specify static and dynamic paths for vue-router.
   */
  paths?: Record<Locale, string>
  /**
   * Some locales to which the page component should be localized.
   */
  locales?: string[]
}

/**
 * Define custom route for page component
 *
 * @param route - The custou route
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function defineI18nRoute(route: I18nRoute | false): void {
  if (process.dev) {
    warnRuntimeUsage('defineI18nRoute')
  }
}
