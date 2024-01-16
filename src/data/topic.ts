import { prismaDb } from "@/lib/db";

export const getTopicsBySubjectId = async (subjectId: string | undefined) => {
    try {
        const result = await prismaDb.topic.findMany({
            where: {
                subjectId: subjectId,
            },
            include: {
                _count: true,
            },
        });

        const data = result.map(({ _count, ...rest }) => ({
            ...rest,
            totalQuestion: _count.questions,
        }));

        return data;
    } catch (error: any) {
        console.log("GET_TOPIC_BY_SUBJECT_ID", error);
        return null;
    }
};

export const getTopicById = async (topicId: string) => {
    try {
        const topic = await prismaDb.topic.findFirst({
            where: {
                id: topicId,
            },
            include: {
                billboard: {
                    select: {
                        id: true,
                        image: true,
                    },
                },
            },
        });

        return topic;
    } catch (error) {
        console.log("GET_TOPIC_BY_ID_ERROR", error);
        return null;
    }
};
