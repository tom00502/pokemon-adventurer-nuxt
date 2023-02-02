<script setup>
const { categories } = useMyRouterNew()
const activeSubMenu = ref('')
const categoryLinks = (category) => {
    return categories.find((c) => c.category === category) || {}
}
const triggerSubMenu = (type) => {
    if (activeSubMenu.value === type) {
        activeSubMenu.value = ''
    } else {
        activeSubMenu.value = type
    }
}
</script>
<template>
    <div class="flex items-center justify-around">
        <div class="relative cursor-pointer" @click="triggerSubMenu('information')">
            精靈資訊
            <div
                v-if="activeSubMenu === 'information'"
                class="sub-menu -top-[316px] rounded-2xl p-2"
            >
                <RouterLink
                    v-for="route in categoryLinks('information').routes"
                    :key="route.name"
                    :to="route.path"
                    class="my-3 flex justify-center"
                >
                    {{ route.title }}
                </RouterLink>
            </div>
        </div>
        <div class="relative cursor-pointer" @click="triggerSubMenu('capture')">
            精靈捕捉
            <div v-if="activeSubMenu === 'capture'" class="sub-menu -top-[172px] rounded-2xl p-2">
                <div
                    v-for="route in categoryLinks('capture').routes"
                    :key="route.name"
                    class="my-3 flex justify-center"
                >
                    {{ route.title }}
                </div>
            </div>
        </div>
        <NuxtLink to="/">首頁</NuxtLink>
        <div class="relative cursor-pointer" @click="triggerSubMenu('raider')">
            寶可攻略
            <div v-if="activeSubMenu === 'raider'" class="sub-menu -top-[208px] rounded-2xl p-2">
                <div
                    v-for="route in categoryLinks('raider').routes"
                    :key="route.name"
                    class="my-3 flex justify-center"
                >
                    {{ route.title }}
                </div>
            </div>
        </div>
        <div class="relative cursor-pointer" @click="triggerSubMenu('simulation')">
            功能模擬
            <div
                v-if="activeSubMenu === 'simulation'"
                class="sub-menu -top-[172px] rounded-2xl p-2"
            >
                <div
                    v-for="route in categoryLinks('simulation').routes"
                    :key="route.name"
                    class="my-3 flex justify-center"
                >
                    {{ route.title }}
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.sub-menu {
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
    width: 100px;
    background: #f4f4f4;
    left: -30%;
    position: absolute;
}
</style>
