import JoiBase from "joi"

const profileValidation = JoiBase.object({
  username: JoiBase.string().messages({
    "string.empty": `Username cannot be an empty field`,
  }),
  twitterhandle: JoiBase.string().messages({
    "string.empty": `Twitter Handle cannot be an empty field`,
  }),
  location: JoiBase.string().messages({
    "string.empty": `Location cannot be an empty field`,
  }),
  askmeabout: JoiBase.string().messages({
    "string.empty": `Ask me about cannot be an empty field`,
  }),
  bio: JoiBase.string().messages({
    "string.empty": `Bio cannot be an empty field`,
  }),
})

export { profileValidation }
