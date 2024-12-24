import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useWidgets } from './WidgetContext';

export function WidgetGrid() {
  const { widgets, reorderWidgets, availableWidgets } = useWidgets();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderWidgets(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="widgets">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {widgets
              .filter(widget => widget.visible)
              .map((widget, index) => {
                const WidgetComponent = availableWidgets.find(
                  w => w.type === widget.type
                )?.component;

                if (!WidgetComponent) return null;

                return (
                  <Draggable key={widget.id} draggableId={widget.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <WidgetComponent {...widget.config} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}