import { prismaDb } from "@/lib/db";

export async function getSubjects() {
    const subjects = await prismaDb.subject.findMany();

    return subjects;
}

export async function getSubjectById(subjectId: string) {
    try {
        const subject = await prismaDb.subject.findFirst({
            where: {
                id: subjectId,
            },
        });

        return subject;
    } catch (error) {
        console.log("GET_SUBJECT_BY_ID_ERROR", error);
    }
}
