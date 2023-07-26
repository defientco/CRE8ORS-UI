import { useRouter } from "next/router"
import { useEffect } from "react"

const ERC721H = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("https://mirror.xyz/sweetman.eth/gKpHCW-6wviwbQn_zzG7vQDZ-TxoV9GwWFdXaT_QzC4")
  }, [router])

  return <div>loading</div>
}

export default ERC721H
