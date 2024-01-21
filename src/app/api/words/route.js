import prisma from "@/libs/db";
import { NextResponse } from "next/server";



export const GET = async () => {
    const posts = await prisma.word.findMany()

    return NextResponse.json(posts)
}