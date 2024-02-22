<script setup>
const localePath = useLocalePath()
const props = defineProps({
    link: {
        type: Object,
        required: true,
    },
})
const colorClass = computed(() => {
    if (props.link.category === 'hot')
        return 'text-[#186540] bg-[#78D7A9] shadow-[2px_2px_8px_rgba(120,215,169,0.3)]'
    if (props.link.category === 'information')
        return 'text-[#BB841C] bg-[#FFDE8A] shadow-[2px_2px_8px_rgba(187,132,28,0.3)]'
    if (props.link.category === 'capture')
        return 'text-[#548230] bg-[#D2EE97] shadow-[2px_2px_8px_rgba(84,130,48,0.3)]'
    if (props.link.category === 'raider')
        return 'text-[#1A4D7B] bg-[#78B1E5] shadow-[2px_2px_8px_rgba(26,77,123,0.3)]'
    if (props.link.category === 'simulation')
        return 'text-[#923838] bg-[#FFB7B7] shadow-[2px_2px_8px_rgba(146,56,56,0.3)]'
    return 'text-black bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.3)]'
})
const barClass = computed(() => {
    if (props.link.category === 'hot') return ' bg-[#186540]'
    if (props.link.category === 'information') return ' bg-[#BB841C]'
    if (props.link.category === 'capture') return ' bg-[#548230]'
    if (props.link.category === 'raider') return ' bg-[#1A4D7B]'
    if (props.link.category === 'simulation') return ' bg-[#923838]'

    return 'bg-black'
})
</script>
<template>
    <RouterLink
        class="m-1 h-[170px] rounded-2xl p-4"
        :class="colorClass"
        :to="localePath(props.link.path)"
    >
        <div class="w-16 text-2xl">{{ props.link.title }}</div>
        <div class="my-auto mt-4 flex gap-2">
            <div class="w-1 flex-shrink-0" :class="barClass"></div>
            <div class="line-clamp-3 min-w-[126px] py-1 text-xs">
                {{ props.link.descript }}
            </div>
        </div>
    </RouterLink>
</template>
