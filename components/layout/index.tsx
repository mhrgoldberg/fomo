import styled from "styled-components"
import Navbar from "./navbar"

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <MainContainer>{children}</MainContainer>
    </>
  )
}
