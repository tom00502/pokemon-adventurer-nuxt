<script setup>
const { routers } = useMyRouter()
</script>
<template>
    <div class="m-4">
        <div class="mx-auto max-w-[1280px] py-2">
            <Bulletin />
            <header>
                <nav>
                    <div v-for="route in routers" :key="route.name">
                        <NuxtLinkLocale :to="route.path">{{ route.title }}</NuxtLinkLocale>
                    </div>
                </nav>
            </header>
            <slot />
        </div>
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
