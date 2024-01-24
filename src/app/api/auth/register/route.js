import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/db";


export async function POST(request) {
    try {
        const data = await request.json();
        console.log(data, "api")
        const userFound = await prisma.person.findUnique({
            where: {
                email: data.email,
            },
        });

        if (userFound) {
            return NextResponse.json(
                {
                    message: "Email already exists",
                },
                {
                    status: 400,
                }
            );
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.person.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
                words: {},
                sentence: {},
                mining: {},
            },
        });

        const { password: _, ...user } = newUser;

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}