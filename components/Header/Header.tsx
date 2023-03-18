import Image from "next/image"
import Link from "next/link"

const Header = () => (
  <nav className="fixed top-0 z-50 flex flex-wrap items-center justify-between w-full p-6 bg-black border-b-4 font-aldrich">
    <div className="items-center flex-shrink-0 hidden mr-6 text-white cursor-auto lg:flex">
      <Link href="/">
        <Image
          src="/evclogo.png"
          alt="EVC Logo"
          width={175}
          height={50}
          className="cursor-pointer"
        />
      </Link>
    </div>
    <div className="flex-col items-center w-full lg:md:flex-row lg:items-right lg:w-auto">
      <Link href="#contact">
        <div className="inline-block px-4 py-2 mt-4 text-white text-[32px] leading-[31px] font-[400] rounded font-aldrich font-weight-400 text-md hover:border-transparent lg:mt-0">
          Contact
        </div>
      </Link>
      <Link
        href="#about"
        className="inline-block px-4 py-2 mt-4 text-white text-[32px] leading-[31px] font-[400] rounded hover:border-transparent   lg:mt-0"
      >
        <div className="inline-block px-4 py-2 mt-4 text-white text-[32px] leading-[31px] font-[400] rounded font-aldrich font-weight-400 text-md hover:border-transparent lg:mt-0">
          About
        </div>
      </Link>
      <Link
        href="/faq"
        className="inline-block px-4 py-2 mt-4  text-white text-[32px] leading-[31px] font-[400] rounded text-center hover:border-transparent   lg:mt-0"
      >
        <div className="inline-block px-4 py-2 mt-4 text-white text-[32px] leading-[31px] font-[400] rounded font-aldrich font-weight-400 text-md hover:border-transparent lg:mt-0">
          FAQ
        </div>
      </Link>
    </div>
  </nav>
)

export default Header
