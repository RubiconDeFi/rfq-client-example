import { TokenList } from "@uniswap/token-lists";
// import { Network } from "../rfq-test";

export enum Network {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
    OPTIMISM_KOVAN = 69,
    OPTIMISM_MAINNET = 10,
    OPTIMISM_SEPOLIA = 11155420,
    POLYGON_MAINNET = 137,
    POLYGON_MUMBAI = 80001,
    BSC_MAINNET = 56,
    GNOSIS_CHAIN_MAINNET = 100,
    FANTOM_OPERA_MAINNET = 250,
    ARBITRUM_MAINNET = 42161,
    ARBITRUM_SEPOLIA = 421614,
    ARBITRUM_GOERLI = 421613,
    BASE_MAINNET = 8453,
    BASE_GOERLI = 84531,
    BASE_SEPOLIA = 84532,
    AVALANCHE_C_CHAIN_MAINNET = 43114,
    AURORA_MAINNET = 1313161554,
    OPTIMISM_GOERLI = 420,
}

export const tokenList: TokenList = {
    name: 'Rubicon Token List',
    timestamp: new Date().toISOString(),
    version: {
        major: 1,
        minor: 0,
        patch: 0,
    },
    tokens: [
        // ** V1 MAINNET **
        // ** QUOTES **
        {
            name: 'USDC Stablecoin',
            symbol: 'USDC',
            chainId: Network.OPTIMISM_MAINNET,
            address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
            decimals: 6,
            extensions: {
                quote: true,
                underlyingAssetGeckoID: 'usd-coin',
            },
        },
        {
            name: 'DAI Stablecoin',
            symbol: 'DAI',
            chainId: Network.OPTIMISM_MAINNET,
            address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
            decimals: 18,
            extensions: {
                quote: true,
                underlyingAssetGeckoID: 'dai',
            },
        },
        {
            name: 'USDT Stablecoin',
            symbol: 'USDT',
            chainId: Network.OPTIMISM_MAINNET,
            address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
            decimals: 6,
            extensions: {
                quote: true,
                underlyingAssetGeckoID: 'tether',
            },
        },
        {
            symbol: 'WETH',
            name: 'Wrapped Ethereum',
            decimals: 18,
            address: '0x4200000000000000000000000000000000000006',
            chainId: Network.OPTIMISM_MAINNET,
            extensions: {
                underlyingAssetGeckoID: 'ethereum',
            },
        },
        {
            symbol: 'OP',
            name: 'Optimism',
            decimals: 18,
            address: '0x4200000000000000000000000000000000000042',
            chainId: Network.OPTIMISM_MAINNET,
            extensions: {
                unsupportedQuotes: {
                    USDT: true,
                    DAI: true,
                },
                underlyingAssetGeckoID: 'optimism',
            },
        },
        {
            symbol: 'WBTC',
            name: 'Wrapped Bitcoin',
            decimals: 8,
            address: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
            chainId: Network.OPTIMISM_MAINNET,
            extensions: {
                unsupportedQuotes: {
                    USDT: true,
                    DAI: true,
                },
                underlyingAssetGeckoID: 'wrapped-bitcoin',
            },
        },
        {
            symbol: 'SNX',
            name: 'Synthetix',
            decimals: 18,
            address: '0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4',
            chainId: Network.OPTIMISM_MAINNET,
            extensions: {
                unsupportedQuotes: {
                    USDT: true,
                    DAI: true,
                },
                underlyingAssetGeckoID: 'havven',
            },
        },

        //  ** V1 Mainnet Bath Tokens ***

        {
            symbol: 'bathDAI',
            name: 'bathDAI v1',
            decimals: 18,
            address: '0x60daEC2Fc9d2e0de0577A5C708BcaDBA1458A833',
            chainId: Network.OPTIMISM_MAINNET,
            extensions: {
                underlyingTicker: 'DAI',
                rewardsLive: true,
                underlyingAssetGeckoID: 'dai',
                bathBuddy: '0x5fafd12ead4234270db300352104632187ed763a',
            },
        },

        {
            name: 'bathUSDC v1',
            symbol: 'bathUSDC',
            chainId: Network.OPTIMISM_MAINNET,
            address: '0xe0e112e8f33d3f437D1F895cbb1A456836125952',
            decimals: 6,
            extensions: {
                underlyingTicker: 'USDC',
                rewardsLive: true,
                underlyingAssetGeckoID: 'usd-coin',
                bathBuddy: '0xfd6fd41bea9fd489ffdf05cd8118a69bf98caa5d',
            },
        },
        {
            symbol: 'bathUSDT',
            name: 'bathUSDT v1',
            decimals: 6,
            chainId: Network.OPTIMISM_MAINNET,
            address: '0xfFBD695bf246c514110f5DAe3Fa88B8c2f42c411',
            extensions: {
                underlyingTicker: 'USDT',
                rewardsLive: true,
                underlyingAssetGeckoID: 'tether',
                bathBuddy: '0xdffdbb54b9968fee543a8d2bd3ce7a80d66cd49f',
            },
        },

        // *** NOTE THIS IS FAKE AND CANT ACTUALLY WRAP CAUSING ISSUES ON WRAP/UNWRAP as it cannot wrap/unwrap... Simply mint via faucet()
        {
            symbol: 'WETH',
            name: 'Wrapped Ethereum',
            decimals: 18,
            address: '0x54e63385c13ECbE3B859991eEdad539d9fDa1167', // '0x4200000000000000000000000000000000000006'
            chainId: Network.OPTIMISM_GOERLI,
            extensions: {
                underlyingAssetGeckoID: 'ethereum',
                isNativeAssetWrapper: true,
            },
        },
        {
            name: 'Tether',
            symbol: 'USDT',
            chainId: Network.OPTIMISM_GOERLI,
            address: '0xD70734Ba8101Ec28b38AB15e30Dc9b60E3c6f433',
            decimals: 18,
            extensions: {
                quote: true,
                underlyingAssetGeckoID: 'usd-coin',
            },
        },

        {
            address: '0x45FA7d7b6C954d17141586e1BD63d2e35d3e26De',
            chainId: Network.OPTIMISM_GOERLI,
            symbol: 'F',
            extensions: {
                underlyingAssetGeckoID: 'optimism',
            },
            decimals: 18,
            name: 'Forrest Coin',
        },

        {
            address: '0xCeE7148028Ff1B08163343794E85883174a61393',
            chainId: Network.OPTIMISM_GOERLI,
            symbol: 'OP',
            extensions: {
                underlyingAssetGeckoID: 'optimism',
                rewardsLive: false,
            },
            decimals: 18,
            name: 'Optimism',
        },
        {
            name: 'USDC Stablecoin',
            symbol: 'USDC',
            chainId: Network.OPTIMISM_GOERLI,
            address: '0xe432f229521eE954f80C83257485405E3d848d17',
            decimals: 18,
            extensions: {
                quote: true,
                underlyingAssetGeckoID: 'usd-coin',
            },
        },
        {
            address: '0x25bC01c78Ac1dD2Ce2e78E29E0a225a341Cd906A',
            chainId: Network.OPTIMISM_GOERLI,
            symbol: 'TEST',
            name: 'TEST',
            decimals: 18,
          },
        // Mumbai testing
        {
            address: "0xcC5f8571D858DAD7fA2238FB9df4Ad384493013C",
            chainId: Network.POLYGON_MUMBAI,
            symbol: "USDC",
            decimals: 18,
            name: "USDC Stablecoin",
        },
        {
            address: "0x6aeda41c98ab5399044fc36162B57d39c13b658a",
            chainId: Network.POLYGON_MUMBAI,
            symbol: "TEST",
            decimals: 18,
            name: "Test Coin",
        },
        /// *** ARBITRUM MAINNET ***
        {
            name: 'Wrapped Ethereum',
            symbol: 'WETH',
            chainId: Network.ARBITRUM_MAINNET,
            address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
            decimals: 18,
            extensions: {
                underlyingAssetGeckoID: 'ethereum',
                isNativeAssetWrapper: true,
            },
        },
        {
            name: 'USDC Stablecoin',
            symbol: 'USDC',
            chainId: Network.ARBITRUM_MAINNET,
            address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
            decimals: 6,
            extensions: {
                quote: true,
            },
        },
        {
            name: 'Bridged USDC Stablecoin',
            symbol: 'USDC.e',
            chainId: Network.ARBITRUM_MAINNET,
            address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
            decimals: 6,
            extensions: {
                quote: true,
            },
        },
        {
            name: 'DAI Stablecoin',
            symbol: 'DAI',
            chainId: Network.ARBITRUM_MAINNET,
            address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
            decimals: 18,
            extensions: {
                quote: true,
            },
        },
        {
            name: 'Tether',
            symbol: 'USDT',
            chainId: Network.ARBITRUM_MAINNET,
            address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
            decimals: 6,
            extensions: {
                quote: true,
            },
        },
        {
            name: 'Wrapped BTC',
            symbol: 'WBTC',
            chainId: Network.ARBITRUM_MAINNET,
            address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
            decimals: 8,
        },
        {
            name: 'Arbitrum',
            symbol: 'ARB',
            chainId: Network.ARBITRUM_MAINNET,
            address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
            decimals: 18,
        },


        // ARBITRUM GOERLI 
        {
            address: "0x175A6D830579CAcf1086ECC718fAB2A86b12e0D3",
            chainId: Network.ARBITRUM_GOERLI,
            symbol: "WETH",
            decimals: 18,
            name: "Wrapped Ether",
        },
        {
            address: "0xb37b4399880AfEF7025755d65C193363966b8b89",
            chainId: Network.ARBITRUM_GOERLI,
            symbol: "DAI",
            decimals: 18,
            name: "Dai Stablecoin",
        },
        {
            address: "0x34cB584d2E4f3Cd37e93A46A4C754044085439b4",
            chainId: Network.ARBITRUM_GOERLI,
            symbol: "USDC",
            decimals: 18,
            name: "USDC Stablecoin",
        },
        {
            address: "0x6ABc1231d85D422c9Fe25b5974B4C0D4AB85d9b5",
            chainId: Network.ARBITRUM_GOERLI,
            symbol: "USDT",
            decimals: 18,
            name: "Tether",
        },
        {
            address: "0x710c1A969cbC8ab5644571697824c655ffBDE926",
            chainId: Network.ARBITRUM_GOERLI,
            symbol: "WBTC",
            decimals: 18,
            name: "Wrapped Bitcoin",
        },
        {
            address: "0x83250b2783554D4D401c45c39fF8A161dE44BC15",
            chainId: Network.ARBITRUM_GOERLI,
            symbol: "TEST",
            decimals: 18,
            name: "Test Coin",
        },

        // *** BASE MAINNET ***
        {
            name: 'Wrapped Ether',
            symbol: 'WETH',
            chainId: Network.BASE_MAINNET,
            address: '0x4200000000000000000000000000000000000006',
            decimals: 18,
        },
        {
            name: 'USD Base Coin',
            symbol: 'USDC',
            chainId: Network.BASE_MAINNET,
            address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
            decimals: 6,
            extensions: {
                quote: true,
            },
        },
        {
            name: 'Coinbase Wrapped Staked ETH',
            symbol: 'cbETH',
            chainId: Network.BASE_MAINNET,
            address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
            decimals: 18,
        },
        {
            name: 'Dai Stablecoin',
            symbol: 'DAI',
            chainId: Network.BASE_MAINNET,
            address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
            decimals: 18,
            extensions: {
                quote: true,
            },
        },
        {
            name: 'USDC Stablecoin',
            symbol: 'USDC',
            chainId: Network.ARBITRUM_SEPOLIA,
            address: '0xd28301B86800bBCF1f09a55642ee3E115Edb1f67',
            decimals: 18,
            extensions: {
              quote: true,
            },
          },
          {
            name: 'Test Token', // CAN PRETEND THIS IS PEPE!
            symbol: 'TEST',
            chainId: Network.ARBITRUM_SEPOLIA,
            address: '0x2fc8011B01c988249ace25ec2c624079ac146e04',
            decimals: 18,
          },
          {
            name: 'Brett Coin',
            symbol: 'BRETT',
            chainId: Network.BASE_MAINNET,
            // logoURI: `${TokenImages['BRETTLogo']}`,
            address: '0x532f27101965dd16442E59d40670FaF5eBB142E4',
            decimals: 18,
            extensions: {
              referenceVenue: 'univ3',
              referenceVenueQuote: 'WETH',
              referenceVenueFeeTier: process.env['BRETT_BASE_MAINNET_RVFT'] || '10000',
            },
          },
          {
            name: 'Wrapped Ether',
            symbol: 'WETH',
            chainId: Network.BASE_MAINNET,
            // logoURI: `${TokenImages['WETHLogo']}`,
            address: '0x4200000000000000000000000000000000000006',
            decimals: 18,
            extensions: {
              underlyingAssetGeckoID: 'ethereum',
              isNativeAssetWrapper: true,
            },
          },
          {
            name: 'USD Base Coin',
            symbol: 'USDbC',
            chainId: Network.BASE_MAINNET,
            // logoURI: `${TokenImages['USDCLogo']}`, // TODO: update to USDbC logo
            address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
            decimals: 6,
            extensions: {
              quote: true,
            },
          },
    ],
};

// Permit 2 addresses
export const permit2addresses: { [chainId: number]: string } = {
    [Network.ARBITRUM_GOERLI]: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    [Network.OPTIMISM_MAINNET]: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    [Network.ARBITRUM_SEPOLIA]: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    [Network.BASE_MAINNET]: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
    [Network.ARBITRUM_MAINNET]: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
}

// reactor addresses
export const reactorAddresses: { [chainId: number]: string } = {
    // [Network.ARBITRUM_GOERLI]: '0x53B91D1724F4bb523C2598340849Ff7eb1A12465', //'0xFeF57fD5622EB4627b32642Ac0a010353f487090'// limit order // "0x77978ca9E4Fef774C8F493A776Bcf6e274940427",
    [Network.OPTIMISM_MAINNET]: "0x98169248bDf25E0e297EA478Ab46ac24058Fac78", //"0xcB23e6c82c900E68d6F761bd5a193a5151A1D6d2",
    [Network.ARBITRUM_GOERLI]:  '0xa7C007078CbEB6E0DF56A117752b4f44f4F93187', //'0x8D228f8A5C78F82E8300244497114BC482F6c213', // NEW ONE
    [Network.ARBITRUM_SEPOLIA]: '0x1456a1897509Bb9A42610d8fF5FE869D2612C181',
    [Network.BASE_MAINNET]: '0x3C53c04d633bec3fB0De3492607C239BF92d07f9',
    [Network.ARBITRUM_MAINNET]: '0x6D81571B4c75CCf08bD16032D0aE54dbaff548b0',
}