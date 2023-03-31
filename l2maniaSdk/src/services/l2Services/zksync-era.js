import * as zksync from "zksync-web3";
import {Provider as zksyncProvider, Web3Provider as zksyncWeb3Provider} from 'zksync-web3'
import * as ethers from "ethers";
import {Provider as ethersProvider} from 'ethers'



export default class ZksyncEra {
    public rpcUrl: string;
    public provider: Provider;

    constructor( provider: string | ethersProvider ) {
        if(provider instanceof ethersProvider ) {

        }else {

        }
    }
}
