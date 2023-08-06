import Twit from "twit"

export const getAvatarByTwitterHandle = async (screenName) => {
  try {
    const twitterConfig = {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    }

    const T = new Twit(twitterConfig)

    const { data } = await T.get("users/show", { screen_name: screenName })
    const avatarUrl = data.profile_image_url_https
    return avatarUrl
  } catch (err) {
    return ""
  }
}
