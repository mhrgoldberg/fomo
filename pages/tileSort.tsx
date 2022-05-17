// import Head from "next/head"
// import Image from "next/image"
import { useState } from "react"
import { HomeIcon, LightningBoltIcon, AcademicCapIcon } from "@heroicons/react/outline"
import styled from "styled-components"
import Slot from "../components/tiles/Slot"
import Tile from "../components/tiles/Tile"

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
`

function TileSort() {
  // numTiles: number
  const [dragging, setDragging] = useState<DraggingStateType>({
    tile1: "block",
    tile2: "block",
    tile3: "block",
  })

  const toggleDisplay: ToggleDisplayType = (tileId: string) => {
    const newState: DraggingStateType = { ...dragging }
    newState[tileId] = newState[tileId] === "block" ? "none" : "block"
    setDragging(newState)
  }

  return (
    <Div>
      <Slot id="slot1" toggleDisplay={toggleDisplay}></Slot>
      <Slot id="slot2" toggleDisplay={toggleDisplay}></Slot>
      <Slot id="slot3" toggleDisplay={toggleDisplay}></Slot>

      <Slot id="bank" toggleDisplay={toggleDisplay}>
        <Tile id="tile1" draggable={true} toggleDisplay={toggleDisplay} dragging={dragging}>
          <HomeIcon color="white" />
        </Tile>
        <Tile id="tile2" draggable={true} toggleDisplay={toggleDisplay} dragging={dragging}>
          <LightningBoltIcon color="white" />
        </Tile>
        <Tile id="tile3" draggable={true} toggleDisplay={toggleDisplay} dragging={dragging}>
          <AcademicCapIcon color="white" />
        </Tile>
      </Slot>
    </Div>
  )
}

export default TileSort
