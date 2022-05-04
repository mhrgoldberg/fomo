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

interface StyledDivProps {
  id: string
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  draggable: boolean
  display: string
}

const StyledDiv = styled.div<StyledDivProps>`
  cursor: pointer;
  margin-bottom: 15px;
  padding: 15px 25px;
  width: 200px;
  height: 200px;
  display: ${({ display }) => display};
`

function Tile(props: TileProps) {
  const [isDragging, setIsDragging] = useState("block")

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
    <StyledDiv
      id={props.id}
      onDragStart={dragStart}
      onDragOver={dragOver}
      draggable={props.draggable}
      display={isDragging}
    >
      {props.children}
    </StyledDiv>
  )
}

export default Tile
