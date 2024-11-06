import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Home() {
    const user = await currentUser();

    if (user) {
        return redirect("/dashboard");
    }
    return redirect("/home");
}

export default Home;
