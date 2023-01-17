export const ARBITRUM = 42161
export const AVALANCHE = 43114

export const addresses = {
    [ARBITRUM]: {
        GMX: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
        GMXMarket: '0x1581334536FdF4f7Aa5ED3E0583bBeE3ac604932',
    },

    [AVALANCHE]: {
        GMX: '0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a',
    },
}

export function getAddress(chainId, key) {
    if (!chainId in addresses) {
        throw new Error(`Unknown chain ${chainId}`)
    }
    if (!(key in addresses[chainId])) {
        throw new Error(`Unknown address key ${key}`)
    }
    return addresses[chainId][key]
}
