import { formatBytes32String } from "ethers/lib/utils"

export const ACCEPTED_IMAGE_URIS = {
  musician: "ipfs://bafybeifzlnqz5nflw2lgjtb3lbfcda7k4sxtckq4pts3lo6n2j3n2zkpbe",
  engineer: "ipfs://bafybeieqbvlptzoelvsvtgetxfh7tozbjtjstffnlvykilcgmhknda2ocy",
  dancer: "ipfs://bafybeidve4v4zg6ynly44xaydzuj5b66o2vve5pewkz2cmxlmz5hhjhepi",
  director: "ipfs://bafybeig7ci6xhy5t5lothptu276ajogbrbkomvpyxozxggmvih5wbt5fnm",
  writer: "ipfs://bafybeih7knkti7xfxiyjkmg4s5mmdy3b3fc77td5hhv2o3au2q7dz3ykty",
  thespian: "ipfs://bafybeifcu4mk4lbpashjv2lwfzoikixh34xgxoupu4vaq474zlpdvsza6i",
  photographer: "ipfs://bafybeigwpo35pu7v7fp4cwhsb3yc2v6a4uvdxuihlrjcao4ecnnqhrqkpu",
  designer: "ipfs://bafybeifqkjeqe6ciqwmz2lrisirbpkfilloktf4jce5jehcvyxkgmotahq",
}

// ERC6551
export const REGISTRY_ADDRESS_V3 = "0x000000006551c19487814612e58FE06813775758"
export const ACCOUNT_IMPLEMENTATION_V3 = "0x41C8f39463A868d3A88af00cd0fe7102F30E44eC"
export const ACCOUNT_PROXY_V3 = "0x55266d75D1a14E4572138116aF39863Ed6596E7F"
export const REGISTRY_ADDRESS_V2 = "0x02101dfB77FDE026414827Fdc604ddAF224F0921"
export const ACCOUNT_IMPLEMENTATION_V2 = "0x2d25602551487c3f3354dd80d76d54383a243358"
export const CHAIN_ID = process.env.NEXT_PUBLIC_TESTNET ? 5 : 1
export const SALT_V3 = "0x0000000000000000000000000000000000000000000000000000000000000000"
export const SALT_V2 = 0

