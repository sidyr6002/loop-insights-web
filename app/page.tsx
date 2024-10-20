import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const { userId } = auth();

    if (!userId) {
        return (
           <div>
              <h1>User not logged in</h1>
              <p>Please <a href="/sign-in" className="text-blue-500">Login</a> to continue</p>
           </div>
        );
    }

    const user = await currentUser()

    return (
        <div className="min-h-svh grid w-full items-center px-4 sm:justify-center">
            <div className="text-center">
                <p>Hello, {userId}</p>
                <p>User Details: {JSON.stringify(user, null, 2)}</p>
                <UserButton appearance={{
                  elements: {
                    userButtonPopoverFooter: 'hidden'
                  }
                }}/>
            </div>
        </div>
    );
}
