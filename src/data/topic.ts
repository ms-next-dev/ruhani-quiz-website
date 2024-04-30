import { prismaDb } from "@/lib/db";

export const getTopicBySubjectName = async (subjectName: string) => {
  const name = subjectName.split("_").join(" ");
  const subject = await prismaDb.subject.findUnique({
    where: {
      name: name,
    },
  });

  if (!subject) {
    return { error: "Subject doesn't exist!", data: null };
  }
  try {
    const result = await prismaDb.topic.findMany({
      where: {
        subjectId: subject.id,
      },
      include: {
        _count: true,
      },
    });

    const data = result.map(({ _count, ...rest }) => ({
      ...rest,
      totalQuestion: _count.questions,
    }));

    return { success: "Topic retrieved!", data };
  } catch (error: any) {
    console.log("GET_TOPIC_BY_SUBJECT_ID", error);
    return { error: "Failed to retrieve topic!" };
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

export const getTopicByName = async (name: string) => {
  if (!name) {
    return { error: "Topic name not provided!", data: null };
  }

  const preparedName = name.split("_").join(" ");

  try {
    const topic = await prismaDb.topic.findUnique({
      where: {
        name: preparedName,
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
    return { success: "Topic retrieved!", data: topic };
  } catch (error) {
    console.log("GET_TOPIC_BY_NAME_ERROR", error);
    return { error: "Failed to get topic by name!", data: null };
  }
};

export const getAllTopics = async () => {
  const topics = await prismaDb.topic.findMany({
    include: {
      _count: true,
    },
  });

  const data = topics.map(({ _count, ...rest }) => ({
    ...rest,
    totalQuestion: _count.questions,
  }));
  return data;
};
