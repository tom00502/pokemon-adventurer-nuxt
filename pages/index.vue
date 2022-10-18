<script setup>
const { routers } = useRouter()
</script>
<template>
    <main>
        <div class="link-container">
            <RouterLink
                v-for="route in routers.filter((r) => r.title != 'home')"
                :key="route.name"
                :to="route.path"
                class="link-box"
                >{{ route.title }}</RouterLink
            >
        </div>
    </main>
</template>
<style scoped>
.link-container {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}
.link-box {
    display: flex;
    width: 150px;
    height: 150px;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    font-size: 1.5rem;
    color: black;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}
</style>
