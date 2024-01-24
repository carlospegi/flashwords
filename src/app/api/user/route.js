import prisma from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {

    const user = await prisma.person.findMany()


    return NextResponse.json(user)
}