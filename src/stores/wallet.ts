import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

interface WalletData {
    address: string
}

export const useWalletStore = defineStore('wallet', {
    state: () => {
        return {
            address: useStorage('wallet-address', ''),
        }
    },

    getters: {
        truncatedAddress(store) {
            return store.address.slice(0, 6) + '...' + store.address.slice(-4)
        },
    },

    actions: {
        //@ts-ignore
        saveWalletData(payload: WalletData) {
            this.address = payload.address
        },
    },
})
