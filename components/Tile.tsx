import { useState } from "react"
import styled from "styled-components"

// interface DivProps {
//   isDragging: boolean
// }

interface TileProps {
  id: string
  draggable: boolean
  children?: React.ReactNode
}

function Tile(props: TileProps) {
  const [isDragging, setIsDragging] = useState("block")

  const StyledDiv = styled.div`
    cursor: pointer;
    margin-bottom: 15px;
    padding: 15px 25px;
    display: ${isDragging};
  `

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const { currentTarget } = e

    e.dataTransfer.setData("tileId", currentTarget.id)

    // delay making card invisible so we can drag
    setTimeout(() => {
      // console.log(currentTarget, "***********************************************************")
      setIsDragging("none")
    }, 0)
  }

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <StyledDiv>
      <div id={props.id} onDragStart={dragStart} onDragOver={dragOver} draggable={props.draggable}>
        {props.children}
      </div>
    </StyledDiv>
  )
}

export default Tile
