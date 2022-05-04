// import Head from "next/head"
// import Image from "next/image"
import { HomeIcon, LightningBoltIcon, AcademicCapIcon } from "@heroicons/react/outline"
import styled from "styled-components"
import Slot from "../components/Slot"
import Tile from "../components/Tile"

const Div = styled.div`
  background-color: #213359;
  display: grid;
  grid-template-areas:
    "answer1 answer2 answer3"
    "bank bank bank";
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 1fr 1fr;
  #slot1 {
    grid-area: "answer1";
  }
  #slot2 {
    grid-area: "answer2";
  }
  #slot3 {
    grid-area: "answer3";
  }

  #bank {
    grid-area: "bank";
  }
  /* width: 100vw;
  height: 100vh; */

  /* overflow: hidden;
  margin: 0 auto; */

  /* padding: 15px; */
`

function TileSort() {
  return (
    <Div>
      <Slot id="slot1"></Slot>
      <Slot id="slot2"></Slot>
      <Slot id="slot3"></Slot>

      <Slot id="bank">
        <Tile id="tile1" draggable={true}>
          <HomeIcon color="white" />
        </Tile>
        <Tile id="tile2" draggable={true}>
          <LightningBoltIcon color="white" />
        </Tile>
        <Tile id="tile3" draggable={true}>
          <AcademicCapIcon color="white" />
        </Tile>
      </Slot>
    </Div>
  )
}

export default TileSort
