<script setup>
const route = useRoute()
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
const routers = categories
    .map((category) => category.routes)
    .flat()
    .filter((route) => route.category !== 'hot')
const activeRouter = computed(() => {
    return routers.find((r) => r.name === route.name) || {}
})
const isCategoryActive = (category) => {
    return activeRouter.value.category === category
}
</script>
<template>
    <div class="flex items-center justify-around">
        <div
            class="relative flex cursor-pointer flex-col items-center"
            @click="() => triggerSubMenu('information')"
        >
            <img
                v-if="activeSubMenu === 'information' || isCategoryActive('information')"
                src="@/assets/img/Nav-icon-06.svg"
                alt=""
                class="h-8"
            />
            <img v-else src="@/assets/img/Nav-icon-05.svg" alt="" class="h-8" />
            <div>精靈資訊</div>
            <div
                v-if="activeSubMenu === 'information'"
                class="sub-menu -top-[352px] rounded-2xl p-2"
            >
                <RouterLink
                    v-for="pageRoute in categoryLinks('information').routes"
                    :key="pageRoute.name"
                    :to="pageRoute.path"
                    class="my-3 flex justify-center"
                >
                    {{ pageRoute.title }}
                </RouterLink>
            </div>
        </div>
        <div
            class="relative flex cursor-pointer flex-col items-center"
            @click="() => triggerSubMenu('capture')"
        >
            <img
                v-if="activeSubMenu === 'capture' || isCategoryActive('capture')"
                src="@/assets/img/Nav-icon-07.svg"
                alt=""
                class="h-8"
            />
            <img v-else src="@/assets/img/Nav-icon-04.svg" alt="" class="h-8" />
            <div>精靈捕捉</div>
            <div v-if="activeSubMenu === 'capture'" class="sub-menu -top-[172px] rounded-2xl p-2">
                <RouterLink
                    v-for="pageRoute in categoryLinks('capture').routes"
                    :key="pageRoute.name"
                    :to="pageRoute.path"
                    class="my-3 flex justify-center"
                >
                    {{ pageRoute.title }}
                </RouterLink>
            </div>
        </div>
        <NuxtLink to="/">
            <img src="@/assets/img/Nav-icon-0.svg" alt="" class="h-12" />
        </NuxtLink>
        <div
            class="relative flex cursor-pointer flex-col items-center"
            @click="() => triggerSubMenu('raider')"
        >
            <img
                v-if="activeSubMenu === 'raider' || isCategoryActive('raider')"
                src="@/assets/img/Nav-icon-08.svg"
                alt=""
                class="h-8"
            />
            <img v-else src="@/assets/img/Nav-icon-03.svg" alt="" class="h-8" />
            <div>寶可攻略</div>
            <div v-if="activeSubMenu === 'raider'" class="sub-menu -top-[208px] rounded-2xl p-2">
                <RouterLink
                    v-for="pageRoute in categoryLinks('raider').routes"
                    :key="pageRoute.name"
                    :to="pageRoute.path"
                    class="my-3 flex justify-center"
                >
                    {{ pageRoute.title }}
                </RouterLink>
            </div>
        </div>
        <div
            class="relative flex cursor-pointer flex-col items-center"
            @click="() => triggerSubMenu('simulation')"
        >
            <img
                v-if="activeSubMenu === 'simulation' || isCategoryActive('simulation')"
                src="@/assets/img/Nav-icon-09.svg"
                alt=""
                class="h-8"
            />
            <img v-else src="@/assets/img/Nav-icon-02.svg" alt="" class="h-8" />
            <div>功能模擬</div>
            <div
                v-if="activeSubMenu === 'simulation'"
                class="sub-menu -top-[172px] rounded-2xl p-2"
            >
                <RouterLink
                    v-for="pageRoute in categoryLinks('simulation').routes"
                    :key="pageRoute.name"
                    :to="pageRoute.path"
                    class="my-3 flex justify-center"
                >
                    {{ pageRoute.title }}
                </RouterLink>
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
