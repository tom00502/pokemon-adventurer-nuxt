<script setup>
import { $vfm } from 'vue-final-modal'
import html2canvas from 'html2canvas'
import { useI18n } from 'vue-i18n'
import { usePokedexStore } from '@/stores/pokedex'
import { useDistributionStore } from '@/stores/distribution'
import pokedexRef from '@/assets/json/pokedexRef.json'
const { gradeCardlevel } = useGradeCard()
const route = useRoute()
const pokedexStore = usePokedexStore()
const distributionStore = useDistributionStore()
const { costGroup } = usePokeSource()
const { attackCalc, typeTwToEn, qualityEnToTw, getTypeColors } = usePokeTypes()
const { id } = route.params
const { locale, t } = useI18n()
const pokemon = computed(() => {
    return pokedexStore.pokedex[id] || { stat: {} }
})
const pokeRef = computed(() => {
    if (!pokemon.value.zukanId) return {}
    return (
        pokedexRef.find(
            (poke) =>
                poke.zukan_id === pokemon.value.zukanId &&
                poke.zukan_sub_id === pokemon.value.zukanSubId
        ) || {}
    )
})
const gradeCardUse = computed(() => {
    return (
        pokedexStore.gradeCardUses.find((use) => use.poke.id === pokemon.value.id) || {
            gradeCards: [],
        }
    )
})
const gradeTotal = computed(() => {
    let cash = 0
    let stone = 0
    const cards = []
    Object.values(gradeCardlevel).forEach((level) => {
        cash += level.useCash || 0
        stone += level.useStone || 0
    })
    gradeCardUse.value?.gradeCards?.forEach((levelUse) => {
        levelUse.cards.forEach((card) => {
            const cardData = cards.find((c) => c.id === card.id)
            if (cardData) {
                cardData.count += 1
            } else {
                cards.push({
                    ...card,
                    count: 1,
                })
            }
        })
    })
    return {
        cash,
        stone,
        cards,
    }
})
const handleClickGradeCard = (gradeCard) => {
    const params = {
        gradeCardId: gradeCard?.id,
    }
    $vfm.show('ShowGradeCardModal', params)
}
const pokeImg = computed(() => {
    if (pokemon.value.img) return pokemon.value.img
    return `https://tw.portal-pokemon.com/play/resources/pokedex${pokeRef.value.file_name}`
})

const shinyIncomes = computed(() => {
    return costGroup(id, '閃光來襲')
})
const holidayCarnivals = computed(() => {
    return costGroup(id, '假日狂歡')
})
const summerSales = computed(() => {
    return costGroup(id, '夏日特賣')
})
const benefitExchanges = computed(() => {
    return costGroup(id, '福利兌換')
})
const limitedTimeSales = computed(() => {
    return costGroup(id, '限時特賣')
})
const limitedPurchasePackages = computed(() => {
    return costGroup(id, '限購禮包')
})
const pikachuLands = computed(() => {
    return costGroup(id, '皮卡丘樂園')
})
const luckyPools = computed(() => {
    return costGroup(id, '口袋幸運池')
})
const continuousLogins = computed(() => {
    return costGroup(id, '連續登入')
})
const rechargeEverydays = computed(() => {
    return costGroup(id, '天天儲值')
})
const continuousRecharges = computed(() => {
    return costGroup(id, '日連續儲值')
})
const rechargeCompetitions = computed(() => {
    return costGroup(id, '充值比拚')
})
const gashaponRankings = computed(() => {
    return costGroup(id, '扭蛋排名')
})
const hiringPool = computed(() => {
    return costGroup(id, '招募獎池')
})
const monthlyGift = computed(() => {
    return costGroup(id, '月禮包')
})
const hiringRank = computed(() => {
    return costGroup(id, '招募排行')
})
const limitedTimeOffer = computed(() => {
    return costGroup(id, '限時特惠')
})
const magicalFlip = computed(() => {
    return costGroup(id, '神奇翻翻樂')
})
const astrology = computed(() => {
    return costGroup(id, '精靈占星')
})
const grassCatch = computed(() => {
    const maps = distributionStore.pokeMaps.filter(
        (map) =>
            (map.type === '草叢' ||
                map.type === '試煉之地' ||
                map.type === '寶可夢世界' ||
                map.type === '狩獵場') &&
            map.pokes.some((poke) => poke.id === pokemon.value.id)
    )
    return maps
})
const lottoMachines = computed(() => {
    const maps = distributionStore.pokeMaps.filter(
        (map) =>
            (map.type === '精靈扭蛋機' || map.type === '主題扭蛋機') &&
            map.pokes.some((poke) => poke.id === pokemon.value.id)
    )
    return maps
})
const callFlutes = computed(() => {
    const maps = distributionStore.pokeMaps.filter(
        (map) => map.type === '召喚笛' && map.pokes.some((poke) => poke.id === pokemon.value.id)
    )
    return maps
})

const attack = computed(() => {
    return Object.values(typeTwToEn).map((type) => {
        let attack = 1
        pokemon.value.attribute?.forEach((t) => {
            attack *= attackCalc[type][typeTwToEn[t]]
        })
        return { name: type, attack }
    })
})
const getAttackTypes = (atk) => {
    return attack.value.filter((type) => type.attack === atk)
}
// .filter((map) => map.type === '草叢')
// && map.pokes.some((poke) => poke.id === pokemon.value.id)
const shinyKey = computed(() => {
    return isShiny.value ? 'sStat' : 'stat'
})
const chartData = computed(() => {
    return {
        labels: [
            `${t('pokemon.hp')}(${pokemon.value[shinyKey.value].hp})`,
            `${t('pokemon.spAtk')}(${pokemon.value[shinyKey.value].sAttack})`,
            `${t('pokemon.spDef')}(${pokemon.value[shinyKey.value].sDefense})`,
            `${t('pokemon.speed')}(${pokemon.value[shinyKey.value].speed})`,
            `${t('pokemon.defense')}(${pokemon.value[shinyKey.value].defense})`,
            `${t('pokemon.attack')}(${pokemon.value[shinyKey.value].attack})`,
        ],
        datasets: [
            {
                label: '種族值',
                backgroundColor: typeColor.value.alphaColor,
                borderColor: typeColor.value.color,
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [
                    pokemon.value[shinyKey.value].hp,
                    pokemon.value[shinyKey.value].sAttack,
                    pokemon.value[shinyKey.value].sDefense,
                    pokemon.value[shinyKey.value].speed,
                    pokemon.value[shinyKey.value].defense,
                    pokemon.value[shinyKey.value].attack,
                ],
                fill: 'origin',
            },
        ],
    }
})
const typeColor = computed(() => {
    if (useType.value) return getTypeColors(useType.value)
    let type = 'normal'
    if (pokemon.value.attribute) {
        type = typeTwToEn[pokemon.value.attribute[0]] || 'normal'
    }
    return getTypeColors(type)
})
const attacks = [
    { title: '2倍弱', value: 2 },
    { title: '4倍弱', value: 4 },
    { title: '2倍抗', value: 0.5 },
    { title: '4倍抗', value: 0.25 },
    { title: '免疫', value: 0 },
]
const useType = ref('')
const handleTypeClick = (type) => {
    useType.value = type
}
const validAttacks = computed(() => {
    const valid = attacks.map((attack) => {
        const types = getAttackTypes(attack.value)
        return {
            ...attack,
            types,
        }
    })
    return valid.filter((attack) => attack.types.length)
})
const isShiny = ref(false)
const statTotal = computed(() => {
    return pokemon.value[shinyKey.value].total
})
const handleClickMove = (moveId) => {
    const params = {
        moveId,
    }
    $vfm.show('ShowMoveModal', params)
}
const handleClickAbility = (abilityId) => {
    const params = {
        abilityId,
    }
    $vfm.show('ShowAbilityModal', params)
}
const mainBody = ref(null)
onMounted(() => {
    if (process.client) {
        // mainBody.value.scrollTo({ top: 0, behavior: 'smooth' })
        window.scrollTo(0, 0)
    }
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ; (adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
const capture = () => {
    const divElement = document.getElementById('capture')
    const canvas = document.createElement('canvas')
    canvas.width = divElement.offsetWidth
    canvas.height = divElement.offsetHeight
    const ctx = canvas.getContext('2d')
    // 使用 html2canvas 將 div 元素轉換為 canvas 圖像
    html2canvas(divElement).then((canvas) => {
        // 將轉換後的 canvas 圖像繪製到畫布上
        ctx.drawImage(canvas, 0, 0)

        // 將轉換後的圖像存儲到剪貼簿中
        canvas.toBlob((blob) => {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        }, 'image/png')
    })
}
</script>

<template>
<div id="capture" ref="mainBody" class="bg-white">
    <ins class="adsbygoogle focusAd" style="display: block" data-ad-client="ca-pub-2683150416576260"
        data-ad-slot="1399675524" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <div v-if="pokedexStore.pokes.length == 0" class="slowpoke-loading" />
    <div class="flex items-center justify-center">
        <div class="text-center text-2xl font-bold drop-shadow-lg">
            {{ pokemon.name }}
        </div>
        <span class="quality mx-2 px-2" :class="pokemon.quality">
            {{ qualityEnToTw[pokemon.quality] }}
        </span>
    </div>
    <!-- <div style="width: 200px; height: 200px; background-color: yellow">
            <p>這是要截圖的區域</p>
        </div>
        <button @click="capture">截圖</button> -->
    <div class="mt-2 flex justify-center gap-2">
        <TypeIcon v-for="type in pokemon.attribute" :key="type" :type="typeTwToEn[type]"
            @click="() => handleTypeClick(typeTwToEn[type])" />
    </div>
    <div class="flex justify-center">
        <div class="flex max-w-lg justify-center">
            <img class="w-4/5" :src="pokeImg" alt="" />
        </div>
    </div>
    <fieldset class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
            屬性特色
        </legend>
        <div v-for="a in validAttacks" :key="a.title" class="ml-2 mt-2 flex">
            <div class="mr-2 w-12 shrink-0">{{ a.title }}:</div>
            <div class="flex flex-wrap items-center gap-2">
                <TypeIcon v-for="type in a.types" :key="type" :type="type.name" class="w-20 shrink-0" />
            </div>
        </div>
    </fieldset>
    <fieldset class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
            {{ $t('pokedex.pokemonStats', { name: pokemon.name }) }}
        </legend>
        <label
            class="border-type inline-flex cursor-pointer select-none items-center justify-center rounded-md border bg-white p-1">
            <span
                class="type-text-color flex items-center space-x-[6px] rounded px-[18px] py-1 text-sm font-medium text-gray-400"
                :class="{ active: !isShiny }" @click="() => (isShiny = false)">
                {{ $t('pokedex.normal') }}
            </span>
            <span
                class="type-text-color flex items-center space-x-[6px] rounded px-[18px] py-1 text-sm font-medium text-gray-400"
                :class="{ active: isShiny }" @click="() => (isShiny = true)">
                {{ $t('pokedex.shiny') }}
            </span>
        </label>
        <div class="m-auto max-w-[500px]">
            <ClientOnly>
                <SpeciesStrengthChart :chart-data="chartData" />
            </ClientOnly>
        </div>
        <div class="mt-2 text-center text-lg">{{ $t('pokemon.total') }}:{{ statTotal }}</div>
    </fieldset>
    <fieldset class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
            {{ $t('pokedex.pokemonMoves', { name: pokemon.name }) }}
        </legend>
        <div class="flex flex-wrap items-center justify-center gap-2">
            <MoveIcon v-for="move in pokemon.moves" :key="move" :move-id="move" class="grow"
                @click="() => handleClickMove(move)" />
        </div>
    </fieldset>
    <fieldset class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
            {{ $t('pokedex.pokemonTMs', { name: pokemon.name }) }}
        </legend>
        <div class="flex flex-wrap items-center justify-center gap-2">
            <MoveIcon v-for="move in pokemon.learnMoves" :key="move" :move-id="move" class="grow"
                @click="() => handleClickMove(move)" />
        </div>
    </fieldset>
    <fieldset class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
            精靈特性
        </legend>
        <div class="flex flex-wrap items-center justify-center gap-2">
            <AbilityCard v-for="ability in pokemon.features" :key="ability" :ability-id="ability" class="grow"
                @click="() => handleClickAbility(ability)" />
        </div>
    </fieldset>

    <fieldset v-if="pokemon.fetter" class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
            {{ pokemon.name }}的羈絆效果
        </legend>
        <div class="ml-2">
            {{ pokemon.fetter.effect }}
        </div>
    </fieldset>
    <fieldset class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
            {{ pokemon.name }}的入手方式
        </legend>
        <div v-if="grassCatch.length" class="ml-2 p-2">
            <div class="method-title">草叢捕捉</div>
            <div class="mt-2 flex flex-wrap gap-2 pl-4">
                <div v-for="(map, key) in grassCatch" :key="key" class="rounded-md bg-green-100 px-2 py-1">
                    {{ map.name }}
                </div>
            </div>
        </div>
        <div v-if="callFlutes.length" class="ml-2 p-2">
            <div class="method-title">召喚笛</div>
            <div class="mt-1 flex flex-wrap gap-2 pl-4">
                <div v-for="(map, key) in callFlutes" :key="key" class="rounded-md bg-yellow-100 px-2 py-1">
                    {{ map.name }}
                </div>
            </div>
        </div>
        <div v-if="lottoMachines.length" class="ml-2 p-2">
            <div class="method-title">扭蛋機</div>
            <div class="mt-1 flex flex-wrap gap-2 pl-4">
                <div v-for="(map, key) in lottoMachines" :key="key" class="rounded-md bg-violet-200 px-2 py-1">
                    {{ map.name }}
                </div>
            </div>
        </div>
        <div v-if="benefitExchanges" class="ml-2 p-2">
            <div class="method-title">劍蘭兌換</div>
            <details v-for="(incomes, key) in benefitExchanges" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間用<span class="text-red-800">{{ key }}</span>劍蘭兌換<span class="text-rose-800"><span
                            v-if="incomes[0].item > 10000">閃光</span>{{ pokemon.name }}</span>
                </summary>
                <div v-for="income in incomes" :key="income.start" class="pl-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="limitedTimeOffer" class="ml-2 p-2">
            <div class="method-title">限時特惠</div>
            <details v-for="(incomes, key) in limitedTimeOffer" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間使用<span class="text-red-800">{{ key }}</span>兌換<span class="text-rose-800"><span
                            v-if="incomes[0].pokeId > 10000">閃光</span>{{ pokemon.name }}</span>
                </summary>
                <div v-for="income in incomes" :key="income.during" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="magicalFlip" class="ml-2 p-2">
            <div class="method-title">神奇翻翻樂</div>
            <details v-for="(incomes, key) in magicalFlip" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間完成第<span class="text-red-800">{{ key }}</span>輪翻牌可獲得<span class="text-rose-800"><span
                            v-if="incomes[0].pokeId > 10000">閃光</span>{{ pokemon.name }}</span>
                </summary>
                <div v-for="income in incomes" :key="income.during" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="gashaponRankings" class="ml-2 p-2">
            <div class="method-title">扭蛋排名</div>
            <details v-for="(incomes, key) in gashaponRankings" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間狂扭蛋取得第<span class="text-red-800">{{ key }}</span>名獲得<span class="text-rose-800"><span
                            v-if="incomes[0].item > 10000">閃光</span>{{ pokemon.name }}</span>
                </summary>
                <div v-for="income in incomes" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="rechargeCompetitions" class="ml-2 p-2">
            <div class="method-title">充值比拚</div>
            <details v-for="(incomes, key) in rechargeCompetitions" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間用充值大筆水晶取得第<span class="text-red-800">{{ key }}</span>名獲得<span class="text-rose-800"><span
                            v-if="incomes[0].item > 10000">閃光</span>{{ pokemon.name }}</span>
                </summary>
                <div v-for="income in incomes" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="shinyIncomes" class="ml-2 p-2">
            <div class="method-title">閃光來襲</div>
            <details v-for="(incomes, key) in shinyIncomes" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間消費滿<span class="text-red-800">{{ key }}</span>鎂獲得<span class="text-rose-800"><span
                            v-if="incomes[0].item > 10000">閃光</span>{{ pokemon.name }}</span>
                </summary>
                <div v-for="income in incomes" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="holidayCarnivals" class="ml-2 p-2">
            <div class="method-title">假日狂歡</div>
            <details v-for="(incomes, key) in holidayCarnivals" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間消費滿<span class="text-red-800">{{ key }}</span>鎂獲得
                </summary>
                <div v-for="income in incomes" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="summerSales" class="ml-2 p-2">
            <div class="method-title">夏日特賣</div>
            <details v-for="(incomes, key) in summerSales" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間指定消費<span class="text-red-800">{{ key }}</span>鎂獲得
                </summary>
                <div v-for="income in incomes" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="limitedTimeSales" class="ml-2 p-2">
            <div class="method-title">限時特賣</div>
            <details v-for="(incomes, key) in limitedTimeSales" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間以<span class="text-red-800">{{ key }}</span>鎂購買<span class="text-rose-800">閃光{{ pokemon.name
                    }}</span>
                </summary>
                <div v-for="income in incomes" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="limitedPurchasePackages" class="ml-2 p-2">
            <div class="method-title">限購禮包</div>
            <details v-for="(incomes, key) in limitedPurchasePackages" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間以<span class="text-red-800">{{ key }}</span>鎂購買<span class="text-rose-800">閃光{{ pokemon.name
                    }}</span>
                </summary>
                <div v-for="income in incomes" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="pikachuLands.length" class="ml-2 p-2">
            <div class="method-title">皮卡丘樂園</div>
            <details class="mt-1 pl-4">
                <summary>皮卡丘樂園<span class="text-red-800">特等獎</span></summary>
                <div v-for="income in pikachuLands" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="luckyPools.length" class="ml-2 p-2">
            <div class="method-title">口袋幸運池</div>
            <details class="mt-1 pl-4">
                <summary>
                    口袋幸運池抽中<span class="text-red-800">稀有獎品</span>可獲得<span class="text-rose-800"><span
                            v-if="luckyPools[0].pokeId > 10000">閃光</span>{{ pokemon.name }}</span>
                </summary>
                <div v-for="income in luckyPools" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="continuousLogins.length" class="ml-2 p-2">
            <div class="method-title">連續登入</div>
            <details class="mt-1 pl-4">
                <summary>活動期間連續登入<span class="text-red-800">7</span>天獲得</summary>
                <div v-for="income in continuousLogins" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="hiringPool.length || hiringRank" class="ml-2 p-2">
            <div class="method-title">招募排行</div>
            <details v-if="hiringPool.length" class="mt-1 pl-4">
                <summary>
                    活動期間進行招募活動扭蛋有機會獲得<span class="text-rose-800">{{
                        pokemon.name
                        }}</span>
                </summary>
                <div v-for="active in hiringPool" :key="active.during" class="ml-4">
                    {{ active.during }}
                </div>
            </details>
            <details v-for="(incomes, key) in hiringRank" :key="key" class="mt-1 pl-4">
                <summary>
                    活動期間花費大筆扭蛋幣取得第<span class="text-red-800">{{ key }}</span>名獲得<span class="text-red-800"><span
                            v-if="incomes[0].pokeId > 10000">閃光</span>{{ pokemon.name }}</span>
                </summary>
                <div v-for="income in incomes" :key="income.during" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="astrology.length" class="ml-2 p-2">
            <div class="method-title">精靈占星</div>
            <details class="mt-1 pl-4">
                <summary>
                    活動期間進行精靈占星完成<span class="text-red-800">50</span>關有機會獲得<span class="text-rose-800">閃光{{ pokemon.name
                    }}</span>
                </summary>
                <div v-for="active in astrology" :key="active.during" class="ml-4">
                    {{ active.during }}
                </div>
            </details>
        </div>
        <div v-if="monthlyGift.length" class="ml-2 p-2">
            <div class="method-title">月禮包</div>
            <details class="mt-1 pl-4">
                <summary>
                    活動期間消費滿額可自選獲得<span class="text-rose-800">閃光{{ pokemon.name }}</span>
                </summary>
                <div v-for="active in monthlyGift" :key="active.during" class="ml-4">
                    {{ active.during }}
                </div>
            </details>
        </div>
        <div v-if="rechargeEverydays.length" class="ml-2 p-2">
            <div class="method-title">天天儲值</div>
            <details class="mt-1 pl-4">
                <summary>
                    活動期間累計<span class="text-red-800">5</span>天儲值獲得<span class="text-rose-800"><span
                            v-if="rechargeEverydays[0].item > 10000">閃光</span>{{ pokemon.name }}</span>
                </summary>
                <div v-for="income in rechargeEverydays" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
        <div v-if="continuousRecharges.length" class="ml-2 p-2">
            <div class="method-title">日連續儲值</div>
            <details class="mt-1 pl-4">
                <summary>活動期間連續儲值<span class="text-red-800">7</span>天獲得</summary>
                <div v-for="income in continuousRecharges" :key="income.start" class="ml-4">
                    {{ income.during }}
                </div>
            </details>
        </div>
    </fieldset>
    <fieldset v-if="gradeCardUse.gradeCards.length" class="border-t border-blue-200 p-2">
        <legend class="rounded-lg border border-blue-200 px-4 py-2 text-center md:text-left">
            {{ pokemon.name }}的升品資訊
        </legend>
        <div class="flex flex-wrap items-center justify-center gap-2">
            <div class="relative mt-2 max-w-[calc(100vw-48px)] overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-center text-sm text-gray-500">
                    <thead class="bg-gray-50 uppercase text-gray-700">
                        <tr>
                            <th scope="col" class="whitespace-nowrap px-2 py-3">升品階級</th>
                            <th scope="col" class="whitespace-nowrap px-2 py-3">
                                升品所需材料
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="levelCards in gradeCardUse.gradeCards" :key="levelCards.level"
                            class="border-b bg-white hover:bg-gray-50">
                            <td scope="row" class="whitespace-nowrap px-1 py-1 font-medium text-gray-900">
                                <div class="flex justify-between" v-html="gradeCardlevel[levelCards.level].label"></div>
                            </td>
                            <td class="flex whitespace-nowrap">
                                <div class="m-1 w-[108px] shrink-0 rounded-md bg-yellow-100 px-2 py-1">
                                    金幣＊{{ gradeCardlevel[levelCards.level].useCash }}
                                </div>
                                <div v-if="gradeCardlevel[levelCards.level].useStone"
                                    class="m-1 w-[88px] shrink-0 rounded-md bg-teal-100 px-2 py-1">
                                    進階石＊{{ gradeCardlevel[levelCards.level].useStone }}
                                </div>
                                <div v-for="card in levelCards.cards" :key="card.id"
                                    class="m-1 w-[120px] grow cursor-pointer rounded-md px-2 py-1" :class="{
                                        'bg-gray-100': card.quality === 'normal',
                                        'bg-blue-100': card.quality === 'rare',
                                        'bg-purple-100': card.quality === 'epic',
                                        'bg-orange-100': card.quality === 'legend',
                                        'bg-red-100': card.quality === 'supreme',
                                    }" @click="handleClickGradeCard(card)">
                                    {{ card.name }}
                                </div>
                            </td>
                        </tr>
                        <tr v-if="gradeCardUse.gradeCards.length === 14">
                            <td class="px-1 py-1 font-medium text-gray-900">總計</td>
                            <td>
                                <div class="flex flex-wrap">
                                    <div class="m-1 rounded-md bg-yellow-100 px-2 py-1">
                                        金幣＊{{ gradeTotal.cash }}
                                    </div>
                                    <div class="m-1 rounded-md bg-teal-100 px-2 py-1">
                                        進階石＊{{ gradeTotal.stone }}
                                    </div>
                                    <div v-for="card in gradeTotal.cards" :key="card.id"
                                        class="m-1 cursor-pointer rounded-md px-2 py-1" :class="{
                                            'bg-gray-100': card.quality === 'normal',
                                            'bg-blue-100': card.quality === 'rare',
                                            'bg-purple-100': card.quality === 'epic',
                                            'bg-orange-100': card.quality === 'legend',
                                            'bg-red-100': card.quality === 'supreme',
                                        }" @click="handleClickGradeCard(card)">
                                        {{ card.name }}＊{{ card.count }}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </fieldset>
</div>
</template>
<style scoped>
* {
    --myBorderColor: v-bind(typeColor.color);
    --typeBgColor: v-bind(typeColor.alphaColor);
}

fieldset {
    border-color: var(--myBorderColor);
    margin-top: 1rem;
}

legend {
    border-color: var(--myBorderColor);
    background-color: var(--typeBgColor);
}

.method-title {
    border-left: 8px solid var(--typeBgColor);
    border-right: 8px solid var(--typeBgColor);
    padding-left: 8px;
    padding-right: 8px;
    font-weight: 700;
    margin: 8px 0px 4px 0px;
    display: inline-block;
}

.type-text-color.active {
    color: black;
    background-color: var(--typeBgColor);
}

.border-type {
    border-color: var(--typeBgColor);
}

.quality.beyond {
    border: 2px solid transparent;
    border-radius: 8px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, white, white),
        linear-gradient(135deg, #3632ff 0%, #3eff30 33%, #ffff00 66%, #ff5900 100%);
}

.quality.legend {
    border: 2px solid #ffff00;
    border-radius: 8px;
    background: white;
}

.quality.epic {
    border: 2px solid rgb(192, 0, 192);
    border-radius: 8px;
    background: white;
}

.quality.rare {
    border: 2px solid rgb(46, 57, 255);
    border-radius: 8px;
    background: white;
}

.quality.normal {
    border: 2px solid rgb(190, 190, 190);
    border-radius: 8px;
    background: white;
}
</style>
