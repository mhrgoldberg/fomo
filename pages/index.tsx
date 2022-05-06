import Head from "next/head"
import styled from "styled-components"

const Div = styled.div`
  background-color: white;
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
      </Div>
    </>
  )
}

export default Home
