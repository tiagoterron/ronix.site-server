const Tokens = {
    RON: {
        Symbol: "RON",
        Title: "RON",
        Name: "Ronin Token",
        Decimals: 18,
        Price: null,
        Min: 0.5,
        Max: 100000,
        RON: {
            Decimals: 18,
        },
        MATIC: {
            Decimals: 18
        },
        AVAX: {
            Decimals: 18
        },
        BSC: {
            Decimals: 18
        },
        ETH: {
            Decimals: 18
        }
    },
    SLP: {
        Symbol: "SLP",
        Title: "SLP",
        Name: "Smooth Love Portions",
        Decimals: 0,
        Price: null,
        Min: 10,
        Max: 1000000,
        RON: {
            Decimals: 0
        },
        MATIC: {
            Decimals: 18
        },
        AVAX: {
            Decimals: 18
        },
        BSC: {
            Decimals: 18
        },
        ETH: {
            Decimals: 18
        }
    },
    AXS: {
        Symbol: "AXS",
        Title: "AXS",
        Name: "Axir Infinity",
        Decimals: 18,
        Price: null,
        Min: 0.05,
        Max: 10000,
        RON: {
            Decimals: 18
        },
        MATIC: {
            Decimals: 18
        },
        AVAX: {
            Decimals: 18
        },
        BSC: {
            Decimals: 18,
        },
        ETH: {
            Decimals: 18
        }
        
    },
    WETH: {
        Symbol: "WETH",
        Title: "WETH",
        Name: "Ethereum",
        Decimals: 18,
        Price: null,
        Min: 0.00002,
        Max: 100,
        RON: {
            Decimals: 18
        },
        MATIC: {
            Decimals: 18
        },
        AVAX: {
            Decimals: 18
        },
        BSC: {
            Decimals: 18
        },
        ETH: {
            Decimals: 18
        }
    },
    USDC: {
        Symbol: "USDC",
        Title: "USDC",
        Name: "USD Coin",
        Decimals: 6,
        Price: null,
        Min: 5,
        Max: 100000,
        RON: {
            Decimals: 6
        },
        MATIC: {
            Decimals: 18
        },
        AVAX: {
            Decimals: 18
        },
        BSC: {
            Decimals: 18
        },
        ETH: {
            Decimals: 18
        }
    },
    MATIC: {
        Symbol: "MATIC",
        Title: "WMATIC",
        Name: "Polygon Coin",
        Decimals: 18,
        Price: null,
        Min: 5,
        Max: 10000,
        RON: {
            Decimals: 18
        },
        MATIC: {
            Decimals: 18
        },
        AVAX: {
            Decimals: 18
        },
        BSC: {
            Decimals: 18
        },
        ETH: {
            Decimals: 18
        }
    },
    AVAX: {
        Symbol: "AVAX",
        Title: "WAVAX",
        Name: "Avalanche Coin",
        Decimals: 18,
        Price: null,
        Min: 0.1,
        Max: 10000,
        RON: {
            Decimals: 18
        },
        MATIC: {
            Decimals: 18
        },
        AVAX: {
            Decimals: 18
        },
        BSC: {
            Decimals: 18
        },
        ETH: {
            Decimals: 18
        }
    },
    BNB: {
        Symbol: "BNB",
        Title: "WBNB",
        Name: "Binance Coin",
        Decimals: 18,
        Price: null,
        Min: 0.01,
        Max: 10000,
        RON: {
            Decimals: 18
        },
        MATIC: {
            Decimals: 18
        },
        AVAX: {
            Decimals: 18
        },
        BSC: {
            Decimals: 18
        },
        ETH: {
            Decimals: 18
        }
    }
  }
  
  const Networks = {
    BSC: {
        ChainId: 56,
        ChainIdHex: 0x38,
        Name: "Binance Smart Chain",
        Symbol: "BSC",
        Title: "BNB",
        Decimals: 18,
        RpcUrls: "https://bsc-dataseed.binance.org/",
        BlockExplorerUrls: "https://bscscan.com/",
        Status: true
    },
    RON: {
        ChainId: 2020,
        ChainIdHex: 0x7e4,
        Name: "Ronin Chain",
        Symbol: "RON",
        Title: "RON",
        Decimals: 18,
        RpcUrls: "https://api.roninchain.com/rpc",
        BlockExplorerUrls: "https://explorer.roninchain.com/",
        Status: true
    },
    ETH: {
        ChainId: 3,
        ChainIdHex: 0x3,
        Name: "Ethereum Network",
        Symbol: "ETH",
        Title: "ETH",
        Decimals: 18,
        RpcUrls: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        BlockExplorerUrls: "https://ropsten.etherscan.io/",
        Status: false
    },
    MATIC: {
        ChainId: 80001,
        ChainIdHex: 0x61,
        Name: "Polygon Network",
        Symbol: "MATIC",
        Title: "MATIC",
        Decimals: 18,
        RpcUrls: "https://rpc-mumbai.matic.today",
        BlockExplorerUrls: "https://mumbai.polygonscan.com/",
        Status: false
    },
    AVAX: {
        ChainId: 43113,
        ChainIdHex: 0x61,
        Name: "Avalanche Network",
        Symbol: "AVAX",
        Title: "AVAX",
        Decimals: 18,
        RpcUrls: "https://api.avax-test.network/ext/bc/C/rpc",
        BlockExplorerUrls: "https://testnet.snowtrace.io/",
        Status: false
    }
  }




module.exports = { Tokens, Networks }