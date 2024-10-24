"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export default function SignInPage() {
    return (
        <div className="min-h-svh grid w-full grow items-center px-4 sm:justify-center bg-zinc-50">
            <SignIn.Root>
                <Clerk.Loading>
                    {(isGlobalLoading) => (
                        <>
                            <SignIn.Step name="start">
                                <Card className="w-full sm:w-96 px-2 py-4 rounded-3xl border-none bg-transparent shadow-lg shadow-zinc-300/65">
                                    <CardHeader className="mb-4 text-center">
                                        <CardTitle>
                                            Sign in to Loop Insights
                                        </CardTitle>
                                        <CardDescription>
                                            Welcome back! Please sign in to continue
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <div className="grid grid-cols-2 gap-x-4">
                                            <Clerk.Connection name="github" asChild >
                                                <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading} className="rounded-full border border-blue-700 bg-zinc-50 hover:bg-blue-700/90 text-blue-700 hover:text-zinc-50 shadow-md shadow-blue-400/60 transition" >
                                                    <Clerk.Loading scope="provider:github">
                                                        {(isLoading) =>
                                                            isLoading ? (
                                                                <Icons.spinner className="size-4 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <Icons.gitHub className="mr-2 size-4" />
                                                                    GitHub
                                                                </>
                                                            )
                                                        }
                                                    </Clerk.Loading>
                                                </Button>
                                            </Clerk.Connection>
                                            <Clerk.Connection name="google" asChild >
                                                <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading} className="rounded-full border border-blue-700 bg-zinc-50 hover:bg-blue-700/90 text-blue-700 hover:text-zinc-50 shadow-md shadow-blue-400/60 transition" >
                                                    <Clerk.Loading scope="provider:google">
                                                        {(isLoading) =>
                                                            isLoading ? (
                                                                <Icons.spinner className="size-4 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <Icons.google className="mr-2 size-4" />
                                                                    Google
                                                                </>
                                                            )
                                                        }
                                                    </Clerk.Loading>
                                                </Button>
                                            </Clerk.Connection>
                                        </div>
                                        <p className="flex items-center gap-x-3 text-sm font-medium text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                                            or
                                        </p>
                                        <Clerk.Field name="identifier" className="space-y-2"
                                        >
                                            <Clerk.Label asChild>
                                                <Label>Email address</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="email" required asChild>
                                                <Input className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 rounded-full shadow-inner shadow-black/20" />
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignIn.Action submit asChild>
                                                <Button disabled={isGlobalLoading} className="rounded-full bg-blue-700 hover:bg-blue-700/80 text-zinc-100 hover:text-zinc-50">
                                                    <Clerk.Loading>
                                                        {(isLoading) => {
                                                            return isLoading ? (
                                                                <Icons.spinner className="size-4 animate-spin" />
                                                            ) : (
                                                                "Sign In"
                                                            );
                                                        }}
                                                    </Clerk.Loading>
                                                </Button>
                                            </SignIn.Action>

                                            <Button
                                                variant="link"
                                                size="sm"
                                                asChild
                                            >
                                                <Link href="/sign-up">
                                                    Don&apos;t have an account?
                                                    Sign up
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignIn.Step>

                            <SignIn.Step name="choose-strategy">
                                <Card className="w-full sm:w-96 rounded-3xl px-2 py-4">
                                    <CardHeader>
                                        <CardTitle>
                                            Use another method
                                        </CardTitle>
                                        <CardDescription>
                                            Facing issues? You can use any of
                                            these methods to sign in.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <SignIn.SupportedStrategy name="email_code" asChild>
                                            <Button type="button" variant="link" disabled={isGlobalLoading}>
                                                Email code
                                            </Button>
                                        </SignIn.SupportedStrategy>
                                        <SignIn.SupportedStrategy name="password" asChild >
                                            <Button type="button" variant="link" disabled={isGlobalLoading}>
                                                Password
                                            </Button>
                                        </SignIn.SupportedStrategy>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignIn.Action navigate="previous" asChild>
                                                <Button disabled={isGlobalLoading} className="rounded-full bg-blue-700 hover:bg-blue-700/80 text-zinc-100 hover:text-zinc-50">
                                                    <Clerk.Loading>
                                                        {(isLoading) => {
                                                            return isLoading ? (
                                                                <Icons.spinner className="size-4 animate-spin" />
                                                            ) : (
                                                                "Go back"
                                                            );
                                                        }}
                                                    </Clerk.Loading>
                                                </Button>
                                            </SignIn.Action>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignIn.Step>

                            <SignIn.Step name="verifications">
                                <SignIn.Strategy name="password">
                                    <Card className="w-full sm:w-96 rounded-3xl px-2 py-4">
                                        <CardHeader>
                                            <CardTitle>
                                                Enter your password
                                            </CardTitle>
                                            <CardDescription>
                                                Enter the verification code sent
                                                to your email
                                            </CardDescription>
                                            <p className="text-sm text-muted-foreground">
                                                Welcome back{" "}
                                                <SignIn.SafeIdentifier />
                                            </p>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <Clerk.Field name="password" className="space-y-2" >
                                                <Clerk.Label asChild>
                                                    <Label>Password</Label>
                                                </Clerk.Label>
                                                <Clerk.Input type="password" asChild>
                                                    <Input className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 rounded-full shadow-inner shadow-black/20"/>
                                                </Clerk.Input>
                                                <Clerk.FieldError className="block text-sm text-destructive" />
                                            </Clerk.Field>
                                        </CardContent>
                                        <CardFooter>
                                            <div className="grid w-full gap-y-4">
                                                <SignIn.Action submit asChild>
                                                    <Button disabled={isGlobalLoading} className="rounded-full bg-blue-700 hover:bg-blue-700/90 text-zinc-100 hover:text-zinc-50">
                                                        <Clerk.Loading>
                                                            {(isLoading) => {
                                                                return isLoading ? (
                                                                    <Icons.spinner className="size-4 animate-spin" />
                                                                ) : (
                                                                    "Continue"
                                                                );
                                                            }}
                                                        </Clerk.Loading>
                                                    </Button>
                                                </SignIn.Action>
                                                <SignIn.Action navigate="choose-strategy" asChild>
                                                    <Button type="button"size="sm"variant="link">
                                                        Use another method
                                                    </Button>
                                                </SignIn.Action>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignIn.Strategy>

                                <SignIn.Strategy name="email_code">
                                    <Card className="w-full sm:w-96 rounded-3xl px-2 py-4">
                                        <CardHeader>
                                            <CardTitle>
                                                Check your email
                                            </CardTitle>
                                            <CardDescription>
                                                Enter the verification code sent to your email
                                            </CardDescription>
                                            <p className="text-sm text-muted-foreground">
                                                Welcome back{" "}
                                                <SignIn.SafeIdentifier />
                                            </p>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <Clerk.Field name="code">
                                                <Clerk.Label className="sr-only">
                                                    Email verification code
                                                </Clerk.Label>
                                                <div className="grid gap-y-2 items-center justify-center">
                                                    <div className="flex justify-center text-center">
                                                        <Clerk.Input type="otp" autoSubmit className="flex justify-center has-[:disabled]:opacity-50"
                                                            render={({ value, status }) => {
                                                                return (
                                                                    <div
                                                                        data-status={ status }
                                                                        className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-inner transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=selected]:ring-blue-600 data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring data-[status=cursor]:ring-blue-600"
                                                                    >
                                                                        {value}
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                    <Clerk.FieldError className="block text-sm text-destructive text-center" />
                                                    <SignIn.Action asChild resend className="text-muted-foreground"
                                                        fallback={({ resendableAfter }) => (
                                                            <Button variant="link" size="sm" disabled >
                                                                Resend code in (
                                                                <span className="tabular-nums">
                                                                    {resendableAfter}
                                                                </span> 
                                                                ) second(s).
                                                            </Button>
                                                        )}
                                                    >
                                                        <Button variant="link" size="sm">
                                                            Didn&apos;t receive
                                                            a code? Resend
                                                        </Button>
                                                    </SignIn.Action>
                                                </div>
                                            </Clerk.Field>
                                        </CardContent>
                                        <CardFooter>
                                            <div className="grid w-full gap-y-4">
                                                <SignIn.Action submit asChild>
                                                    <Button disabled={ isGlobalLoading } className="rounded-full bg-blue-700 hover:bg-blue-700/80 text-zinc-100 hover:text-zinc-50">
                                                        <Clerk.Loading>
                                                            {(isLoading) => {
                                                                return isLoading ? (
                                                                    <Icons.spinner className="size-4 animate-spin" />
                                                                ) : (
                                                                    "Continue"
                                                                );
                                                            }}
                                                        </Clerk.Loading>
                                                    </Button>
                                                </SignIn.Action>
                                                <SignIn.Action navigate="choose-strategy" asChild >
                                                    <Button size="sm" variant="link" >
                                                        Use another method
                                                    </Button>
                                                </SignIn.Action>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignIn.Strategy>
                            </SignIn.Step>
                        </>
                    )}
                </Clerk.Loading>
            </SignIn.Root>
        </div>
    );
}
