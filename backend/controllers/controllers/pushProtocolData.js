import * as PushAPI from "@pushprotocol/restapi";
import { user } from "@pushprotocol/restapi";

export const getAllNotifications = async (userAddress)=>{
    const notifications = await PushAPI.user.getFeeds({
        user: `eip155:5:${userAddress}`, // user address in CAIP
        env: 'staging'
    });
    console.log(notifications);
    return notifications
}


export const getSpamNotifications = async (userAddress)=>{
    const spams = await PushAPI.user.getFeeds({
        user: `eip155:5:${userAddress}`, // user address in CAIP
        spam: true,
        env: 'staging'
    });
    console.log(spams);
    return spams
}

const getChannelData = async (channelAddress)=>{
    console.log(channelAddress);
    const channelData = await PushAPI.channels.getChannel({
        channel: `eip155:5:${channelAddress}`, // channel address in CAIP
        env: 'staging'
      });

      return channelData
}


export const getSubscriptions = async (userAddress)=>{
    const subscriptions = await PushAPI.user.getSubscriptions({
        user: `eip155:5:${userAddress}`, // user address in CAIP
        env: 'staging'
      });
      console.log(subscriptions);
      const subsdata = []
      for(let i= 0; i<subscriptions.length;i++){
        if("0x2AEcb6DeE3652dA1dD6b54D5fd4f7D8F43DaEb77"==subscriptions[i].channel) continue
        const channelData = await getChannelData(subscriptions[i].channel)
        subsdata.push(channelData)
      }
     
      console.log(subsdata);
      return subsdata
}

export const getUserPushProfile = async (userAddress)=>{
    const user = await PushAPI.user.get({
        account: userAddress,
        env: 'staging',
     });

     console.log(user)
     return user
}

export const getChats= async (userAddress)=>{
    const chats = await PushAPI.chat.chats({
        account: userAddress,
        env: 'staging',
    });

    console.log(chats)
    return chats
}

export const getChatRequests= async (userAddress)=>{

    const chats = await PushAPI.chat.requests({
        account: userAddress,
        env: 'staging',
    });

    console.log(chats)
    return chats
}

