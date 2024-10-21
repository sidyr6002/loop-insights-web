"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
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

export default function SignUpPage() {
    return (
        <div className="min-h-svh grid w-full grow items-center px-4 sm:justify-center bg-zinc-50">
            <SignUp.Root>
                <Clerk.Loading>
                    {(isGlobalLoading) => (
                        <>
                            <SignUp.Step name="start">
                            <Card className="w-full sm:w-96 px-2 py-4 rounded-3xl border-none bg-transparent shadow-lg shadow-zinc-300/65">
                                    <CardHeader>
                                        <CardTitle>
                                            Create your account
                                        </CardTitle>
                                        <CardDescription>
                                            Welcome! Please fill in the details to get started.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <div className="grid grid-cols-2 gap-x-4">
                                            <Clerk.Connection name="github" asChild >
                                                <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading} className="rounded-full border border-blue-700 bg-zinc-50 hover:bg-blue-700/90 text-blue-700 hover:text-zinc-50 shadow-md shadow-blue-400/60 transition">
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
                                                <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading} className="rounded-full border border-blue-700 bg-zinc-50 hover:bg-blue-700/90 text-blue-700 hover:text-zinc-50 shadow-md shadow-blue-400/60 transition">
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
                                        <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                                            or
                                        </p>
                                        <Clerk.Field name="emailAddress" className="space-y-2" >
                                            <Clerk.Label asChild>
                                                <Label>Email address</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="email" required asChild>
                                                <Input className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 rounded-full shadow-inner shadow-black/20"/>
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>
                                        <Clerk.Field name="password" className="space-y-2" >
                                            <Clerk.Label asChild>
                                                <Label>Password</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="password" required asChild>
                                                <Input className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 rounded-full shadow-inner shadow-black/20"/>
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignUp.Captcha className="empty:hidden" />
                                            <SignUp.Action submit asChild>
                                                <Button disabled={isGlobalLoading} className="rounded-full bg-blue-700 hover:bg-blue-700/80 text-zinc-100 hover:text-zinc-50">
                                                    <Clerk.Loading>
                                                        {(isLoading) => {
                                                            return isLoading ? (
                                                                <Icons.spinner className="size-4 animate-spin" />
                                                            ) : (
                                                                "Sign Up"
                                                            );
                                                        }}
                                                    </Clerk.Loading>
                                                </Button>
                                            </SignUp.Action>
                                            <Button variant="link" size="sm" asChild>
                                                <Link href="/sign-in">
                                                    Already have an account?
                                                    Sign in
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignUp.Step>

                            <SignUp.Step name="continue">
                                <Card className="w-full sm:w-96 rounded-3xl px-2 py-4">
                                    <CardHeader>
                                        <CardTitle>
                                            Continue registration
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <Clerk.Field name="username" className="space-y-2">
                                            <Clerk.Label>
                                                <Label className="text-xs font-bold text-neutral-500/85">Username</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="text" required asChild>
                                                <Input className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 rounded-full shadow-inner shadow-black/20"/>
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive"/>
                                        </Clerk.Field>
                                        <Clerk.Field name="firstName" className="space-y-2">
                                            <Clerk.Label>
                                                <Label className="text-xs font-bold text-neutral-500/85">First Name</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="text" required asChild>
                                                <Input className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 rounded-full shadow-inner shadow-black/20"/>
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive"/>
                                        </Clerk.Field>
                                        <Clerk.Field name="lastName" className="space-y-2">
                                            <Clerk.Label>
                                                <Label className="text-xs font-bold text-neutral-500/85">Last Name</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="text" required asChild>
                                                <Input className="focus-visible:ring-blue-500 focus-visible:ring-offset-0 rounded-full shadow-inner shadow-black/20"/>
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive"/>
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignUp.Action submit asChild>
                                                <Button disabled={isGlobalLoading} className="rounded-full bg-blue-700 hover:bg-blue-700/80 text-zinc-100 hover:text-zinc-50">
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
                                            </SignUp.Action>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignUp.Step>

                            <SignUp.Step name="verifications">
                                <SignUp.Strategy name="email_code">
                                    <Card className="w-full sm:w-96 rounded-3xl px-2 py-4">
                                        <CardHeader>
                                            <CardTitle>
                                                Verify your email
                                            </CardTitle>
                                            <CardDescription>
                                                Use the verification link sent
                                                to your email address
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <div className="grid items-center justify-center gap-y-2">
                                                <Clerk.Field name="code" className="space-y-2" >
                                                    <Clerk.Label className="sr-only">
                                                        Email address
                                                    </Clerk.Label>
                                                    <div className="flex justify-center text-center">
                                                        <Clerk.Input type="otp" className="flex justify-center has-[:disabled]:opacity-50" autoSubmit
                                                            render={({ value, status }) => {
                                                                return (
                                                                    <div
                                                                        data-status={ status }
                                                                        className={cn(
                                                                            "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                                                            {
                                                                                "z-10 ring-2 ring-ring ring-offset-background ring-blue-500":
                                                                                    status === "cursor" ||
                                                                                    status === "selected",
                                                                            }
                                                                        )}
                                                                    >
                                                                        {value}
                                                                        {status ===
                                                                            "cursor" && (
                                                                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                                                <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                    <Clerk.FieldError className="block text-center text-sm text-destructive" />
                                                </Clerk.Field>

                                                <SignUp.Action asChild resend className="text-muted-foreground"
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
                                                    <Button type="button" variant="link" size="sm" >
                                                        Didn&apos;t receive a
                                                        code? Resend
                                                    </Button>
                                                </SignUp.Action>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <div className="grid w-full gap-y-4">
                                                <SignUp.Action submit asChild>
                                                    <Button disabled={isGlobalLoading} className="rounded-full bg-blue-700 hover:bg-blue-700/80 text-zinc-100 hover:text-zinc-50">
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
                                                </SignUp.Action>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignUp.Strategy>
                            </SignUp.Step>
                        </>
                    )}
                </Clerk.Loading>
            </SignUp.Root>
        </div>
    );
}
