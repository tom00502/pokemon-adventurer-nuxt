export default function () {
    const getPokedex = () => {
        return $fetch(
            `https://script.google.com/macros/s/AKfycbxBZQlkYxP0dsQq4-ENX4OWDB72Bq2TBfUJ1xR-S68WHAQRIIyFzawz7wwRF44n-3Cidw/exec`
        )
    }
    const getPokeMap = () => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycby3jODTS-UFwoG_LyXHnZcAngZ2_W92FN61FGzKPGY386iBrIwZw8-uJIJi_TO4aBtiiw/exec`
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
    const getＶersions = () => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbw_xM4gumNLckM-htuV8MrUSZ3Mn2aTCZ1Ncqwk0TZ5srC1ONZ3Dz76NqzDHI6pOM2HPQ/exec`
        )
    }
    // 公布欄
    const getBulletin = () => {
        return useFetch(
            `https://script.google.com/macros/s/AKfycbzTwo2CVGwx6JCzm2bYCEyg1w58HsLsKmQaTxfrxOTloRE0NVo-F1iGLvv-CZCwJF0/exec`
        )
    }

    return {
        getPokedex,
        getPokeMap,
        getFedeemCode,
        getFetters,
        getＶersions,
        getBulletin,
    }
}
