<script setup>
useHead({
    title: '升星計算',
})
const needExps = {
    beyond: [0, 0, 0, 1500, 5000, 10000, 13000, 17500, 23500, 31000, 41000],
    legend: [0, 0, 500, 2000, 5500, 10500, 13500, 18000, 24000, 31500, 41500],
    epic: [0, 0, 400, 1400, 3800, 7000, 7400, 8400, 10900, 16900, 24900],
    rare: [0, 100, 250, 550, 1300, 2800, 3000, 3300, 3900, 5400, 8400],
}
const poko = reactive({
    quality: 'rare',
    starLevel: 3,
    experience: '0',
})
const expEveryPoko = {
    beyond: 1500,
    legend: 400,
    epic: 75,
    rare: 30,
}
const minStar = {
    beyond: 2,
    legend: 1,
    epic: 1,
    rare: 0,
}
const expEveryChip = {
    beyond: 30,
    legend: 20,
    epic: 15,
    rare: 10,
}
const expsThisLevel = computed(() => {
    return needExps[poko.quality][poko.starLevel + 1] - needExps[poko.quality][poko.starLevel]
})
const result = computed(() => {
    return needExps[poko.quality]
        .map((exp, index) => {
            const exps = exp - needExps[poko.quality][poko.starLevel] - poko.experience
            return {
                starLevel: index < 6 ? index + 1 : `轉${index - 4}`,
                experience: exps,
                chips: Math.ceil(exps / expEveryChip[poko.quality]),
                pokos: Math.ceil(exps / expEveryPoko[poko.quality]),
            }
        })
        .filter((_, i) => i > poko.starLevel)
})
const handleSelectQuality = (quality) => {
    poko.quality = quality
    poko.experience = 0
    poko.starLevel = minStar[poko.quality]
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
</script>

<template>
    <main>
        <div class="page-title">升星計算機</div>
        <div class="note">
            <ul>
                <li>先選擇精靈品質、目前星級與目前經驗就能輕鬆算出剩餘經驗~</li>
                <li>目前的數據都是本體碎片，想要算小隻的碎片嗎...?開發中請稍後^^|</li>
            </ul>
        </div>
        <div class="star-input-container">
            <div>
                <div>精靈階級</div>
                <div class="quality-box">
                    <div
                        :class="poko.quality == 'rare' ? 'activeRare' : 'qualityBtn'"
                        @click="handleSelectQuality('rare')"
                    >
                        稀有
                    </div>
                    <div
                        :class="poko.quality == 'epic' ? 'activeEpic' : 'qualityBtn'"
                        @click="handleSelectQuality('epic')"
                    >
                        史詩
                    </div>
                    <div
                        :class="poko.quality == 'legend' ? 'activeLegend' : 'qualityBtn'"
                        @click="handleSelectQuality('legend')"
                    >
                        傳說
                    </div>
                    <div
                        :class="poko.quality == 'beyond' ? 'activeBeyond' : 'qualityBtn'"
                        @click="handleSelectQuality('beyond')"
                    >
                        超越
                    </div>
                </div>
            </div>
            <div>
                <div>目前星級</div>
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
                <div>目前星級經驗</div>
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
        </div>
        <div>
            <table>
                <tr>
                    <td>目標星級</td>
                    <td>還缺經驗</td>
                    <td>還缺碎片</td>
                    <td>還缺寵物(隻)</td>
                </tr>
                <tr v-for="data in result" :key="data.starLevel">
                    <td>{{ data.starLevel }}</td>
                    <td>{{ data.experience }}</td>
                    <td>{{ data.chips }}</td>
                    <td>{{ data.pokos }}</td>
                </tr>
            </table>
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
.activeBeyond {
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
</style>
