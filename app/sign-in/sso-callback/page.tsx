import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function Page() {
    return (
        <AuthenticateWithRedirectCallback
            signInUrl={`${process.env.NEXTAUTH_URL}/sign-in`}
            signUpUrl={`${process.env.NEXTAUTH_URL}/sign-up`}
        />
    );
}
