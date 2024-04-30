import { prismaDb } from "@/lib/db";

export async function getSubjects() {
  const subjects = await prismaDb.subject.findMany();

  return subjects;
}

export async function getSubjectByName(subjectName: string) {
  const name = subjectName.split("_").join(" ");
  try {
    const subject = await prismaDb.subject.findUnique({
      where: {
        name: name,
      },
    });

    return { success: "Subject retrieved successfully!", data: subject };
  } catch (error) {
    console.log("GET_SUBJECT_BY_NAME_ERROR", error);
    return { error: "Could not find subject!", data: null };
  }
}
