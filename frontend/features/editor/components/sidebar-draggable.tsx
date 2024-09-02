import { useDraggable } from "@dnd-kit/core";

interface CustomDraggableProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  type: string;
}

const SidebarDraggable = ({
  id,
  className,
  children,
  type,
}: CustomDraggableProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { type },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className={className}>
      {children}
    </div>
  );
};

export default SidebarDraggable;
