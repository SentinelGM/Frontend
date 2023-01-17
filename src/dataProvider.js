import * as ethers from 'ethers'
import { ARBITRUM, AVALANCHE, getAddress } from './addresses'
const { JsonRpcProvider } = ethers.providers

import GMXMarket from './../abis/GMXMarket.json'
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

function getGMXContract(chainName) {
    const provider = getProvider(chainName)
    const chainId = getChainId(chainName)

    const contract = new ethers.Contract(
        getAddress(chainId, 'GMX'),
        GMX.abi,
        provider
    )

    console.log(contract)

    return contract
}
export const getBalanceOfGMX = async (chainName, address) => {
    const contract = getGMXContract(chainName)

    return contract.balanceOf(address)
}
