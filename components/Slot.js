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

function Slot(props) {
  const drop = (e) => {
    e.preventDefault()

    // ? DataTransfer object holds dragged-item's data during a drag and drop operation.
    const tileId = e.dataTransfer.getData("tileId") // ? .getData() as a string

    const tile = document.getElementById(tileId)
    console.log(tile)
    tile.display = "block"

    // when dropped, append as child to dropzone
    e.target.appendChild(tile)
  }

  const dragOver = (e) => {
    e.preventDefault()
  }
  return (
    <Div id={props.id} className={props.className} onDrop={drop} onDragOver={dragOver}>
      {props.children}
    </Div>
  )
}
export default Slot
