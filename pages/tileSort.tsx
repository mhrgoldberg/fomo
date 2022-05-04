// import Head from "next/head"
// import Image from "next/image"
import { HomeIcon, LightningBoltIcon, AcademicCapIcon } from "@heroicons/react/outline"
import styled from "styled-components"
import Slot from "../components/Slot"
import Tile from "../components/Tile"

const Div = styled.div`
  background-color: #213359;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;

  overflow: hidden;
  margin: 0 auto;

  padding: 15px;
`

function TileSort() {
  return (
    <>
      <Div>
        <Slot id="slot1">
          <Tile id="tile1" draggable={true}>
            <HomeIcon color="white" />
          </Tile>
        </Slot>
        <Slot id="slot2">
          <Tile id="tile2" draggable={true}>
            <LightningBoltIcon color="white" />
          </Tile>
        </Slot>
        <Slot id="slot3">
          <Tile id="tile3" draggable={true}>
            <AcademicCapIcon color="white" />
          </Tile>
        </Slot>
      </Div>
    </>
  )
}

export default TileSort
