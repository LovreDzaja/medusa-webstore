"use client"

import Loading from "@/components/loading"
import { LineItem } from "@medusajs/medusa"
import { formatAmount, useCart, useGetCart, useLocalStorage, useDeleteLineItem } from "medusa-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const Checkout = () => {
    const [localCartId] = useLocalStorage("cart_id", "")
    const { cart: cartRetrieved } = useGetCart(localCartId, { staleTime: 0 })
    const { cart, setCart } = useCart()

    const deleteLineItem = useDeleteLineItem(localCartId);

    const handleDeleteItem = (lineItemId: string) => {
        deleteLineItem.mutate({
            lineId: lineItemId,
        })
    }

    useEffect(() => {
        if (cartRetrieved) {
            setCart(cartRetrieved)
        }
    }, [cartRetrieved])

    const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        if (cartRetrieved?.items) {
            const initialQuantities = cartRetrieved.items.reduce((acc, item) => {
                acc[item.id] = item.quantity;
                return acc;
            }, {} as { [key: string]: number });
            setItemQuantities(initialQuantities);
        }
    }, [cartRetrieved]);

    const handleQuantityChange = (itemId: string, quantity: number) => {
        setItemQuantities(prevState => ({
            ...prevState,
            [itemId]: quantity
        }));
    }

    const calculateSubtotal = () => {
        if (!cart?.items) return 0;
        return cart.items.reduce((subtotal, item) => {
            const quantity = itemQuantities[item.id] || item.quantity;
            return subtotal + item.total! * quantity;
        }, 0);
    }

    if (!cart || !cart.region) {
        return <Loading />
    }

    const subtotal = calculateSubtotal();
    const itemCount = cart.items.reduce((total, item) => total + (itemQuantities[item.id] || item.quantity), 0);

    return (
        <>
            <div className="min-h-screen p-5 lg:p-20 bg-neutral-50 grid content-start gap-3">
                <nav className="fixed top-0 right-0 w-full z-10 rounded-lg text-green-200 mix-blend-difference bg-black">
                    <div className="container mx-auto px-6 py-0">
                        <div className="flex justify-between items-center">
                            <div className="flex">
                                <Link href="/">
                                    <h1 className="isolate text-l font-semibold">Home</h1>
                                </Link>
                            </div>
                            <div className="flex justify-end p-2">
                                <div className="text-center">
                                    <h1 className="text-l lg:text-2xl font-medium">Checkout: {itemCount}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="grid gap-4">
                    {cart.items.map((item: LineItem) => (
                        <div key={item.id} className="flex flex-col lg:flex-row p-4 lg:p-6 border rounded mt-4 gap-4 bg-white">
                            <div className="flex justify-center lg:mr-6">
                                <Image src={item.thumbnail!} className="w-20 h-26 rounded border" width={1080} height={1350} alt={`Thumbnail of ${item?.title}`} />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div className="mb-4 lg:mb-0">
                                    <span className="text-sm font-medium">{item.title}</span>
                                    <span className="text-sm font-light p-1 text-neutral-500">{item.description}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <button onClick={() => handleQuantityChange(item.id, Math.max((itemQuantities[item.id] || item.quantity) - 1, 1))} className="p-1 border rounded bg-gray-100">
                                            -
                                        </button>
                                        <span className="mx-2">{itemQuantities[item.id] || item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, (itemQuantities[item.id] || item.quantity) + 1)} className="p-1 border rounded bg-gray-100">
                                            +
                                        </button>
                                    </div>
                                    <span className="text-black mr-4">
                                        {formatAmount({amount: item.unit_price * (itemQuantities[item.id] || item.quantity), region: cart.region, includeTaxes: true })}
                                    </span>
                                    <button onClick={() => handleDeleteItem(item.id)} className="text-green-500 hover:text-red-700">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr className="my-5" />
                <div className="text-right grid gap-1.5">
                    <span className="text-sm font-normal text-neutral-500">Subtotal :{" "}
                        <span className="text-black">{
                            formatAmount({ amount: subtotal, region: cart.region, includeTaxes: true })
                        }</span>
                    </span>
                    <span className="text-sm font-normal text-neutral-500">Taxes :{" "}
                        <span className="text-black">{
                            formatAmount({ amount: cart?.tax_total || 0, region: cart.region, includeTaxes: true })
                        }</span>
                    </span>
                    <span className="text-sm font-normal text-neutral-500">Shipping :{" "}
                        <span className="text-black">{
                            formatAmount({ amount: cart?.shipping_total || 0, region: cart.region, includeTaxes: true })
                        }</span>
                    </span>
                    <hr className="my-5" />
                    <span className="text-sm font-normal text-neutral-500">Total :{" "}
                        <span className="text-black">{
                            formatAmount({ amount: subtotal + (cart?.tax_total || 0) + (cart?.shipping_total || 0), region: cart.region, includeTaxes: true })
                        }</span>
                    </span>
                </div>
            </div>
        </>
    )
}

export default Checkout
