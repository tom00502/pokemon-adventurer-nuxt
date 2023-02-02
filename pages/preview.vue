<script setup>
definePageMeta({
    layout: 'h5',
})
const { categories } = useMyRouterNew()
const textColorClass = (category) => {
    if (category === 'hot') return ' text-[#186540]'
    if (category === 'information') return 'text-[#BB841C]'
    if (category === 'capture') return 'text-[#548230]'
    if (category === 'raider') return 'text-[#1A4D7B]'
    if (category === 'simulation') return 'text-[#923838]'
    return 'text-black'
}
</script>
<template>
    <main>
        <div v-for="category in categories" :key="category.category">
            <div class="mt-7 text-xl" :class="textColorClass(category.category)">
                {{ category.name }}
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
                <link-box
                    v-for="route in category.routes"
                    :key="route.name"
                    :link="route"
                    class="flex-grow basis-1"
                ></link-box>
            </div>
        </div>
    </main>
</template>
<style scoped></style>
