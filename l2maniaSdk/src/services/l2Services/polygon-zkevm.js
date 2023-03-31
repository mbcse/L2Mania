import { ZkEvmClient, use } from "@maticnetwork/maticjs"

const zkEvmClient = new ZkEvmClient({
    network: "testnet",
    version: "mumbai",
    parentProvider: "https://rpc-mumbai.maticvigil.com",
    maticProvider: "https://rpc-mumbai.maticvigil.com",
})

export const bridgeToZkEvm = async (userAddress, tokenAddress, amount) => {
    const erc20Token = zkEvmClient.erc20(tokenAddress, true); 
    const result1 = await erc20Token.deposit(amount, userAddress);
    const txHash1 = await result.getTransactionHash();
    const receipt1 = await result.getReceipt();
    const result2 = await erc20Token.depositClaim(txHash1);
    const txHash2 = await result.getTransactionHash();
    const receipt2 = await result.getReceipt();
}

export const withdrawFromZkEvm = async (userAddress, tokenAddress, amount) => {
    const erc20Token = zkEvmClient.erc20(tokenAddress, false); 
    const result = await erc20Token.deposit(amount, userAddress);
    const result1 = await erc20Token.deposit(amount, userAddress);
    const txHash1 = await result.getTransactionHash();
    const receipt1 = await result.getReceipt();
    const result2 = await erc20Token.depositClaim(txHash1);
    const txHash2 = await result.getTransactionHash();
    const receipt2 = await result.getReceipt();
}