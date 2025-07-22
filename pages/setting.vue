<script setup>
const { locale, setLocale, setLocaleCookie } = useI18n()
useHead({
    title: '設定',
})
const handleChangeLanguage = () => {
    setLocale(locale.value)
    setLocaleCookie(locale.value)
}
</script>
<template>
<form class="mx-auto max-w-sm">
    <label for="countries" class="mb-2 block text-sm font-medium text-gray-900">{{
        $t('setting.language')
    }}</label>
    <select id="countries" v-model="locale"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        @change="handleChangeLanguage">
        <option value="zh">中文</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
    </select>
</form>
</template>
<style scoped></style>
