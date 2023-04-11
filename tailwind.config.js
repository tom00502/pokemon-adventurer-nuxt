module.exports = {
    content: [
        'index.html',
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                poke: {
                    primary: '#C02121',
                    'disable-primary': '#DF9090',
                    body: '#767070',
                    line: '#C4C4C4',
                    history: '#767070',
                    draft: '#ECECEC',
                    press: '#EA8585',
                    disable: '#C4C4C4',
                    information: '#FFDE8A',
                },
                type: {
                    龍: 'rgba(160,140,255, 0.2)',
                },
            },
            boxShadow: {
                header: '0px 4px 12px rgba(140, 140, 140, 0.4)',
                item: '0px 2px 12px rgba(177, 177, 177, 0.4)',
                'select-box': '0px 5px 16px rgba(146, 140, 151, 0.25)',
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
}
