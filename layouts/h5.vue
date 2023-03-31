<script setup>
const route = useRoute()
const mainScreen = ref(null)
watch(
    route,
    () => {
        if (process.client && mainScreen.value) {
            mainScreen.value.scrollTo({ top: 0, behavior: 'smooth' })
        }
    },
    { deep: true, immediate: true }
)
</script>
<template>
    <div class="mx-auto grid max-w-[1280px] grid-flow-col grid-rows-[70px_1fr_100px]">
        <h5Header />
        <div ref="mainScreen" class="mx-4 h-[calc(100vh-170px)] overflow-y-auto">
            <slot />
        </div>
        <h5Menu class="bg-[#EEEEEE]" />
    </div>
</template>

<style scoped>
nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin: 1rem 0;
    display: flex;
    overflow: auto;
    flex-wrap: nowrap;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
}

nav a.router-link-exact-active {
    color: white;
    background-color: hsla(160, 100%, 37%, 1);
    border-radius: 1rem;
}
nav a {
    display: inline-block;
    padding: 0.25rem 1rem;
    margin: 0 0.5rem;
}
nav div {
    margin: 0.5rem 0;
    border-left: 1px solid var(--color-border);
    flex-shrink: 0;
}

nav div:first-of-type {
    border: 0;
}
@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        width: 100%;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        /*margin-left: -1rem;*/
        font-size: 1rem;

        /*padding: 1rem 0;*/
        margin-top: 1rem;
    }
}
</style>
