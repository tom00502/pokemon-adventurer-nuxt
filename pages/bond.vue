<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePokedexStore } from '@/stores/pokedex'
import bonds from '@/assets/json/bond.json'

const { locale, t } = useI18n()

useHead({
    title: t('bond.title'),
    meta: [
        {
            name: 'description',
            content: t('bond.ogDescription'),
        },
        {
            property: 'og:title',
            content: t('bond.title'),
        },
        {
            property: 'og:description',
            content: t('bond.ogDescription'),
        },
    ],
})
const pokedexStore = usePokedexStore()

const bondsWithNames = computed(() => {
    return bonds.map(bond => {
        const pokemon = pokedexStore.pokedex[bond.id]
        return {
            ...bond,
            pokemonName: pokemon?.name || `ID: ${bond.id}`,
        }
    })
})
</script>

<template>
<main>
    <div class="page-title">{{ t('bond.title') }}</div>
    <div class="table-div">
        <table v-if="bondsWithNames.length">
            <thead>
                <tr>
                    <th>{{ t('bond.pokemon') }}</th>
                    <th>{{ t('bond.ability') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in bondsWithNames" :key="key">
                    <td>
                        <div>{{ item.pokemonName }}</div>
                    </td>
                    <td>
                        <div>{{ item.effect[locale] }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</main>
</template>
<style scoped>
table {
    margin-top: 8px;
    font-size: 14px;
    /* border-collapse: collapse; */
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 8px;
}

td {
    padding: 4px;
    border-bottom: 1px solid rgb(177, 177, 177);
}

/*第一欄第一列：左上*/
tr:first-child td:first-child {
    border-top-left-radius: 8px;
}

/*第一欄最後列：左下*/
tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}

/*最後欄第一列：右上*/
tr:first-child td:last-child {
    border-top-right-radius: 10px;
}

/*最後欄第一列：右下*/
tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
}

.page-title {
    border-left: 8px solid rgb(83, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
</style>
