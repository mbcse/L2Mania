
import ethers from "ethers"
import optimismSDK from "@eth-optimism/sdk"




const l1Url = `https://eth-goerli.g.alchemy.com/v2/EFHKHRlO9y2AYykFmgkDRF-ePizbp_n2`
const l2Url = `https://opt-goerli.g.alchemy.com/v2/kgFaqTUJK4RB8g7LX6C11dZ0SNxYnxfT`



const erc20Addrs = {
  l1Addr: "0x32B3b2281717dA83463414af4E8CfB1970E56287",
  l2Addr: "0x3e7eF8f50246f725885102E8238CBba33F276747"
}    




let crossChainMessenger
let l1ERC20, l2ERC20    
let ourAddr              



const getSigners = async (wagmiSigner) => {
    const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1Url, wagmiSigner)
    const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2Url, wagmiSigner)

    return [l1Wallet, l2Wallet]
}   




const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    inputs: [],
    name: "faucet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }  
]   



export const setup = async(wagmiSigner) => {
  const [l1Signer, l2Signer] = await getSigners(wagmiSigner)
  ourAddr = l1Signer.address
  crossChainMessenger = new optimismSDK.CrossChainMessenger({
      l1ChainId: 5,    
      l2ChainId: 420,  
      l1SignerOrProvider: l1Signer,
      l2SignerOrProvider: l2Signer,
      bedrock: true
  })
  l1ERC20 = new ethers.Contract(erc20Addrs.l1Addr, erc20ABI, l1Signer)
  l2ERC20 = new ethers.Contract(erc20Addrs.l2Addr, erc20ABI, l2Signer)
}   



const oneToken = BigInt(1e18)


export const depositERC20 = async (tokenAddress) => {

  const start = new Date()

  const allowanceResponse = await crossChainMessenger.approveERC20(
    erc20Addrs.l1Addr, erc20Addrs.l2Addr, oneToken)
  await allowanceResponse.wait()

  const response = await crossChainMessenger.depositERC20(
    erc20Addrs.l1Addr, erc20Addrs.l2Addr, oneToken)
  await response.wait()
  await crossChainMessenger.waitForMessageStatus(response.hash,
                                                  optimismSDK.MessageStatus.RELAYED)

}



export const withdrawERC20 = async () => {

  const start = new Date()

  const response = await crossChainMessenger.withdrawERC20(
    erc20Addrs.l1Addr, erc20Addrs.l2Addr, oneToken)
  await response.wait()

¯  await crossChainMessenger.waitForMessageStatus(response.hash, 
    optimismSDK.MessageStatus.READY_TO_PROVE)
  await crossChainMessenger.proveMessage(response.hash)
  

  await crossChainMessenger.waitForMessageStatus(response.hash, 
                                                optimismSDK.MessageStatus.READY_FOR_RELAY) 
  await crossChainMessenger.finalizeMessage(response.hash)

  await crossChainMessenger.waitForMessageStatus(response, 
    optimismSDK.MessageStatus.RELAYED)
}    








