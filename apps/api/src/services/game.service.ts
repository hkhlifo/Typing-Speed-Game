import { GraphQLError } from "graphql";
import { z } from "zod";
import prisma from "../lib/prisma";

const TOTAL_CHARACTERS = 20;
const PENALTY_PER_WRONG_ATTEMPT = 0.5;

const saveGameResultSchema = z.object({
    completionTime: z
        .number()
        .positive("Completion time must be greater than 0"),

    correctCharacters: z
        .number()
        .int()
        .refine(
            (value) => value === TOTAL_CHARACTERS,
            `A completed game must contain exactly ${TOTAL_CHARACTERS} correct characters`,
        ),

    wrongAttempts: z
        .number()
        .int()
        .min(0, "Wrong attempts cannot be negative"),

    sequence: z
        .string()
        .length(
            TOTAL_CHARACTERS,
            `Sequence must contain exactly ${TOTAL_CHARACTERS} characters`,
        ),
});

export async function saveGameResult(
    userId: string,
    input: unknown,
) {
    const data = saveGameResultSchema.parse(input);

    const penaltyTime =
        data.wrongAttempts * PENALTY_PER_WRONG_ATTEMPT;

    const finalTime =
        data.completionTime + penaltyTime;

    const result = await prisma.gameResult.create({
        data: {
            userId,
            completionTime: data.completionTime,
            correctCharacters: data.correctCharacters,
            wrongAttempts: data.wrongAttempts,
            penaltyTime,
            finalTime,
            sequence: data.sequence,
        },
    });

    return result;
}

export async function getGameHistory(userId: string) {
    return prisma.gameResult.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getBestScore(userId: string) {
    return prisma.gameResult.findFirst({
        where: {
            userId,
        },
        orderBy: {
            finalTime: "asc",
        },
    });
}

export async function getLeaderboard(limit = 10) {
    return prisma.gameResult.findMany({
        distinct: ["userId"],
        orderBy: {
            finalTime: "asc",
        },
        take: limit,
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
    });
}