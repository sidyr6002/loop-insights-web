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
import { Icons } from "@/components/ui/icons";

export default function SignUpPage() {
    return (
        <div className="min-h-svh grid w-full grow items-center px-4 sm:justify-center bg-zinc-50">
            <SignUp.Root>
                <Clerk.Loading>
                    {(isGlobalLoading) => (
                        <>
                            <SignUp.Step name="start">
                            <Card className="w-full sm:w-96 px-2 py-4 rounded-3xl border-none bg-transparent shadow-lg shadow-zinc-300/65">
                                    <CardHeader className="mb-4 text-center">
                                        <CardTitle>
                                            Create your account
                                        </CardTitle>
                                        <CardDescription>
                                            Welcome! Please fill in the details to get started.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                            <Clerk.Connection name="github" asChild >
                                                <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading} className="rounded-full w-full text-base py-5 border border-blue-700 bg-blue-700 text-zinc-100 hover:bg-zinc-100 hover:text-blue-700 transition" >
                                                    <Clerk.Loading scope="provider:github">
                                                        {(isLoading) =>
                                                            isLoading ? (
                                                                <Icons.spinner className="size-4 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <Icons.gitHub className="mr-2 size-4" />
                                                                    Github
                                                                </>
                                                            )
                                                        }
                                                    </Clerk.Loading>
                                                </Button>
                                            </Clerk.Connection>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignUp.Captcha className="empty:hidden" />
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
                        </>
                    )}
                </Clerk.Loading>
            </SignUp.Root>
        </div>
    );
}
