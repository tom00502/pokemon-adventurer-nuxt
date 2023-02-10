import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
    state: () => ({
        show: false,
        alertMessage: '',
    }),
    actions: {
        triggerAlert(m) {
            this.show = true
            this.alertMessage = m
            setTimeout(() => {
                this.show = false
            }, 2000)
        },
    },
})
