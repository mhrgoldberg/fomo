// ? MDN Documentation
import styled from "styled-components"

const Div = styled.div`
  display: flex;
  border: solid white 2px;
  flex-direction: column;
  width: 100%;

  max-width: 300px;

  padding: 15px;
`
interface SlotProps {
  id: string
  children?: React.ReactNode
}

function Slot(props: SlotProps) {
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    // ? DataTransfer object holds dragged-item's data during a drag and drop operation.
    const tileId = e.dataTransfer.getData("tileId") // ? .getData() as a string

    const tile: HTMLElement | null = document.getElementById(tileId)

    // when dropped, append as child to dropzone
    if (tile) e.currentTarget.appendChild(tile)
  }

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  return (
    <Div onDrop={drop} onDragOver={dragOver}>
      <div id={props.id}>{props.children}</div>
    </Div>
  )
}
export default Slot
