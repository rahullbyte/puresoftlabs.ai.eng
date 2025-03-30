import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type MistakeInput = {
  sessionId: string;
  userId: string;
  message: string;
  correction: string;
  explanation: string;
};

export const saveMistake = async ({
  sessionId,
  userId,
  message,
  correction,
  explanation,
}: MistakeInput) => {
  return prisma.mistake.create({
    data: {
      sessionId,
      userId,
      message,
      correction,
      explanation,
    },
  });
};

export const getMistakes = async (sessionId: string) => {
  return prisma.mistake.findMany({ where: { sessionId } });
};
