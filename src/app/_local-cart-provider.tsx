import { useCart } from "medusa-react";
import { PropsWithChildren, useEffect } from "react";

export default function LocalCartProvider({ children }: PropsWithChildren) {
    const { createCart } = useCart()

    useEffect(() => {
        const hasCart = localStorage.getItem('cart_id')

        if (!hasCart) {
            createCart.mutateAsync({}).then(({ cart }) => {
                localStorage.setItem("cart_id", cart.id)
            })
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}