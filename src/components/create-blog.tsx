// "use client"

// import * as React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { type Product } from "@/db/schema"
// import { toast } from "sonner"

// import { cn, formatPrice } from "@/lib/utils"
// import { AspectRatio } from "@/components/ui/aspect-ratio"
// import { Button, buttonVariants } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Icons } from "@/components/icons"
// import {createBlogAction } from "@/app/_actions/blog"

// interface CreateBlogProps extends React.HTMLAttributes<HTMLDivElement> {
//   variant?: "default" | "switchable"
//   isBlogCreated?: boolean
//   onSwitch?: () => Promise<void>
// }




// <Button
// aria-label="Add to cart"
// size="sm"
// className="h-8 w-full rounded-sm"
// onClick={() => {
//   startTransition(async () => {
//     try {
//       await addToCartAction({
//         productId: product.id,
//         quantity: 1,
//       })
//       toast.success("Added to cart.")
//     } catch (error) {
//       error instanceof Error
//         ? toast.error(error.message)
//         : toast.error("Something went wrong, please try again.")
//     }
//   })
// }}
// disabled={isPending}
// >
// {isPending && (
//   <Icons.spinner
//     className="mr-2 h-4 w-4 animate-spin"
//     aria-hidden="true"
//   />
// )}
// Add to cart
// </Button>