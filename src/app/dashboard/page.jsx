import prisma from '@/libs/db'
import React from 'react'
import Link from 'next/link'




const email = "aaaa@gmail.com"  // pasar email de session 

export async function getUserId() {
    const user = await prisma.person.findUnique({
        where: {
            email: email
        }
    })

    return user.id
}




export const userId = await getUserId()


async function Dashboard() {
    const user = await getUserId()
    console.log(user)

    { user < 0 && "loading ..." }
    return (
        <div>{user.email}
            <Link href='/flashCards'>FLASH</Link>
            <button>dale</button>
        </div>
    )
}

export default Dashboard 