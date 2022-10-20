// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt'],
    typescript: {
        typeCheck: true,
    },
    css: ['@/assets/base.css'],
    // routes: {
    //     '/': { ssr: true },
    // },
})
