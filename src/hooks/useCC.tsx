import CyberConnect, {
  Env,
} from "@cyberlab/cyberconnect-v2"
import { ethers } from "ethers"
import {
  useEffect,
  useMemo,
  useState,
} from "react"

let CCSigleInstance: CyberConnect

const getCCInstance: any = (provider: any) => {
  if (!!CCSigleInstance) return CCSigleInstance

  if (!provider) return null

  const instance = new CyberConnect({
    namespace: 'CyberConnect',
    env: Env.STAGING,
    appId: "e20d0b35-8e8c-46f9-80bc-ccfeda19f133",
    provider: provider,
    signingMessageEntity: 'CyberConnect',
  });


  CCSigleInstance = instance

  return instance
}

function useCyberConnect() {
  const [cc, setCc] = useState(null)

  useEffect(() => {
    // force client render
    const ethereum = (window as any).ethereum;
    const web3Provider = new ethers.BrowserProvider(ethereum);
    setCc(getCCInstance(ethereum))
  }, [])

  return useMemo(() => cc, [cc])
}

export default useCyberConnect

