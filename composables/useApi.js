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

    return {
        getPokedex,
        getPokeMap,
        getFedeemCode,
        getFetters,
    }
}
