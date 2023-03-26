import axios from 'axios'

export const getNFTTransfers = async (chainName, address, res) => {
    const res = await axios.get("https://api.poap.tech/actions/scan/"+address,
    {
        headers:{"Content-Type":"application/json", "x-api-key":"<API_KEY>"}
    })
 }
