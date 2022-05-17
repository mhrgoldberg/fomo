import styled from "styled-components"

interface TileProps {
  id: string
  draggable: boolean
  toggleDisplay: ToggleDisplayType
  dragging: DraggingStateType
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
  const tileID: string = props.id

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("tileId", tileID)

    setTimeout(() => {
      props.toggleDisplay(tileID)
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
      display={props.dragging[tileID]}
    >
      {props.children}
    </StyledDiv>
  )
}

export default Tile
