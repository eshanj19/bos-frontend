import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./DnDConstants";

/**
 * Your Component
 */
export default function ResourceCanvas(props) {
  const [canvas, setCanvas] = useState({});
  const [{ isOver }, drop] = useDrop({
    accept: acceptedItems(),
    drop: (item, monitor) => dropItem(item, monitor, canvas, setCanvas),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#D3D3D3"
      }}
    >
      {canvas.map(element => {
        return element;
      })}
    </div>
  );
}

function dropItem(item, monitor, canvas, setCanvas) {
  console.log(canvas, setCanvas);

  if (item.type == ItemTypes.DAY) {
    canvas.push("Day");
    setCanvas(canvas);
  }
}

function acceptedItems() {
  return [
    ItemTypes.DAY,
    ItemTypes.SESSION,
    ItemTypes.LABEL,
    ItemTypes.MEASUREMENT
  ];
}
