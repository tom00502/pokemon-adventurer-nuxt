import { defineStore } from 'pinia'
export const useCommonStore = defineStore({
    id: 'useCommonStore',
    state: () => ({
        callAfterReadyFunctions: [],
        ready: false,
    }),
    getters: {},
    actions: {
        actionRegisterCallAfterReadyFunction(fn) {
            if (this.ready) fn()
            this.callAfterReadyFunctions.push(fn)
        },
        actionCallAfterReadyFunctions() {
            this.callAfterReadyFunctions.forEach((fn) => fn())
            this.ready = true
        },
    },
})
