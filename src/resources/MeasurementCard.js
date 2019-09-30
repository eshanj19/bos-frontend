import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./DnDConstants";

/**
 * Your Component
 */
export default function MeasurementCard({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.MEASUREMENT, text },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  );
}
