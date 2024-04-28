import { defineStore } from 'pinia'
const { getBulletin } = useApi()
export const useBulletinStore = defineStore('useBulletinStore', {
    state: () => ({
        summary: '',
        detail: '',
    }),
    actions: {
        async getBulletin() {
            const data = await getBulletin()
            this.summary = data.summary
            this.detail = data.detail
        },
    },
    getters: {},
})
