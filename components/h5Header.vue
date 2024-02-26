<script setup>
import { useI18n } from 'vue-i18n'
const route = useRoute()
const { categories } = useMyRouterNew()
const routers = categories.value.map((category) => category.routes).flat()
const { locale } = useI18n()
const routerName = computed(() => {
    const defaultName = locale.value === 'en' ? 'Adventure Assistant' : '寵物冒險助手'
    const name = route.name.split('_')[0]
    return routers.find((r) => r.name === name)?.title || defaultName
})
</script>
<template>
    <div class="mx-2 flex flex-col justify-center">
        <div class="flex flex-col items-center text-xl">{{ routerName }}</div>
        <Bulletin />
    </div>
</template>
<style scoped></style>
