
import { useState } from "react"
// import Web3 from "web3"
import { ethers } from "ethers"
import { Flex } from "@chakra-ui/react";
import CenterPanel from "../components/homeCenterPanel/CenterPanel";
import LeftPanel from "../components/homeLeftPanel/LeftPanel";
import RightPanel from "../components/homeRightPanel/RightPanel";


export default function Home() {

  const [isConnected, setIsConnected] = useState<boolean>()
  const [signerAddress, setSignerAddress] = useState<string>()

  function detectCurrentProvider() {
    let provider: any
    if (window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum)
    } else {
      alert("Non etherum browser detected. You should install Metamask")
      // provider = ethers.getDefaultProvider() // I need a arg of network and their example did not specify one
    }
    return provider
  }


  async function connectMetamask() {
    let signer
    try {
      const currentProvider = detectCurrentProvider()
      if (currentProvider) {
        // using web3
        // await currentProvider.request({method: "eth_requestAccounts"})
        // const web3 = new Web3(currentProvider)
        // const userAccount = await web3.eth.getAccounts()
        // const account = userAccount[0]
        // let ethBalance = await web3.eth.getBalance(account)
        // setIsConnected(true)

        // using ethers
        signer = await currentProvider.getSigner()
        setIsConnected(true)
        setSignerAddress(signer.address);
      }
    } catch (err) {
      console.log("Error:", err)
    }
  }

  function disconnectMetamask() {
    setIsConnected(false)
    setSignerAddress(undefined)
  }


  return (

    <Flex position={"fixed"} h="100vh">
      <LeftPanel isConnected={isConnected} signerAddress={signerAddress} />
      <CenterPanel />
      <RightPanel isConnected={isConnected} disconnect={disconnectMetamask} connect={connectMetamask} />
    </Flex>

  )
}

