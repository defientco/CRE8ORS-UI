import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"
import Header from "../Header"
import { useTheme } from "../../providers/ThemeProvider"

const PausedMint = () => {
  const { onChangeThemeConfig } = useTheme()
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    onChangeThemeConfig("dark")
  }, [])

  return (
    <div
      className="w-screen h-[100vh]
        bg-[url('/assets/Mint/Paused/bg_paused.png')]
        bg-cover bg-center
        flex items-center justify-center"
    >
      <Header />
      <div
        className="bg-[#0000008a] 
            p-[20px] md:p-[40px]
            rounded-[20px]
            shadow-[0px_4px_4px_rgb(0,0,0,0.45)]"
      >
        <pre
          className="font-eigerdals font-bold 
                text-[40px] samsungS8:text-[45px] md:text-[65px] text-white
                leading-[99.3%]
                pb-[20px]"
        >
          Mint Paused
        </pre>
        <pre
          className="font-quicksand font-medium
                leading-[103.3%]
                text-center
                text-[19px] text-white"
        >
          {isMobile
            ? `Under construction.\nPlease come back later.`
            : "Under construction. Please come back later."}
        </pre>
      </div>
    </div>
  )
}

export default PausedMint
