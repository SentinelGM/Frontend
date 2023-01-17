<script setup>
import MainNavigation from './layout/MainNavigation.vue'
import { getBalanceOfGMX, getGMXMarketListings } from './dataProvider.js'
import truncate from 'lodash/truncate'
import { ref } from 'vue'

const accounts = ref([])

getGMXMarketListings('arbitrum').then(res => {
    res.forEach(async address => {
        const GMXBalance = await getBalanceOfGMX('arbitrum', address)

        console.log(GMXBalance)

        accounts.value.push({
            gmx: GMXBalance.toString(),
            address: address,
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
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-white border-opacity-20">
                        <th class="p-2 font-bold">Account</th>
                        <th class="p-2 font-bold">GMX</th>
                        <th class="p-2 font-bold"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="account in accounts"
                        class="border-b border-white border-opacity-20"
                    >
                        <td class="p-2" :title="account.address">
                            {{ truncateText(account.address) }}
                        </td>
                        <td class="p-2">{{ account.gmx }}</td>
                        <td>
                            <button
                                class="rounded-md bg-blue-700 p-1 px-3 text-center text-xs text-white hover:bg-blue-800"
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
