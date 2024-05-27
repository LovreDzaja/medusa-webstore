"use client"

import { CartProvider, MedusaProvider } from "medusa-react";
import { PropsWithChildren } from "react";

import queryClient from "@/lib/tanstack-query";
import LocalCartProvider from "./_local-cart-provider";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <MedusaProvider queryClientProviderProps={{ client: queryClient }} baseUrl={
            process.env.NEXT_PUBLIC_MEDUSA_API_URL as string
        }>
            <CartProvider>
                <LocalCartProvider>
                    {children}
                </LocalCartProvider>
            </CartProvider>
        </MedusaProvider>
    )
}