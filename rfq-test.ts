import axios from "axios";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import RFQ_ABI from "./constants/rubiconRFQ";
import { Network, tokenList } from "./constants/constants";

dotenv.config();

export type RFQResponse = {
    orders: Array<{
        encodedOrder: string;
        signature: string;
    }>;
    quantities: string[];
};

export type QuoteType = {
    sellToken: string;
    buyToken: string;
    sellAmt: string;
    buyAmt: string;
};

export type PriceLevelsResponse = {
    levels: Array<{
        sellMin: string;
        sellMax: string;
        buyStart: string;
        buyEnd: string;
        createdAt: string;
        deadline: string;
    }>;
};

const RFQ_CONTRACT_ADDRESSES: { [key: number]: string } = {
    [Network.OPTIMISM_MAINNET]: "0xf8C8308a7C89315B8395A945C32E879a1295cD20",
    [Network.BASE_MAINNET]: "0x6b6B6aA808423FBeCc9cCeb4fDefFb76a550bAe7",
    [Network.ARBITRUM_MAINNET]: "0x9B848639D3Bed6db856b3A69e3C33FBEbD672e6b",
};

function getProvider(chainId: number) {
    const providerUrl = process.env[`${chainId}_JSON_RPC`];
    if (!providerUrl) {
        throw new Error(`Provider URL for chain ID ${chainId} not found`);
    }
    return new ethers.providers.JsonRpcProvider(providerUrl, chainId);
}

function getTokenDecimals(tokenAddress: string): number {
    const token = tokenList.tokens.find(t => t.address.toLowerCase() === tokenAddress.toLowerCase());
    if (token) {
        return token.decimals;
    } else {
        console.log(`Token decimals not found for ${tokenAddress}, defaulting to 18`);
        return 18;
    }
}

function main() {
    console.log("\n🎉 Running RFQ Sandbox Example Script...");

    // EXAMPLE: yarn run start 42161 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 3400 0.1
    // Inverse: yarn run start 42161 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 0.0003125 500

    // Command-line arguments
    const args = process.argv.slice(2);
    if (args.length < 3) {
        throw new Error("Usage: yarn run start <chainId> <buyToken> <sellToken> [price] [amount]");
    }
    const [chainIdStr, buyToken, sellToken, priceStr, amountStr] = args;
    const chainId = parseInt(chainIdStr);
    const price = priceStr ? parseFloat(priceStr) : null;
    const amount = amountStr ? parseFloat(amountStr) : null;

    // URLs
    const CORE_URL = 'https://rfq.rubicon.finance';
    const API_URL = `${CORE_URL}/match`;
    const PRICE_LEVELS_URL = `${CORE_URL}/price-levels`;

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        throw new Error("API_KEY not found");
    }
    const TAG = process.env.TAG;
    if (!TAG) {
        throw new Error("TAG not found");
    }
    const timeBoundSeconds: number = 15;

    const sellDecimals = getTokenDecimals(sellToken);
    const buyDecimals = getTokenDecimals(buyToken);
    const sellAmt = price && amount ? ethers.utils.parseUnits((amount * price).toFixed(sellDecimals), sellDecimals) : null;
    const buyAmt = amount ? ethers.utils.parseUnits(amount.toString(), buyDecimals) : null;
    const untilDeadline = Math.floor(Date.now() / 1000) + timeBoundSeconds;

    const _provider = getProvider(chainId);

    const getPriceLevels = async (sellToken: string, buyToken: string) => {
        try {
            const response = await axios.get(PRICE_LEVELS_URL, {
                params: {
                    chainId: chainId,
                    tag: TAG,
                    sellToken: sellToken,
                    buyToken: buyToken,
                    deadline: untilDeadline
                },
                headers: {
                    'X-API-KEY': API_KEY
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error making price levels request:', error.response ? error.response.data : error.message);
        }
    };

    const getRFQ = async () => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    chainId: chainId,
                    tag: TAG,
                    sellToken: sellToken,
                    buyToken: buyToken,
                    sellAmt: sellAmt,
                    buyAmt: buyAmt,
                    deadline: untilDeadline
                },
                headers: {
                    'X-API-KEY': API_KEY
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Error making RFQ request:', error.response ? error.response.data : error.message);
        }
    };

    const logPriceLevels = async () => {
        const [asks, bids] = await Promise.all([
            getPriceLevels(sellToken, buyToken),
            getPriceLevels(buyToken, sellToken)
        ]);

        console.log("\n🤑 Available Price Levels in Each Direction - note price is relative and reciprocal across bids and asks");
        console.log("ASKS",sellToken, "->", buyToken, asks);
        console.log("BIDS", buyToken, "->", sellToken, bids);
    };

    if (!price || !amount) {
        logPriceLevels();
    } else {
        getPriceLevels(sellToken, buyToken).then(async (data: PriceLevelsResponse) => {
            console.log("\n🤑 Available Price Levels", data);

            if (sellAmt && buyAmt) {
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Log the details of the transaction
                console.log("\n🔥 RFQ TX Details:");
                console.log("Chain ID:", chainId);
                console.log("Sell Token:", sellToken);
                console.log("Buy Token:", buyToken);
                console.log("Sell Amount:", sellAmt.toString());
                console.log("Buy Amount:", buyAmt.toString());
                console.log("Price:", price);

                getRFQ().then((data: RFQResponse) => {
                    if (!data) throw new Error('No RFQ response received');
                    console.log('\n🌟 Got a quote - proceeding to execute!', data);

                    if (!process.env.PRIVATE_KEY) {
                        throw new Error("PRIVATE_KEY not found");
                    }
                    const signer = new ethers.Wallet(
                        process.env.PRIVATE_KEY as string,
                        _provider
                    );

                    const contractAddress = RFQ_CONTRACT_ADDRESSES[chainId];
                    if (!contractAddress) {
                        throw new Error(`RFQ contract address not found for chain ID ${chainId}`);
                    }

                    const fillContract = new ethers.Contract(
                        contractAddress, RFQ_ABI,
                        _provider
                    ).connect(signer);

                    const submitOrder = async () => {
                        try {
                            console.log('\n🚢 Submitting onchain order for received quote...');
                            await new Promise(resolve => setTimeout(resolve, 1000));

                            const orders = data.orders.map(order => ({
                                order: ethers.utils.arrayify(order.encodedOrder),
                                sig: ethers.utils.arrayify(order.signature)
                            }));
                            const quantities = data.quantities.map(qty => ethers.BigNumber.from(qty));

                            const q: QuoteType = {
                                sellToken: sellToken,
                                buyToken: buyToken,
                                sellAmt: sellAmt.toString(),
                                buyAmt: buyAmt.toString()
                            };
                            const r = {
                                orders: orders,
                                quantities: quantities
                            };

                            // Check the allowance of the RFQ contract for the sell token
                            const sellTokenContract = new ethers.Contract(
                                sellToken, ['function allowance(address,address) view returns (uint256)'],
                                _provider
                            ).connect(signer);
                            const allowance = await sellTokenContract.allowance(signer.address, contractAddress);
                            if (allowance.lt(sellAmt)) {
                                throw new Error(`\nInsufficient allowance for sell token ${sellToken} on RFQ contract ${contractAddress}`);

                                // Example approval code
                                // const approveTx = await sellTokenContract.approve(contractAddress, sellAmt).then(async (tx: any) => {
                                //     await tx.wait();
                                //     if (tx.status === true) {
                                //         console.log("Approval successful");
                                //     }
                                // });
                            }

                            const tx = await fillContract.estimateGas.fill(q, r).then(async (tx: any) => {
                                console.log("\nESTIMATE GAS RESULT!!!!", tx);
                                await tx.wait();
                                if (tx.status === true) {
                                    console.log("Transaction successful");
                                }
                                // console.log('\nOrder submitted:', tx.hash);
                            });

                            // Uncomment and complete this section if you want to submit the transaction
                            // const tx = await fillContract.functions.fill(q, r).then(async (tx: any) => {
                            //     console.log("TX", tx);
                            //     await tx.wait();
                            //     if (tx.status === true) {
                            //         console.log("Transaction successful");
                            //     }
                            //     console.log('\nOrder submitted:', tx.hash);
                            // });
                        } catch (error: any) {
                            console.error('Error submitting order:', error);
                        }
                    };

                    submitOrder();
                });
            }
        });
    }
}

main();
