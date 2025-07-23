import pokemonNames from '@/assets/json/pokemonNames.json'

export default function usePokemonI18n() {
    const { locale } = useI18n()
    const { typeTwToEn, typeZhToJa } = usePokeTypes()

    const getLocalizedPokemonName = (poke, isShiny = false) => {
        const localizedName = pokemonNames[poke.id]?.[locale.value] || poke.name

        if (isShiny) {
            switch (locale.value) {
                case 'en':
                    return `Shiny ${localizedName}`
                case 'ja':
                    return `色違い${localizedName}`
                default:
                    return `閃光${localizedName}`
            }
        }
        return localizedName
    }

    const getLocalizedAttributes = (attributes) => {
        switch (locale.value) {
            case 'en':
                return attributes.map((attr) => typeTwToEn[attr])
            case 'ja':
                return attributes.map((attr) => typeZhToJa[attr] || attr)
            default:
                return attributes
        }
    }

    return {
        getLocalizedPokemonName,
        getLocalizedAttributes,
        pokemonNames,
    }
}
