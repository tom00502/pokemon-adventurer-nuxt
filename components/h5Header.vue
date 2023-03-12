<script setup>
const route = useRoute()
const { categories } = useMyRouterNew()
const routers = categories.map((category) => category.routes).flat()
const routerName = computed(() => {
    return routers.find((r) => r.name === route.name)?.title || '寵物冒險助手'
})
</script>
<template>
    <div class="mx-2">
        <div class="flex flex-col items-center text-xl">{{ routerName }}</div>
        <Bulletin />
    </div>
</template>
<style scoped></style>
