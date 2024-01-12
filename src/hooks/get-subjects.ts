import { prismaDb } from "@/lib/db";

export async function getSubjects() {
    const subjects = await prismaDb.subject.findMany();

    return subjects;
}
