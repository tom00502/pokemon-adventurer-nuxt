<script setup>
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
useHead({
    title: '升星計算',
})
const useChipQuality = ref('normal')
const qualities = [
    { label: '一般', value: 'normal' },
    { label: '稀有', value: 'rare' },
    { label: '史詩', value: 'epic' },
    { label: '傳說', value: 'legend' },
    { label: '超越', value: 'supreme' },
]
const selectItems = computed(() => {
    return qualities.filter(
        (quality, index) => index <= qualities.findIndex((q) => q.value === poko.quality)
    )
})
const useQualityText = computed(() => {
    return qualities.find((q) => q.value === useChipQuality.value).label
})
const needExps = {
    supreme: [0, 0, 0, 1500, 5000, 10000, 13000, 17500, 23500, 31000, 41000],
    legend: [0, 0, 500, 2000, 5500, 10500, 13500, 18000, 24000, 31500, 41500],
    epic: [0, 0, 400, 1400, 3800, 7000, 7400, 8400, 10900, 16900, 24900],
    rare: [0, 100, 250, 550, 1300, 2800, 3000, 3300, 3900, 5400, 8400],
    normal: [0, 100, 250, 550, 1300, 2800, 3000, 3300, 3900, 5400, 8400],
}
const poko = reactive({
    quality: 'normal',
    starLevel: 0,
    experience: '0',
})
const expEveryPoko = {
    supreme: 1500,
    legend: 400,
    epic: 75,
    rare: 30,
    normal: 10,
}
const minStar = {
    supreme: 2,
    legend: 1,
    epic: 1,
    rare: 0,
    normal: 0,
}
const expEveryChip = {
    supreme: 30,
    legend: 20,
    epic: 15,
    rare: 10,
    normal: 5,
}
const expEveryChipSmall = {
    legend: 10,
    epic: 7.5,
    rare: 5,
    normal: 2.5,
}
const expEveryPokoSmall = {
    legend: 200,
    epic: 37.5,
    rare: 15,
    normal: 5,
}
const expsThisLevel = computed(() => {
    return needExps[poko.quality][poko.starLevel + 1] - needExps[poko.quality][poko.starLevel]
})
const result = computed(() => {
    return needExps[poko.quality]
        .map((exp, index) => {
            const exps = exp - needExps[poko.quality][poko.starLevel] - poko.experience
            let everyChip = expEveryChip[poko.quality]
            if (useChipQuality.value !== poko.quality) {
                everyChip = expEveryChipSmall[useChipQuality.value]
            }
            let everyPoko = expEveryPoko[poko.quality]
            if (useChipQuality.value !== poko.quality) {
                everyPoko = expEveryPokoSmall[useChipQuality.value]
            }
            return {
                starLevel: index < 6 ? index + 1 : t(`star.purple${index - 4}`),
                experience: exps,
                chips: Math.ceil(exps / everyChip),
                pokos: Math.ceil(exps / everyPoko),
            }
        })
        .filter((_, i) => i > poko.starLevel)
})
const handleSelectQuality = (quality) => {
    poko.quality = quality
    poko.experience = 0
    poko.starLevel = minStar[poko.quality]
    useChipQuality.value = quality
}
const starClass = (i) => {
    if (i > 5) {
        return poko.starLevel < i ? 'star-unselect2' : 'star-select2'
    }
    return poko.starLevel < i ? 'star-unselect' : 'star-select'
}
const handleChangeLevel = (level) => {
    if (level < minStar[poko.quality]) return
    poko.starLevel = level
    poko.experience = 0
}
const checkExperienceRange = () => {
    if (poko.experience < 0) {
        poko.experience = 0
    }
    if (poko.experience > expsThisLevel.value - 1) {
        poko.experience = expsThisLevel.value - 1
    }
}
const demandShards = computed(() => {
    const quality = t(`pokedex.quality.${useChipQuality.value}`)
    return t('star.demandShards', { quality })
})
const demandPokemons = computed(() => {
    const quality = t(`pokedex.quality.${useChipQuality.value}`)
    return t('star.demandPokemons', { quality })
})
</script>

<template>
    <main>
        <div class="page-title">{{ $t('star.pageTitle') }}</div>
        <div v-if="locale === 'en'" class="note">
            <ul>
                <li>
                    First, select the quality, current star level, and current experience of the
                    pokemon to easily calculate the remaining experience.
                </li>
                <li>You can choose what level of shards to use for feeding.</li>
                <li>
                    For pokemon which quality is legend but shine one is supreme, please use the
                    legend calculation.
                </li>
            </ul>
        </div>
        <div v-else class="note">
            <ul>
                <li>先選擇精靈品質、目前星級與目前經驗就能輕鬆算出剩餘經驗~</li>
                <li>可以選擇要使用什麼等級的碎片喂</li>
                <li>原本是傳說，閃光變超越的精靈請使用傳說計算</li>
            </ul>
        </div>
        <div class="star-input-container">
            <div>
                <div>{{ $t('star.pokeQuality') }}</div>
                <div class="quality-box">
                    <div
                        :class="poko.quality == 'normal' ? 'activeNormal' : 'qualityBtn'"
                        @click="handleSelectQuality('normal')"
                    >
                        {{ $t('pokedex.quality.normal') }}
                    </div>
                    <div
                        :class="poko.quality == 'rare' ? 'activeRare' : 'qualityBtn'"
                        @click="handleSelectQuality('rare')"
                    >
                        {{ $t('pokedex.quality.rare') }}
                    </div>
                    <div
                        :class="poko.quality == 'epic' ? 'activeEpic' : 'qualityBtn'"
                        @click="handleSelectQuality('epic')"
                    >
                        {{ $t('pokedex.quality.epic') }}
                    </div>
                    <div
                        :class="poko.quality == 'legend' ? 'activeLegend' : 'qualityBtn'"
                        @click="handleSelectQuality('legend')"
                    >
                        {{ $t('pokedex.quality.legend') }}
                    </div>
                    <div
                        :class="poko.quality == 'supreme' ? 'activeSupreme' : 'qualityBtn'"
                        @click="handleSelectQuality('supreme')"
                    >
                        {{ $t('pokedex.quality.supreme') }}
                    </div>
                </div>
            </div>
            <div>
                <div>{{ $t('star.currentlyStar') }}</div>
                <div class="star-box">
                    <div>
                        <IconStar class="star-select" @click="handleChangeLevel(0)" />
                        <IconStar
                            v-for="i in 5"
                            :key="i"
                            :class="starClass(i)"
                            @click="handleChangeLevel(i)"
                        />
                    </div>
                    <div>
                        <IconStar
                            :class="poko.starLevel < 5 ? 'star-unselect2' : 'star-select2'"
                            @click="handleChangeLevel(5)"
                        />
                        <IconStar
                            v-for="i in 5"
                            :key="i"
                            :class="starClass(i + 5)"
                            @click="handleChangeLevel(i + 5)"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div>{{ $t('star.currentlyExp') }}</div>
                <div class="w-full px-3">
                    <input
                        v-model="poko.experience"
                        type="range"
                        min="0"
                        :max="expsThisLevel - 1"
                        class="w-full"
                    />
                    <input
                        v-model="poko.experience"
                        type="number"
                        :max="expsThisLevel - 1"
                        class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        @change="checkExperienceRange()"
                        @keyup="checkExperienceRange()"
                    />
                    {{ ` / ${expsThisLevel}` }}
                </div>
            </div>
            <div>
                <div class="mr-2">{{ $t('star.useShard') }}</div>
                <label
                    class="border-type inline-flex cursor-pointer select-none flex-wrap items-center justify-center rounded-md border bg-white p-1"
                >
                    <span
                        v-for="item in selectItems"
                        :key="item.value"
                        class="type-text-color flex items-center space-x-[6px] rounded px-[18px] py-1 text-sm font-medium text-gray-400"
                        :class="{ active: useChipQuality == item.value, [item.value]: true }"
                        @click="() => (useChipQuality = item.value)"
                    >
                        {{ $t(`pokedex.quality.${item.value}`) }}
                    </span>
                </label>
            </div>
        </div>
        <div>
            <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap px-2 py-3">
                                {{ $t('star.targetStar') }}
                            </th>
                            <th scope="col" class="whitespace-nowrap px-2 py-3">
                                {{ $t('star.demandExperience') }}
                            </th>
                            <th scope="col" class="whitespace-nowrap px-2 py-3">
                                {{ demandShards }}
                            </th>
                            <th scope="col" class="whitespace-nowrap px-2 py-3">
                                {{ demandPokemons }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="data in result"
                            :key="data.starLevel"
                            class="border-b bg-white hover:bg-gray-50"
                        >
                            <td
                                scope="row"
                                class="whitespace-nowrap px-6 py-1 font-medium text-gray-900"
                            >
                                {{ data.starLevel }}
                            </td>
                            <td>{{ data.experience }}</td>
                            <td>{{ data.chips }}</td>
                            <td>{{ data.pokos }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="poko.starLevel === 10">已經是最大星級了</div>
        </div>
    </main>
</template>
<style scoped>
.star-input-container {
    margin: 1rem 0;
}
.star-input-container > div {
    display: flex;
    border-width: 1px;
    border-color: rgb(163 163 163);
    border-style: solid;
    width: 100%;
    align-items: center;
    padding: 0.25rem;
}
.star-unselect {
    color: rgb(255, 251, 202);
}
.star-unselect2 {
    color: rgb(255, 174, 248);
}
.star-select {
    color: rgb(255, 238, 0);
}
.star-select2 {
    color: rgb(255, 81, 241);
}
.quality-box {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    padding: 0.5rem;
}
.quality-box > div {
    cursor: pointer;
}
.star-box > div {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}
.star-box {
    width: 100%;
    padding: 0.5rem;
}
.star-input-container > div :nth-child(1) {
    flex-shrink: 0;
}
table {
    width: 100%;
}
.qualityBtn {
    border-width: 3px;
    border-color: rgb(163 163 163);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeSupreme {
    border-width: 3px;
    border-image-slice: 1;
    border-image-source: linear-gradient(
        135deg,
        #3632ff 0%,
        #3eff30 33%,
        #ffff00 66%,
        #ff5900 100%
    );
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeLegend {
    border-width: 3px;
    border-color: rgb(255, 253, 114);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeEpic {
    border-width: 3px;
    border-color: rgb(243, 116, 255);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeRare {
    border-width: 3px;
    border-color: rgb(136, 123, 255);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.activeNormal {
    border-width: 3px;
    border-color: rgb(210, 210, 210);
    border-style: solid;
    padding: 0.25rem;
    border-radius: 0.5rem;
}
.page-title {
    border-left: 8px solid rgb(248, 255, 60);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
.w-25 {
    width: 100px;
}
.w-full {
    width: 100%;
}
.px-3 {
    padding-left: 12px;
    padding-right: 12px;
}
.type-text-color.active {
    color: black;
    background-color: yellow;
}
.type-text-color.normal {
    color: rgb(145, 145, 145);
}
.type-text-color.normal.active {
    color: black;
    background-color: rgb(190, 190, 190, 0.5);
}
.type-text-color.rare {
    color: rgb(136, 123, 255);
}
.type-text-color.rare.active {
    color: black;
    background-color: rgb(136, 123, 255, 0.5);
}
.type-text-color.epic {
    color: rgb(243, 116, 255);
}
.type-text-color.epic.active {
    color: black;
    background-color: rgb(243, 116, 255);
}
.type-text-color.legend {
    color: rgb(197, 174, 0);
}
.type-text-color.legend.active {
    color: black;
    background-color: rgb(255, 225, 0);
}
.type-text-color.supreme {
    color: black;
}
.type-text-color.supreme.active {
    color: black;
    background: linear-gradient(135deg, #3632ffcc 0%, #3eff30cc 33%, #ffff00cc 66%, #ff5900cc 100%);
}
</style>
