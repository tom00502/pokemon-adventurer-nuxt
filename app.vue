<script setup>
import { useScreen } from 'vue-screen'
import { usePokedexStore } from '@/stores/pokedex'
import { useDistributionStore } from '@/stores/distribution'
import { useBulletinStore } from '@/stores/bulletin'
// import { usePokeCardStore } from '@/stores/pokeCard'
import { useCommonStore } from '@/stores/common'
const screen = useScreen()
const readScreen = ref(false)
const layoutName = computed(() => {
    // 一秒後再刷新模板繞過bug
    if (!readScreen.value) return 'h5'
    return screen.width < 768 ? 'h5' : 'default'
})
onMounted(() => {
    const pokedexStore = usePokedexStore()
    const distributionStore = useDistributionStore()
    const bulletinStore = useBulletinStore()
    const commonStore = useCommonStore()
    // const pokeCardStore = usePokeCardStore()

    const doneVote = useCookie('doneVote')
    doneVote.value = null
    setTimeout(() => {
        readScreen.value = true
        pokedexStore.actionGetPokedex().then(() => {
            distributionStore.getDistributions()
            bulletinStore.getBulletin()
            commonStore.actionCallAfterReadyFunctions()
            // pokecardStore.actionGetPokeCards()
        })
    }, 1000)
})
</script>
<template>
    <div class="bg-white">
        <Alert />
        <!-- Google Tag Manager (noscript) -->
        <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WF8JSC5"
            height="0"
            width="0"
            style="display: none; visibility: hidden"
        ></iframe>
        <div class="key">
            寵物冒險家,寵物冒險助理,寵物冒險助手,寵物冒險秘書,寵物冒險家攻略,攻略,轉生模擬器,升星計算機,解答,笛子,召喚笛,狩獵場,公會戰,宠物冒险家,宠物冒险助理,宠物冒险助手,宠物冒险秘书,宠物冒险家攻略,攻略,转生模拟器,升星计算机,解答,笛子,召唤笛,狩猎场,公会战,冲锋吧精灵
        </div>
        <!-- End Google Tag Manager (noscript) -->
        <NuxtLayout :name="layoutName">
            <NuxtPage />
        </NuxtLayout>
        <ModalAlert />
        <ModalConfirm />
        <ModalMovePokes />
        <ModalFeaturePokes />
        <ModalGradeCard />
    </div>
</template>

<style>
.key {
    display: none;
}
</style>
