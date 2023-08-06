import TwitterApi from "twitter-api-v2"

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER)

export const getAvatarByTwitterHandle = async (twitterHandle: string) => {
  const readOnlyClient = twitterClient.readOnly

  try {
    const data = await readOnlyClient.v2.userByUsername(twitterHandle)

    return data?.data?.profile_image_url
  } catch (err) {
    return ""
  }
}
