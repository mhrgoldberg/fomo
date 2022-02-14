import Head from "next/head"
import Image from "next/image"
import styled from "styled-components"

const Div = styled.div`
  background-color: #ca4848;
  /* height: fit-content; */
  min-width: 100vw;
  min-height: 100vh;
  /* width: 100%; */
  /* height: 100%; */
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
            <Image src="/vercel.svg" alt="Vercel Logo" width={200} height={100} />
          </span>
        </footer>
      </Div>
    </>
  )
}

export default Home
