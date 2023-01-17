<script setup lang="ts">
import ButtonOutlined from '../components/ButtonOutlined.vue'
import { WalletIcon } from '@heroicons/vue/24/solid'
import { useWalletStore } from '../stores/wallet'
import { computed } from 'vue'

const walletStore = useWalletStore()

const isConnected = computed(() => {
    return walletStore.address
})

const connectWallet = async () => {
    try {
        // @ts-expect-error Window.ethereum not typed
        const data = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })
        console.log('data :>> ', data)

        walletStore.saveWalletData({ address: data[0] })
        console.log('DApp connected to your wallet 💰')
    } catch (error) {
        console.error('Error connecting DApp to your wallet')
        console.error(error)
    }
}
</script>

<template>
    <nav class="container mx-auto flex items-center">
        <div class="p-2 flex-shrink-0">
            <img src="../assets/logo.svg" alt="" />
        </div>

        <div class="ml-auto flex items-center text-slate-400">
            <a href="#" class="py-5 px-3 hover:text-slate-100">Listings</a>
            <a href="#" class="py-5 px-3 hover:text-slate-100">Stats</a>
            <a href="#" class="py-5 px-3 hover:text-slate-100">Support</a>

            <ButtonOutlined
                v-if="!isConnected"
                class="ml-4"
                :icon="WalletIcon"
                @click="connectWallet"
            >
                Connect to wallet
            </ButtonOutlined>

          <ButtonOutlined
                v-if="isConnected"
                class="ml-4"
                :icon="WalletIcon"
                @click="connectWallet"
            >
                {{ walletStore.truncatedAddress }}
            </ButtonOutlined>
        </div>
    </nav>
</template>
