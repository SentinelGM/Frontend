import * as ethers from 'ethers'
import { ARBITRUM, AVALANCHE, getAddress } from './addresses'
const { JsonRpcProvider } = ethers.providers

import GMXMarket from './../abis/GMXMarket.json'
import GMXMarketTest from './../abis/GMXMarketTest.json'
import GMX from './../abis/GMX.json'

const providers = {
    // arbitrum: new JsonRpcProvider('https://arb1.arbitrum.io/rpc'),
    arbitrum: new JsonRpcProvider(
        'https://arb-mainnet.g.alchemy.com/v2/Go6-owiVhbhNSDmbdDKgCilCLSNphan4'
    ),
    avalanche: new JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc'),
}

function getProvider(chainName) {
    if (!(chainName in providers)) {
        throw new Error(`Unknown chain ${chainName}`)
    }
    return providers[chainName]
}

function getChainId(chainName) {
    const chainId = {
        arbitrum: ARBITRUM,
        avalanche: AVALANCHE,
    }[chainName]
    if (!chainId) {
        throw new Error(`Unknown chain ${chainName}`)
    }
    return chainId
}

export const getGMXMarketListings = async chainName => {
    const provider = getProvider(chainName)
    const chainId = getChainId(chainName)
    const GMXMarketContract = new ethers.Contract(
        getAddress(chainId, 'GMXMarket'),
        GMXMarket.abi,
        provider
    )

    console.log(GMXMarketContract)

    return GMXMarketContract.GetListings(10, 0)
}

export const getGMXMarketListingData = async (chainName, address) => {
    const provider = getProvider(chainName)
    const chainId = getChainId(chainName)
    const GMXMarketContract = new ethers.Contract(
      '0x127Ae6502ea96ecF17F203F7357E7eF123Da487b',
      GMXMarketTest.abi,
      provider
    )

    return GMXMarketContract.GetGMXListingsData(address).then(res => {
        return {
            GMX_staked: res[0],
            esGMX: res[1],
            esGMX_staked: res[2],
            max_esGMX_vestable_GMX: res[3],
            max_esGMX_vestable_GLP: res[4],
            GLP: res[5],
            multiplier: res[6],
            pending_ETH: res[7],
            pending_esGMX: res[8],
            pending_multiplier: res[9],
        }
    })
}
