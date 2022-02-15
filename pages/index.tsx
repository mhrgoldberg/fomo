import Head from "next/head"
import Image from "next/image"
import styled from "styled-components"

const Div = styled.div`
  background-color: #ca4848;

  min-width: 100vw;
  min-height: 100vh;
`

function Home() {
  return (
    <>
      <Head>
        <title>FOMO</title>
        <meta name="description" content="An Atendance App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Div>
        <h1>FOMO</h1>
        <footer>
          <span>
            This is an example on how to use the Image component in Next.js.
            <Image src="/vercel.svg" alt="Vercel Logo" width={200} height={100} />
          </span>
        </footer>
      </Div>
    </>
  )
}

export default Home
