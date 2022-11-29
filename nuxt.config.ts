import { VitePWA } from 'vite-plugin-pwa'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt', '@nuxtjs/sitemap'],
    typescript: {
        typeCheck: true,
    },
    css: ['@/assets/base.css', 'vue-select/dist/vue-select.css'],
    sitemap: {
        hostname: 'https://pokemon-adventurer.parsons125.in/',
    },
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
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.ico',
                },
            ],
            script: [
                // Global site tag (gtag.js) - Google Analytics
                {
                    async: true,
                    src: 'https://www.googletagmanager.com/gtag/js?id=G-JB4VS0GNG7',
                },
                {
                    children: `window.dataLayer = window.dataLayer || []
                    function gtag() {
                        dataLayer.push(arguments)
                    }
                    gtag('js', new Date())
        
                    gtag('config', 'G-JB4VS0GNG7')`,
                },
                // Google Tag Manager
                {
                    children: `;(function (w, d, s, l, i) {
                        w[l] = w[l] || []
                        w[l].push({
                            'gtm.start': new Date().getTime(),
                            event: 'gtm.js',
                        })
                        var f = d.getElementsByTagName(s)[0],
                            j = d.createElement(s),
                            dl = l != 'dataLayer' ? '&l=' + l : ''
                        j.async = true
                        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
                        f.parentNode.insertBefore(j, f)
                    })(window, document, 'script', 'dataLayer', 'GTM-WF8JSC5')`,
                },
                // Google AdSense
                {
                    async: true,
                    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2683150416576260',
                    crossorigin: 'anonymous',
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
