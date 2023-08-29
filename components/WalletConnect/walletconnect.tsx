import { pair } from "@/utils/WalletConnectUtil"
import { Input } from "@nextui-org/react"
import { error } from "console"
import { useState } from "react"
import { Button } from "../../shared/Button"
import DNALoading from "../ProfilePage/DNALoading"

export default function WalletConnectPage() {
  const [uri, setUri] = useState("")
  const [loading, setLoading] = useState(false)

  async function onConnect() {
    try {
      setLoading(true)
      await pair({ uri })
    } catch (err: unknown) {
      error(err)
    } finally {
      setUri("")
      setLoading(false)
    }
  }

  return (
    <Input
      css={{ width: "100%" }}
      bordered
      aria-label="wc url connect input"
      placeholder="e.g. wc:a281567bb3e4..."
      onChange={(e) => setUri(e.target.value)}
      value={uri}
      contentRight={
        <Button id="walletconnect" disabled={!uri} onClick={() => onConnect()}>
          {loading ? <DNALoading /> : "Connect"}
        </Button>
      }
    />
  )
}
