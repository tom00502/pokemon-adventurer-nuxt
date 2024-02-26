<script setup>
const localePath = useLocalePath()
const route = useRoute()
const { categories } = useMyRouterNew()
const activeSubMenu = ref('')

// 8 352
// 3 172
// 9 388
// 388 - 352 = 36
// 36 * 3 = 108
// 172 - 108 = 64

// 1: 64 + 36 = 100
// 2: 100 + 36 = 136
// 3: 136 + 36 = 172
// 4: 172 + 36 = 208
// 5: 208 + 36 = 244
// 6: 244 + 36 = 280
// 7: 280 + 36 = 316
// 8: 316 + 36 = 352
// 9: 352 + 36 = 388

const categoryLinks = (category) => {
    return categories.value.find((c) => c.category === category) || { routers: [] }
}
const triggerSubMenu = (type) => {
    if (activeSubMenu.value === type) {
        activeSubMenu.value = ''
    } else {
        activeSubMenu.value = type
    }
}
const routers = categories.value
    .map((category) => category.routes)
    .flat()
    .filter((route) => route.category !== 'hot')
const activeRouter = computed(() => {
    return routers.find((r) => r.name === route.name) || {}
})
const isCategoryActive = (category) => {
    return activeRouter.value.category === category
}
const categoryName = (category) => {
    return categories.value.find((c) => c.category === category)?.name || ''
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
            <div>{{ categoryName('information') }}</div>
            <div
                v-if="activeSubMenu === 'information'"
                class="sub-menu rounded-2xl p-2"
                :style="`top: -${categoryLinks('information').routes.length * 36 + 64}px`"
            >
                <RouterLink
                    v-for="pageRoute in categoryLinks('information').routes"
                    :key="pageRoute.name"
                    :to="localePath(pageRoute.path)"
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
            <div>{{ categoryName('capture') }}</div>
            <div
                v-if="activeSubMenu === 'capture'"
                class="sub-menu rounded-2xl p-2"
                :style="`top: -${categoryLinks('capture').routes.length * 36 + 64}px`"
            >
                <RouterLink
                    v-for="pageRoute in categoryLinks('capture').routes"
                    :key="pageRoute.name"
                    :to="localePath(pageRoute.path)"
                    class="my-3 flex justify-center"
                >
                    {{ pageRoute.title }}
                </RouterLink>
            </div>
        </div>
        <NuxtLinkLocale to="/">
            <img src="@/assets/img/Nav-icon-0.svg" alt="" class="h-12" />
        </NuxtLinkLocale>
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
            <div>{{ categoryName('raider') }}</div>
            <div
                v-if="activeSubMenu === 'raider'"
                class="sub-menu -top-[388px] rounded-2xl p-2"
                :style="`top: -${categoryLinks('raider').routes.length * 36 + 64}px`"
            >
                <RouterLink
                    v-for="pageRoute in categoryLinks('raider').routes"
                    :key="pageRoute.name"
                    :to="localePath(pageRoute.path)"
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
            <div>{{ categoryName('simulation') }}</div>
            <div
                v-if="activeSubMenu === 'simulation'"
                class="sub-menu -top-[172px] rounded-2xl p-2"
                :style="`top: -${categoryLinks('simulation').routes.length * 36 + 64}px`"
            >
                <RouterLink
                    v-for="pageRoute in categoryLinks('simulation').routes"
                    :key="pageRoute.name"
                    :to="localePath(pageRoute.path)"
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
