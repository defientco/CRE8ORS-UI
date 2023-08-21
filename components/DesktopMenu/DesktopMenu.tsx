import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import CustomConnectWallet from "../CustomConnectWallet"
import DiscordIcon from "../DiscordIcon"
import { ToggleButton } from "../../shared/Button"
import { useTheme } from "../../providers/ThemeProvider"
import WalletConnectButton from "../WalletConnectButton"

const DesktopMenu = () => {
  const { onChangeThemeConfig, themeMode } = useTheme()

  const router = useRouter()
  const { isConnected, address } = useAccount()

  const isMintPage = router.pathname.includes("/mint")
  const isHidden = isMintPage || router.pathname.includes("/staking")

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItemClassName = `cursor-pointer text-white ${!isMintPage && "dark:text-[black]"}`

  const onToggle = () => {
    onChangeThemeConfig()
  }

  return (
    <div className="flex flex-row text-sm uppercase font-quicksand gap-x-6">
      {!isHidden && (
        <div className="flex items-center font-bold font-quicksand">
          <button
            type="button"
            className="px-2 text-[#9C9C9C] cursor-pointer text-[15px] font-quicksand uppercase"
            onClick={() => onChangeThemeConfig("light")}
          >
            light
          </button>
          <ToggleButton onClick={onToggle} value={themeMode === "dark"} id="light_dark_switch" />
          <button
            type="button"
            className="px-2 text-[#9C9C9C] cursor-pointer text-[15px] font-quicksand uppercase"
            onClick={() => onChangeThemeConfig("dark")}
          >
            dark
          </button>
        </div>
      )}
      <div className="relative">
        <button
          type="button"
          className={`font-bold rounded-lg bg-[black] ${
            !isMintPage && "dark:text-[black] dark:bg-white"
          } text-white uppercase text-sm w-[134px] h-[40px] ${isMenuOpen && "shadow-md"} ${
            !isMenuOpen && `!bg-transparent ${!isMintPage && "dark:!text-[white]"} !text-[black]`
          }`}
          onClick={toggleMenu}
        >
          Explore
          {!isMenuOpen && <ChevronDownIcon className="inline w-4 h-5 align-middle" />}
          {isMenuOpen && <ChevronUpIcon className="inline w-4 h-5 align-middle" />}
        </button>
        {isMenuOpen && (
          <div
            className={`absolute right-0 top-[45px] z-200 inline-flex flex-col items-start uppercase justify-between space-y-4 p-4 
          bg-[black] ${!isMintPage && "dark:bg-white"} 
          shadow-md rounded-lg  font-quicksand text-sm`}
          >
            <Link href="/status" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Status</div>
            </Link>
            <Link href="/manifesto" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Manifesto</div>
            </Link>
            <Link href="/roadmap" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Roadmap</div>
            </Link>
            <Link
              href="https://mirror.xyz/sweetman.eth/gKpHCW-6wviwbQn_zzG7vQDZ-TxoV9GwWFdXaT_QzC4"
              target="_blank"
              rel="noreferrer"
            >
              <div className={menuItemClassName}>ERC721H</div>
            </Link>
            <Link href="/leaderboard" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Leaderboard</div>
            </Link>
            <a
              href="https://opensea.io/collection/cre8ors-passports"
              target="_blank"
              rel="noreferrer"
            >
              <div className={menuItemClassName}>Passports</div>
            </a>
            <Link href="/checkpassport" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Check</div>
            </Link>
            <a href="https://opensea.io/collection/cre8ors-relics" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Relics</div>
            </a>
            <Link href="/claim" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Claim</div>
            </Link>
            <a href="https://cre8ors.beehiiv.com/" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Blog</div>
            </a>
            <Link href="/teams" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>Team</div>
            </Link>
            <Link href="/faq" target="_blank" rel="noreferrer">
              <div className={menuItemClassName}>FAQ</div>
            </Link>
            {isConnected ? (
              <Link href={`/profile/${address}`} target="_blank" rel="noreferrer">
                <div className={menuItemClassName}>Profile</div>
              </Link>
            ) : (
              <WalletConnectButton>
                <div className={`${menuItemClassName} uppercase`}>Connect</div>
              </WalletConnectButton>
            )}
            <div className="text-gray-400 cursor-not-allowed">Warehouse</div>
          </div>
        )}
      </div>
      <DiscordIcon />
      <a href="https://twitter.com/Cre8orsNFT" target="_blank" rel="noreferrer">
        <div className="pt-2 pl-10 cursor-pointer ">
          <Image
            src={`${
              themeMode === "dark" && !isMintPage
                ? "/assets/Header/white_twitter.png"
                : "/assets/Header/new_twitter.png"
            }`}
            width={19}
            height={19}
            alt="twitter"
          />
        </div>
      </a>
      <div className="px-4 pt-2">
        <CustomConnectWallet />
      </div>
    </div>
  )
}

export default DesktopMenu
