import { useDraggable } from "@dnd-kit/react";

export function DraggableButton() {
  const { ref } = useDraggable({
    id: "draggable",
  });

  return <button ref={ref} className="p-3 hover:cursor-grab">Draggable</button>;
}
