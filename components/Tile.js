import styled from "styled-components"

const Div = styled.div`
  cursor: pointer;
  margin-bottom: 15px;
  padding: 15px 25px;
`

function Tile(props) {
  const dragStart = (e) => {
    const { target } = e

    e.dataTransfer.setData("tileId", target.id)

    // delay making card invisible so we can drag
    setTimeout(() => {
      // console.log(target, "***********************************************************")
      target.display = "none"
    }, 0)
  }

  const dragOver = (e) => {
    e.stopPropagation()
  }

  return (
    <Div
      id={props.id}
      className={props.className}
      onDragStart={dragStart}
      onDragOver={dragOver}
      draggable={props.draggable}
    >
      {props.children}
    </Div>
  )
}
export default Tile
