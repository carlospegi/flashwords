'use client'
import React, { useEffect, useState } from 'react';

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


async function getUserId() {
    try {

        const user = await fetch('/api/user')
        const rest = await user.json()
        const res = rest.filter(data => data.email === 'aaaa@gmail.com')
        return res[0].id
    } catch (error) {
        return error
    }
}

// list words
async function getWords() {
    try {

        const words = await fetch('/api/words')
        const rest = await words.json()

        return rest
    } catch (error) {
        return error
    }
}

function FlashCards() {
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();


    const [userId, setUserId] = useState(null);
    const [words, setWords] = useState(null);
    const [list, setList] = useState(null);
    const [show, setShow] = useState(true);
    const [count, setCount] = useState(0);


    function handleShow() {
        setShow(false)
    }

    useEffect(() => {
        if (sessionStatus !== "authenticated") {
            router.replace("/auth/register");
        }
    }, [sessionStatus, router]);


    useEffect(() => {
        async function fetchData() {
            const result = await getUserId();
            setUserId(result);
        }

        async function fetchWords() {
            const result = await getWords();
            setWords(result);
        }
        fetchData()
        fetchWords();
    }, []);



    useEffect(() => {

        const filteredWordsUser = words && userId
            ? words.filter(word => word.personId === userId)
            : [];

        const today = new Date();
        const newWords = filteredWordsUser.filter(word => word.box == 0);
        const review = filteredWordsUser.filter(word => word.box == 1);
        const wordsToday = filteredWordsUser.filter(word => new Date(word.nextView).toLocaleDateString() === today.toLocaleDateString());

        if (review.length > 0) {
            setList(review);
        } else if (wordsToday.length > 0) {
            setList(wordsToday);
        } else {
            setList(newWords);
        }
    }, [words, userId]);

    if (list === null || list.length === 0 || count >= list.length) {
        return <p></p>;
    }


    async function handleNext() {

        let idWord = list[count].id
        let boxWord = list[count].box
        let date = new Date()


        switch (boxWord) {
            case 0:
                boxWord = 1
                break;

            case 1:
                boxWord = 2   // review  
                break;

            case 2:
                boxWord = 3
                date.setDate(date.getDate() + 1)
                break;
            case 3:
                boxWord = 4
                date.setDate(date.getDate() + 3)
                break;
            case 4:
                boxWord = 5
                date.setDate(date.getDate() + 8)
                break;
            case 5:
                boxWord = 6
                date.setDate(date.getDate() + 15)
                break;
            case 6:
                boxWord = 7
                date.setDate(date.getDate() + 30)
                break;
            case 7:
                boxWord = 8
                date.setDate(date.getDate() + 60)
                break;

            default:
                break;
        }


        // fetch 

        const res = await fetch(`/api/words/${idWord}`, {
            method: 'PUT',
            body: JSON.stringify({
                text1: list[count].text1,
                text2: list[count].text2,
                faceCard: list[count].faceCard,
                box: Number(boxWord),
                nextView: boxWord > 1 ? date : null
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (list[list.length - 1] === list[count]) {
            alert("Finished")

        }

        setCount(count + 1)
        setShow(true)

    }


    async function handleStart() {

        let idWord = list[count].id

        const res = await fetch(`/api/words/${idWord}`, {
            method: 'PUT',
            body: JSON.stringify({
                text1: list[count].text1,
                text2: list[count].text2,
                faceCard: list[count].faceCard,
                box: 1,
                nextView: null
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (list[list.length - 1] === list[count]) {
            alert("Finished")

        }

        setCount(count + 1)
        setShow(true)

    }

    if (sessionStatus === "loading") {
        return <h1>Loading... X</h1>;
    }

    return (
        sessionStatus === "authenticated" && (
            <div className='min-h-screen w-full bg-gray-800 flex items-center justify-center'>
                <div className="flex flex-col items-center max-w-md mx-auto mt-20 p-6 bg-gray-600 rounded-md shadow-md text-center min-w-[20%]">



                    <div>
                        <div className='pb-2 mb-2 text-white'>{show && list.length >= 1 ? list[count].text2 : list[count].text1}</div>
                        {show && <button onClick={() => handleShow()} className='py-1 px-2 bg-cyan-700 rounded-lg text-white'>Show</button>}
                    </div>

                    {!show &&
                        <div className='w-full flex justify-between m-3'>
                            <button onClick={() => handleStart()} className='py-1 px-2 bg-blue-600 rounded-lg text-white'>Start</button>
                            <button onClick={() => handleNext()} className='py-1 px-2 bg-green-600 rounded-lg text-white'>Next</button>
                        </div>}
                    {session?.user?.email && <p>{session?.user?.email}</p>}
                </div>
            </div>
        ));
}

export default FlashCards;