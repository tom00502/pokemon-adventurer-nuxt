import { VitePWA } from 'vite-plugin-pwa'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt', '@nuxtjs/sitemap'],
    typescript: {
        typeCheck: true,
    },
    css: ['@/assets/base.css'],
    app: {
        head: {
            title: '寵物冒險助理',
            meta: [
                {
                    name: 'description',
                    content: '寵物冒險助理,寵物冒險家,攻略,轉生模擬器,升星計算機',
                },
                {
                    name: 'theme-color',
                    content: '#ffffff',
                },
                {
                    property: 'og:url',
                    content: 'https://pokemon-adventurer.parsons125.in/',
                },
                {
                    property: 'og:locale',
                    content: 'zh_TW',
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:title',
                    content: '寵物冒險助理',
                },
                {
                    property: 'og:description',
                    content: '寵物冒險家攻略、轉生模擬器、升星計算機',
                },
                {
                    property: 'og:image',
                    content: 'https://pokemon-adventurer.parsons125.in/pokeball.svg',
                },
                {
                    property: 'og:image:type',
                    content: 'image/svg+xml',
                },
                {
                    property: 'og:image:width',
                    content: '220',
                },
                {
                    property: 'og:image:height',
                    content: '220',
                },
            ],
        },
    },
    vite: {
        plugins: [
            VitePWA({
                registerType: 'autoUpdate',
                includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
                manifest: {
                    name: '寵物冒險助理',
                    short_name: '寵物冒險助理',
                    description: '玩寵物冒險家的好幫手',
                    theme_color: '#ffffff',
                    icons: [
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any maskable',
                        },
                    ],
                },
            }),
        ],
    },
})
