// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  supabase: {
    url: 'https://efsuncuatwxltkyysiaz.supabase.co',
    key: 'sb_publishable_dfm7wA7GHzk-7cVnGQXVBQ_CyVwaSmn'
  },
  runtimeConfig: {
    public: {
      supabaseUrl: 'https://efsuncuatwxltkyysiaz.supabase.co',
      supabaseAnonKey: 'sb_publishable_dfm7wA7GHzk-7cVnGQXVBQ_CyVwaSmn',
    }
  }
})
