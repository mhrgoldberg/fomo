// ? MDN Documentation
import styled from "styled-components"

const Div = styled.div`
  display: flex;
  border: solid white 2px;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 15px;
  /* overflow: scroll; */
`
interface SlotProps {
  id: string
  children?: React.ReactNode
  toggleDisplay: (tileID: string) => void
}

function Slot(props: SlotProps) {
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    // ? DataTransfer object holds dragged-item's data during a drag and drop operation.
    const tileId = e.dataTransfer.getData("tileId") // ? .getData() as a string
    props.toggleDisplay(tileId)
    const tile: HTMLElement | null = document.getElementById(tileId)

    // when dropped, append as child to dropzone
    if (tile) e.currentTarget.appendChild(tile)
  }

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  return (
    <Div onDrop={drop} onDragOver={dragOver} id={props.id}>
      {props.children}
    </Div>
  )
}
export default Slot
