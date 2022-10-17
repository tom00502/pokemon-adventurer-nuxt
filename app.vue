<template>
    <div class="m-4 bg-white">
        <Icon name="logos:nuxt" size="360" />
        <p class="pb-4 text-2xl text-slate-600">這裡是最外層 app.vue</p>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <IronManWelcome />
    </div>
</template>

<script lang="ts" setup>
// const year: number = 1
// const title: string = `${year} iThome 鐵人賽`
</script>
