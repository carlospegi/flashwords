import prisma from "@/libs/db"
import { NextResponse } from "next/server"

export async function PUT(request, { params }) {

    try {
        const { tex1, text2, faceCard, box, nextView } = await request.json()


        const updateWord = await prisma.word.update({
            where: {
                id: Number(params.id)
            },
            data: {
                tex1,
                text2,
                faceCard,
                box,
                nextView
            }

        })
        return NextResponse.json("updated")

    } catch (error) {
        console.error("Error al actualizar word", error)
        NextResponse.json({ error: "error al actualizar word" }, { status: 500 })
    }

}