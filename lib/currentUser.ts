import { currentUser } from "@clerk/nextjs/server"
import prisma from "./prisma";

const getCurrentUser = async () => {

    try {
        const user = await currentUser();
    
        if (!user) {
            throw new Error("User not logged in.");
        }
    
        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.emailAddresses[0].emailAddress,
            },
        });
    
        if (!existingUser) {
            throw new Error("User not found in database.");
        }
    
        return existingUser;
    } catch (error) {
        console.error("[getCurrentUser] Error: ", error);

        return null;
    }

}

export default getCurrentUser;