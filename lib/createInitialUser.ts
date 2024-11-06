import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

const createInitialUser = async () => {
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

        if (existingUser) {
            return existingUser;
        }

        const newUser = await prisma.user.create({
            data: {
                name: user.firstName + " " + user.lastName,
                email: user.emailAddresses[0].emailAddress,
            },
        });

        return newUser;
    } catch (error) {
        console.error("[createInitialUser] Error: ", error);

        return null;
    }
};

export default createInitialUser;
