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
