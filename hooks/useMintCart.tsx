import { useState } from "react"

const useMintCart = () => {
  const [cart, setCart] = useState([
    { tier: "1", quantity: "1" },
    { tier: "3", quantity: "5" },
  ] as any)

  const addToCart = (type: number) => {
    const tierExists = cart.some((item) => item.tier === type.toString())

    if (tierExists) {
      setCart(
        cart.map((item) => {
          if (item.tier === type.toString()) {
            const newQuantity = parseInt(item.quantity, 10) + 1
            return { ...item, quantity: newQuantity.toString() }
          }
          return item
        }),
      )
    } else {
      setCart([...cart, { tier: type.toString(), quantity: "1" }])
    }
  }

  const removeFromCart = (type: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.tier === type.toString() && item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
        .filter((item) => item.quantity !== 0),
    )
  }

  const getCartTier = (tierNumber: number) => {
    const tier = cart.find((item) => item.tier === tierNumber.toString())
    return tier ? parseInt(tier.quantity, 10) : 0
  }

  return { cart, addToCart, removeFromCart, getCartTier }
}

export default useMintCart
