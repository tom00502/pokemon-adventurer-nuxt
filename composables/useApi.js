export default function () {
    const getPokedex = () => {
        return $fetch(
            `https://script.google.com/macros/s/AKfycbwMEr5d0g08gTv4RvSP6YgN2Z8k1BDAxUbN-d-91zGh0kdmlBFM07GMCfbb38n0-lqJGw/exec`
        )
    }
    const getPokeMap = () => {
        return $fetch(
            `https://script.google.com/macros/s/AKfycby3jODTS-UFwoG_LyXHnZcAngZ2_W92FN61FGzKPGY386iBrIwZw8-uJIJi_TO4aBtiiw/exec`
        )
    }
    const getGradeCardUseMap = () => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbxxLRozScSHr-gYz0CUPLWfbFEq_UvUcYFss8RxjEZgoGkY4MX49xtRl1mDVa_jxMQh/exec`,
            {
                initialCache: false,
            }
        )
    }
    const getFedeemCode = () => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbxyQO-P42H1bBXLOMPSP1wGg8KKLZQBdjgDISpZdJvWGkQEi6DajrXINrmHARhogt2t/exec`
        )
    }
    const getFetters = () => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbxr5ezZSSQQe3NrdxtsmeySCGfUwrQhvUvqLnOnyflq7CV3DxlT3FS_jml-9vWYyLKA/exec`
        )
    }
    const getVersions = () => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbw_xM4gumNLckM-htuV8MrUSZ3Mn2aTCZ1Ncqwk0TZ5srC1ONZ3Dz76NqzDHI6pOM2HPQ/exec`
        )
    }
    // 公布欄
    const getBulletin = () => {
        return $fetch(
            `https://script.google.com/macros/s/AKfycbzTwo2CVGwx6JCzm2bYCEyg1w58HsLsKmQaTxfrxOTloRE0NVo-F1iGLvv-CZCwJF0/exec`
        )
    }
    // 特性
    const getFeatures = () => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbyjh0Pa3eTxl3HkPu8Lxr3KZc38FefnB3GTY9eBkUy5wmxljMfmiRDxF1mgsWnxFsfE/exec`
        )
    }
    // 特性
    const setFeatures = (params) => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycby57l-eHLh3Yl7fC6okG9Uai22zSP-jXw2vN1BnVMyM34LopWSFgjZ_3KjtgvXIV3ZA/exec`,
            {
                params,
                initialCache: false,
            }
        )
    }
    const reportFeatures = (params) => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbzTOdHSOL-3ZHJL_soqYmno0SWQBeJuCqAaPamHj857Ksf70zT47AllJlYonuwLUUGuQg/exec`,
            {
                params,
                initialCache: false,
            }
        )
    }
    // 輸入招式
    const setMoves = (params) => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbynCV-VmE0GbE03yKzF3ll9ZT5Xy66nrErWrtlBytc_82NgLMK2XaE8KU08h-OwJU4-/exec`,
            {
                params,
                initialCache: false,
            }
        )
    }
    // 名稱投票
    const sentVoteName = (params) => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycby2RqkqwO8DRAKZK4maa-fqrUdvG1kLHCPFQ_xR7JzUhdz-dDVqJudsJN5RPjrXEOwz/exec`,
            {
                params,
                initialCache: false,
            }
        )
    }
    // 取得貓貓圖
    const getCat = () => {
        return useFetch(`https://api.thecatapi.com/v1/images/search`, { initialCache: false })
    }
    // 寶可夢卡製作
    const createPokeCard = (params) => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbyEoKt_Ov3kkoJqyKk-DvYJyY1DnFiBbNE5LYfXYETNVE9AVZRUEZG0zWmlQDJPi_k5DA/exec`,
            {
                params,
                initialCache: false,
            }
        )
    }
    // 取得貓貓圖
    const getPokeCards = () => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbxwRRgn_MmmIU_ZNpKPLHmbvloh-apbPgeZrirDe8p_PFehz7KPzsgT0rKQjMqQNohNSw/exec`,
            { initialCache: false }
        )
    }

    // 輸入品階卡牌
    const setGradeCards = (params) => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbxOFbEdRJa37TS_hyEXS-FeKPxYOHbWnemDOmC5HO85r8JVcNo0oW17l2hYavH-XQ8ZVQ/exec`,
            {
                params,
                initialCache: false,
            }
        )
    }
    return {
        getPokedex,
        getPokeMap,
        getGradeCardUseMap,
        getFedeemCode,
        getFetters,
        getVersions,
        getBulletin,
        getFeatures,
        setFeatures,
        reportFeatures,
        setMoves,
        sentVoteName,
        getCat,
        createPokeCard,
        getPokeCards,
        setGradeCards,
    }
}
// https://script.google.com/macros/s/AKfycbz0QDPThr95w28Tn8E-2-UGhYACop87tRQvi2uc5Vk/dev?pokeId=1&feature=65,34&featureName=特性1,特性2
