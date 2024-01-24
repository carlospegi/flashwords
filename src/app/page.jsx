import prisma from "@/libs/db";

async function getWords() {
  const posts = await prisma.word.findMany()

  return posts
}
const words = await getWords();

async function Home() {


  return (
    <main className="bg-indigo-500 flex h-screen justify-center items-center   ">

      <div className=" w-[95%] bg-blue-600 flex h-[80%] rounded-4xl opacity-50" >

        <div className="flex w-[40%] justify-center items-center" >Description </div>
        <div className="flex w-[60%] justify-center items-center" >IMG</div>

      </div>

    </main>
  );
}


export default Home