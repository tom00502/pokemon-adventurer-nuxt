<script setup>
import { $vfm } from 'vue-final-modal'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
import moment from 'moment'
useHead({
    title: '時間',
})
const { locale } = useI18n()
const pokedexStore = usePokedexStore()
const abilities = pokedexStore.showAbilities
const searchText = ref('')
const poke = ref({ name: '' })
const handleClickAbility = (ability) => {
    const params = {
        abilityId: ability.id,
    }
    $vfm.show('ShowAbilityModal', params)
}

const filterAbilities = computed(() => {
    let result = abilities
    if (poke.value?.id) {
        const abilityIds = poke.value.features
        result = result.filter((result) => abilityIds.includes(result.id))
    }
    if (locale.value === 'en') {
        result = result.map((ability) => {
            return {
                ...ability,
                name: ability.nameEn || ability.name,
                descript: ability.descriptEn || ability.descript,
            }
        })
    }
    if (searchText.value === '') return result
    return result.filter(
        (ability) =>
            ability.name.includes(searchText.value) ||
            ability.descript.includes(searchText.value)
    )

})
const pokes = computed(() => {
    return pokedexStore.pokes.filter((poke) => poke.features.length).map((poke) => ({
        ...poke,
        ...(locale.value === 'en' && { name: poke.names.en || poke.name })
    }))
})
const convertRealTimeToGameTime = computed(() => {
  // 將實際時間轉換為 moment 物件
  const realTimeMoment = moment();

  // 計算遊戲時間經過的總分鐘數
  const totalMinutes = realTimeMoment.diff(moment().startOf('day'), 'minutes');
  console.log(totalMinutes, 'totalMinutes')
  // 遊戲時間比實際時間快 4 倍，所以遊戲時間經過的分鐘數是實際時間的 4 倍
  const gameTimeMinutes = totalMinutes * 4;

  // 遊戲時間一天有 6 小時，也就是 360 分鐘
  const remainingMinutes = gameTimeMinutes;

  // 計算遊戲時間的小時和分鐘
  const gameHours = Math.floor(remainingMinutes / 60) - 6;
  const gameMinutes = remainingMinutes % 60;

  // 格式化遊戲時間
  const gameTime = moment().startOf('day')
    .add(gameHours, 'hours')
    .add(gameMinutes, 'minutes')
  return gameTime;
})
const isGameTimeDay = computed(()=> {
    return convertRealTimeToGameTime.value.hours() >= 6 && convertRealTimeToGameTime.value.hours() < 18
})
const dayNightCountdown = ref('')
const calcDayNightCountdown = () => {
    const now = moment();
    const currentHour = now.hour() + 1;

    let targetHour = Math.ceil(currentHour / 3) * 3;
    if (targetHour === 24) {
        targetHour = 0;
    }
    console.log(targetHour, 'targetHour', currentHour, 'currentHour')
    let targetTime = moment().hour(targetHour).minute(0).second(0); 
    let remainingDuration = moment.duration(targetTime.diff(now));

    if (remainingDuration.asSeconds() < 0) {
        targetTime.add(1, 'day'); // 如果目標時間在隔天，加上一天
        remainingDuration = moment.duration(targetTime.diff(now));
    }
    return remainingDuration.hours() + ':' + remainingDuration.minutes();
}
const calcTimer = () => {
    dayNightCountdown.value = calcDayNightCountdown()
}
onMounted(() => {
    calcTimer()
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
    setInterval(() => {
        calcTimer()
    }, 60000)
})
</script>
<template>
    <main>
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="6422833388"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <div class="flex justify-between">
            <div class="page-title">{{ $t('timepiece.title') }}</div>
        </div>
        遊戲時間：13:06(早上)
        狩獵場: 開啟/關閉
        天梯: 開啟/關閉
        答題: 開啟/關閉
        領取美食: 開啟/關閉
        <table class="w-full text-center text-sm text-gray-500">
            <thead class="bg-gray-50 uppercase text-gray-700">
                <tr>
                    <th
                        scope="col"
                        class="sticky left-0 z-10 whitespace-nowrap bg-gray-50 py-3 px-2"
                    >
                        項目
                    </th>
                    <th
                        
                        scope="col"
                        class="whitespace-nowrap py-3 px-2"
                    >
                        目前狀態
                    </th>
                    <th
                        
                        scope="col"
                        class="whitespace-nowrap py-3 px-2"
                    >
                        倒數
                    </th>
                    <th
                        
                        scope="col"
                        class="whitespace-nowrap py-3 px-2"
                    >
                        說明
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="border-b bg-white hover:bg-gray-50"
                >
                    <td
                        scope="row"
                        class="sticky left-0 z-10 whitespace-nowrap bg-white py-1 px-1 font-medium text-gray-900"
                    >
                        遊戲內時間
                    </td>
                    <td class="whitespace-nowrap">
                        <!-- <div
                            v-for="card in useRecord.gradeCards.find(
                                (levelCard) => levelCard.level === level.id
                            )?.cards || []"
                            :key="card.id"
                            class="m-1 cursor-pointer rounded-md py-1 px-2"
                            :class="{
                                'bg-gray-100': card.quality === 'normal',
                                'bg-blue-100': card.quality === 'rare',
                                'bg-purple-100': card.quality === 'epic',
                                'bg-orange-100': card.quality === 'legend',
                                'bg-red-100': card.quality === 'supreme',
                            }"
                            @click="handleClickGradeCard(card)"
                        >
                            {{ card.name }}
                        </div> -->
                        <div v-if="isGameTimeDay" class="bg-green-200 m-1  rounded-md py-1 px-2">({{ convertRealTimeToGameTime.format('HH:mm') }})</div>
                        <div v-else class="bg-gray-500 text-white m-1  rounded-md py-1 px-2">晚上({{ convertRealTimeToGameTime.format('HH:mm') }})</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isGameTimeDay" class="m-1  rounded-md py-1 px-2">{{ dayNightCountdown }}後晚上</div>
                        <div v-else class="m-1 rounded-md py-1 px-2">{{ dayNightCountdown }}後白天</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div>白天：06:00-18:00</div>
                        <div>晚上：18:00-06:00</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>
<style scoped>
.page-title {
    border-left: 8px solid rgb(83, 60, 255);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
</style>
