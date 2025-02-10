import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Logo from './Logo'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const NoAccessToCart = () => {
    return (
        <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center">
                        <Logo>CStore</Logo>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Login to view your cart item and checkout</p>
                    <SignInButton mode="modal">
                        <Button className="w-full font-semibold">Sign in</Button>
                    </SignInButton>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <p>Don&apos;t have an account?</p>
                    <SignUpButton mode="modal">
                        <Button variant="outline" className="w-full">
                            Sign up
                        </Button>
                    </SignUpButton>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NoAccessToCart
