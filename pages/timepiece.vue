<script setup>
import { $vfm } from 'vue-final-modal'
import { usePokedexStore } from '@/stores/pokedex'
import moment from 'moment'
import 'moment-timezone';
const { locale, t } = useI18n()
useHead({
    title: t('timepiece.title'),
    meta: [
        {
            name: 'description',
            content: t('timepiece.ogDescription')
        },
        {
            property: 'og:title',
            content: t('timepiece.title')
        },
        {
            property: 'og:description',
            content: t('timepiece.ogDescription')
        },
    ]
})
const pokedexStore = usePokedexStore()
const abilities = pokedexStore.showAbilities
const searchText = ref('')
const poke = ref({ name: '' })
const gameUtcOffset = computed(()=>{
    if(locale.value === 'en') return 0
    return 480
})
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
  const realTimeMoment = moment().utc().utcOffset(gameUtcOffset.value);

  // 計算遊戲時間經過的總分鐘數
  const totalMinutes = realTimeMoment.diff(moment().utc().utcOffset(gameUtcOffset.value).startOf('day'), 'minutes');
  // 遊戲時間比實際時間快 4 倍，所以遊戲時間經過的分鐘數是實際時間的 4 倍
  const gameTimeMinutes = totalMinutes * 4;

  // 遊戲時間一天有 6 小時，也就是 360 分鐘
  const remainingMinutes = gameTimeMinutes;

  // 計算遊戲時間的小時和分鐘
  const gameHours = Math.floor(remainingMinutes / 60) - 6;
  const gameMinutes = remainingMinutes % 60;

  // 格式化遊戲時間
  const gameTime = moment().utc().utcOffset(gameUtcOffset.value).startOf('day')
    .add(gameHours, 'hours')
    .add(gameMinutes, 'minutes')
  return gameTime;
})
const isGameTimeDay = computed(()=> {
    return convertRealTimeToGameTime.value.hours() >= 6 && convertRealTimeToGameTime.value.hours() < 18
})
const isSafariOpen = computed(()=>{
    const realTimeMoment = moment().utc().utcOffset(gameUtcOffset.value);
    if ((realTimeMoment.hour() >= 10 && realTimeMoment.hour() < 12) || (realTimeMoment.hour() >= 18 && realTimeMoment.hour() < 22)) {
        return true
    }
    return false
})
const isDelicacyOpen = computed(()=>{
    const realTimeMoment = moment().utc().utcOffset(gameUtcOffset.value);
    if ((realTimeMoment.hour() >= 12 && realTimeMoment.hour() < 14) || (realTimeMoment.hour() >= 18 && realTimeMoment.hour() < 20) || (realTimeMoment.hour() >= 22 && realTimeMoment.hour() < 24)) {
        return true
    }
    return false
})
const isPokemenQaOpen = computed(()=>{
    const realTimeMoment = moment().utc().utcOffset(gameUtcOffset.value);
    if ((realTimeMoment.hour() >= 12 && realTimeMoment.hour() < 13)){
        return true
    }
    return false
})
const isBattleOpen = computed(()=>{
    const realTimeMoment = moment().utc().utcOffset(gameUtcOffset.value);
    if ((realTimeMoment.hour() >= 13 && realTimeMoment.hour() < 14) || (realTimeMoment.hour() >= 20 && realTimeMoment.hour() < 23)) {
        return true
    }
    return false
})
const dayNightCountdown = ref('')
const safariCountdown = ref('')
const delicacyCountdown = ref('')
const pokemenQaCountdown = ref('')
const battleCountdown = ref('')
const calcDayNightCountdown = () => {
    const now = moment().utc().utcOffset(gameUtcOffset.value);
    const currentHour = now.hour() + 1;

    let targetHour = Math.ceil(currentHour / 3) * 3;
    if (targetHour === 24) {
        targetHour = 0;
    }
    let targetTime = moment().utc().utcOffset(gameUtcOffset.value).hour(targetHour).minute(0).second(0); 
    let remainingDuration = moment.duration(targetTime.diff(now));

    if (remainingDuration.asSeconds() < 0) {
        targetTime.add(1, 'day'); // 如果目標時間在隔天，加上一天
        remainingDuration = moment.duration(targetTime.diff(now));
    }
    return String(remainingDuration.hours()).padStart(2, '0') + 'h ' + String(remainingDuration.minutes()).padStart(2, '0') + 'm';
}
const calcSafariCountdown = () => {
    const now = moment().utc().utcOffset(gameUtcOffset.value);
    const currentHour = now.hour() + 1;
    const timePicker = [10, 12, 18, 22]
    let targetHour = 10
    for (let i = 0; i < timePicker.length; i++) {
        if (currentHour <= timePicker[i]) {
            targetHour = timePicker[i]
            break
        }
    }
    const targetTime = moment().utc().utcOffset(gameUtcOffset.value).hour(targetHour).minute(0).second(0);
    let remainingDuration = moment.duration(targetTime.diff(now));
    if (remainingDuration.asSeconds() < 0) {
        targetTime.add(1, 'day'); // 如果目標時間在隔天，加上一天
        remainingDuration = moment.duration(targetTime.diff(now));
    }
    return String(remainingDuration.hours()).padStart(2, '0') + 'h ' + String(remainingDuration.minutes()).padStart(2, '0') + 'm';
}
const calcDelicacyCountdown = () => {
    const now = moment().utc().utcOffset(gameUtcOffset.value);
    const currentHour = now.hour() + 1;
    let timePicker = [11, 13, 17, 19, 21, 23]
    if(locale.value === 'en') timePicker = [12, 14, 18, 20, 22, 24]
    let targetHour = 12
    for (let i = 0; i < timePicker.length; i++) {
        if (currentHour <= timePicker[i]) {
            targetHour = timePicker[i]
            break
        }
    }
    const targetTime = moment().utc().utcOffset(gameUtcOffset.value).hour(targetHour).minute(0).second(0);
    let remainingDuration = moment.duration(targetTime.diff(now));
    if (remainingDuration.asSeconds() < 0) {
        targetTime.add(1, 'day'); // 如果目標時間在隔天，加上一天
        remainingDuration = moment.duration(targetTime.diff(now));
    }
    return String(remainingDuration.hours()).padStart(2, '0') + 'h ' + String(remainingDuration.minutes()).padStart(2, '0') + 'm';
}
const calcPokemonQaCountdown = () => {
    const now = moment().utc().utcOffset(gameUtcOffset.value);
    const currentHour = now.hour() + 1;
    const timePicker = [12, 13]
    let targetHour = 12
    for (let i = 0; i < timePicker.length; i++) {
        if (currentHour <= timePicker[i]) {
            targetHour = timePicker[i]
            break
        }
    }
    const targetTime = moment().utc().utcOffset(gameUtcOffset.value).hour(targetHour).minute(0).second(0);
    let remainingDuration = moment.duration(targetTime.diff(now));
    if (remainingDuration.asSeconds() < 0) {
        targetTime.add(1, 'day'); // 如果目標時間在隔天，加上一天
        remainingDuration = moment.duration(targetTime.diff(now));
    }
    return String(remainingDuration.hours()).padStart(2, '0') + 'h ' + String(remainingDuration.minutes()).padStart(2, '0') + 'm';
}
const calcBattleCountdown = () => {
    const now = moment().utc().utcOffset(gameUtcOffset.value);
    const currentHour = now.hour() + 1;
    const timePicker = [13, 14, 20, 23]
    let targetHour = 13
    for (let i = 0; i < timePicker.length; i++) {
        if (currentHour <= timePicker[i]) {
            targetHour = timePicker[i]
            break
        }
    }
    const targetTime = moment().utc().utcOffset(gameUtcOffset.value).hour(targetHour).minute(0).second(0);
    let remainingDuration = moment.duration(targetTime.diff(now));
    if (remainingDuration.asSeconds() < 0) {
        targetTime.add(1, 'day'); // 如果目標時間在隔天，加上一天
        remainingDuration = moment.duration(targetTime.diff(now));
    }
    return String(remainingDuration.hours()).padStart(2, '0') + 'h ' + String(remainingDuration.minutes()).padStart(2, '0') + 'm';
}
const calcTimer = () => {
    dayNightCountdown.value = calcDayNightCountdown()
    safariCountdown.value = calcSafariCountdown()
    delicacyCountdown.value = calcDelicacyCountdown()
    pokemenQaCountdown.value = calcPokemonQaCountdown()
    battleCountdown.value = calcBattleCountdown()
}
const timeConvert = (hour) => {
    // 輸入一個utc時間，轉換成當地時間
    const utcTime = moment().utc().utcOffset(gameUtcOffset.value).set({hour: hour, minute: 0, second: 0, millisecond: 0})
    return utcTime.utcOffset(moment().utcOffset()).format('HH:mm')
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
        <table class="w-full text-center text-sm text-gray-500">
            <thead class="bg-gray-50 uppercase text-gray-700">
                <tr>
                    <th
                        scope="col"
                        class="sticky left-0 z-10 whitespace-nowrap bg-gray-50 py-3 px-2"
                    >
                        {{ $t('timepiece.event')}}
                    </th>
                    <th
                        
                        scope="col"
                        class="whitespace-nowrap py-3 px-2"
                    >
                        {{ $t('timepiece.status')}}
                    </th>
                    <th
                        
                        scope="col"
                        class="whitespace-nowrap py-3 px-2"
                    >
                    {{ $t('timepiece.countdown')}}
                    </th>
                    <th
                        
                        scope="col"
                        class="whitespace-nowrap py-3 px-2"
                    >
                    {{ $t('timepiece.description')}}
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
                        {{ $t('timepiece.gameTime')}}
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isGameTimeDay" class="bg-green-200 m-1  rounded-md py-1 px-2">{{ $t('timepiece.day')}}({{ convertRealTimeToGameTime.format('HH:mm') }})</div>
                        <div v-else class="bg-gray-500 text-white m-1  rounded-md py-1 px-2">{{ $t('timepiece.night')}}({{ convertRealTimeToGameTime.format('HH:mm') }})</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isGameTimeDay" class="m-1  rounded-md py-1 px-2">{{ $t('timepiece.toNight', {time: dayNightCountdown}) }}</div>
                        <div v-else class="m-1 rounded-md py-1 px-2">{{ $t('timepiece.toDay', {time: dayNightCountdown}) }}</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div>{{ $t('timepiece.day')}}: {{timeConvert(3)}}-{{timeConvert(6)}}、{{timeConvert(9)}}-{{timeConvert(12)}}、{{timeConvert(15)}}-{{timeConvert(18)}}、{{timeConvert(21)}}-{{timeConvert(24)}}</div>
                        <div>{{ $t('timepiece.night')}}: {{timeConvert(0)}}-{{timeConvert(3)}}、{{timeConvert(6)}}-{{timeConvert(9)}}、{{timeConvert(12)}}-{{timeConvert(15)}}、{{timeConvert(18)}}-{{timeConvert(21)}}</div>
                    </td>
                </tr>
                <tr
                    class="border-b bg-white hover:bg-gray-50"
                >
                    <td
                        scope="row"
                        class="sticky left-0 z-10 whitespace-nowrap bg-white py-1 px-1 font-medium text-gray-900"
                    >
                        {{ $t('timepiece.safari')}}
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isSafariOpen" class="bg-green-200 m-1  rounded-md py-1 px-2">{{ $t('timepiece.open')}}</div>
                        <div v-else class="bg-gray-500 text-white m-1  rounded-md py-1 px-2">{{ $t('timepiece.close')}}</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isSafariOpen" class="m-1  rounded-md py-1 px-2">{{ $t('timepiece.closeIn', {time: safariCountdown}) }}</div>
                        <div v-else class="m-1 rounded-md py-1 px-2">{{ $t('timepiece.openIn', {time: safariCountdown}) }}</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div>{{ $t('timepiece.open')}}: {{timeConvert(10)}}-{{timeConvert(12)}}、{{timeConvert(18)}}-{{timeConvert(22)}}</div>
                    </td>
                </tr>
                <tr
                    class="border-b bg-white hover:bg-gray-50"
                >
                    <td
                        scope="row"
                        class="sticky left-0 z-10 whitespace-nowrap bg-white py-1 px-1 font-medium text-gray-900"
                    >
                        {{ $t('timepiece.delicacy')}}
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isDelicacyOpen" class="bg-green-200 m-1  rounded-md py-1 px-2">{{ $t('timepiece.open')}}</div>
                        <div v-else class="bg-gray-500 text-white m-1  rounded-md py-1 px-2">{{ $t('timepiece.close')}}</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isDelicacyOpen" class="m-1  rounded-md py-1 px-2">{{ $t('timepiece.closeIn', {time: delicacyCountdown}) }}</div>
                        <div v-else class="m-1 rounded-md py-1 px-2">{{ $t('timepiece.openIn', {time: delicacyCountdown}) }}</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <template v-if="locale=='en'">
                            <div>{{ $t('timepiece.lunch')}}: {{timeConvert(12)}}-{{timeConvert(14)}}</div>
                            <div>{{ $t('timepiece.dinner')}}: {{timeConvert(18)}}-{{timeConvert(20)}}</div>
                            <div>{{ $t('timepiece.snacks')}}: {{timeConvert(22)}}-{{timeConvert(24)}}</div>
                        </template>
                        <template v-else>
                            <div>{{ $t('timepiece.lunch')}}: {{timeConvert(11)}}-{{timeConvert(13)}}</div>
                            <div>{{ $t('timepiece.dinner')}}: {{timeConvert(17)}}-{{timeConvert(19)}}</div>
                            <div>{{ $t('timepiece.snacks')}}: {{timeConvert(21)}}-{{timeConvert(23)}}</div>
                        </template>
                    </td>
                </tr>
                <tr
                    class="border-b bg-white hover:bg-gray-50"
                >
                    <td
                        scope="row"
                        class="sticky left-0 z-10 whitespace-nowrap bg-white py-1 px-1 font-medium text-gray-900"
                    >
                        {{ $t('timepiece.pokemonQa')}}
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isPokemenQaOpen" class="bg-green-200 m-1  rounded-md py-1 px-2">{{ $t('timepiece.open')}}</div>
                        <div v-else class="bg-gray-500 text-white m-1  rounded-md py-1 px-2">{{ $t('timepiece.close')}}</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isPokemenQaOpen" class="m-1  rounded-md py-1 px-2">{{ $t('timepiece.closeIn', {time: pokemenQaCountdown}) }}</div>
                        <div v-else class="m-1 rounded-md py-1 px-2">{{ $t('timepiece.openIn', {time: pokemenQaCountdown}) }}</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div>{{ $t('timepiece.open')}}: {{timeConvert(12)}}-{{timeConvert(13)}}</div>
                        <div class="text-blue-600"><RouterLink
                                :to="localePath('/pokoQA')"
                                class="flex justify-center"
                            >
                            {{ $t('qa.title') }}
                            </RouterLink>
                        </div>
                    </td>
                </tr>
                <tr
                    class="border-b bg-white hover:bg-gray-50"
                >
                    <td
                        scope="row"
                        class="sticky left-0 z-10 whitespace-nowrap bg-white py-1 px-1 font-medium text-gray-900"
                    >
                        {{ $t('timepiece.ladderBattle')}}
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isBattleOpen" class="bg-green-200 m-1  rounded-md py-1 px-2">{{ $t('timepiece.open')}}</div>
                        <div v-else class="bg-gray-500 text-white m-1  rounded-md py-1 px-2">{{ $t('timepiece.close')}}</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div v-if="isBattleOpen" class="m-1  rounded-md py-1 px-2">{{ $t('timepiece.closeIn', {time: battleCountdown}) }}</div>
                        <div v-else class="m-1 rounded-md py-1 px-2">{{ $t('timepiece.openIn', {time: battleCountdown}) }}</div>
                    </td>
                    <td class="whitespace-nowrap">
                        <div>{{ $t('timepiece.open')}}: {{timeConvert(13)}}-{{timeConvert(14)}}、{{timeConvert(20)}}-{{timeConvert(23)}}</div>
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
