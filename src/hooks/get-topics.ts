import { prismaDb } from "@/lib/db";

export async function getTopics() {
    const topics = await prismaDb.topic.findMany({
        include: {
            questions: true,
        },
    });

    return topics;
}
