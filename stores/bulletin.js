import { defineStore } from 'pinia'
const { getBulletin } = useApi()
export const useBulletinStore = defineStore('useBulletinStore', {
    state: () => ({
        summary: '',
        detail: '',
    }),
    actions: {
        async getBulletin() {
            const { data } = await getBulletin()
            this.summary = data.value.summary
            this.detail = data.value.detail
        },
    },
    getters: {},
})
