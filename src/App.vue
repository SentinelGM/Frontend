<script lang="ts" setup>
import MainNavigation from './layout/MainNavigation.vue'
import { getGMXMarketListings, getGMXMarketListingData } from "./dataProvider.js";
import truncate from 'lodash/truncate'
import { ref } from 'vue'
import * as ethers from 'ethers'


const accounts = ref([])


getGMXMarketListings('arbitrum').then(res => {
    res.forEach(async address => {
      getGMXMarketListingData('arbitrum', address).then((data) => {
        console.log(data);
        accounts.value.push({
            address: address,
            ...data
        })
      })
    })
})

function truncateText(str) {
    return truncate(str, { length: 20 })
}
</script>

<template>
    <div
        class="min-h-screen bg-gradient-to-b from-black to-slate-900 text-slate-100"
    >
        <MainNavigation />

        <div class="my-10 text-center">
            <h1 class="mb-4 text-4xl font-bold">A marketplace for GMX</h1>
            <p>Buy, sell and trade GMX accounts. Including esGMX!</p>
        </div>

        <div class="mx-auto table w-full max-w-2xl">
            <table class="w-full text-left rounded-md overflow-hidden text-sm">
                <thead>
                    <tr>
                        <th class="p-4 bg-zinc-900 font-semibold">Account</th>
                        <th class="p-4 bg-zinc-900 font-semibold">esGMX</th>
                        <th class="p-4 bg-zinc-900 font-semibold">esGMX (staked)</th>
                        <th class="p-4 bg-zinc-900 font-semibold">GLP</th>
                        <th class="p-4 bg-zinc-900 font-semibold"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="account in accounts"
                        class="border-t border-white border-opacity-10"
                    >
                        <td class="p-3 px-4 bg-zinc-800" :title="account.address">
                            {{ truncateText(account.address) }}
                        </td>
                        <td class="p-3 px-4 bg-zinc-800">{{ ethers.utils.formatEther(account.esGMX) }}</td>
                        <td class="p-3 px-4 bg-zinc-800">{{ ethers.utils.formatEther(account.esGMX_staked) }}</td>
                        <td class="p-3 px-4 bg-zinc-800">{{ ethers.utils.formatEther(account.GLP) }}</td>
                        <td class="p-3 px-4 bg-zinc-800">
                            <button
                                class="rounded-md bg-blue-700 p-1 px-3 text-center text-xs text-white hover:bg-blue-600"
                            >
                                Buy
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
