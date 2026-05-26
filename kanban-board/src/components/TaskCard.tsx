import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../data';

interface Props {
  task: Task;
  index: number;
  // New prop to handle deletion
  deleteTask: (taskId: string) => void; 
}

export function TaskCard({ task, index, deleteTask }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // Added "group" here for the hover effect
          className={`group p-3 rounded shadow-sm border cursor-grab active:cursor-grabbing transition-colors flex justify-between items-start gap-2 ${
            snapshot.isDragging ? 'bg-blue-50 border-blue-400 rotate-2 scale-105' : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <p className="text-sm text-gray-700 break-words w-full">{task.content}</p>
          
          {/* The Delete Button (Visible only on hover) */}
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity px-1 rounded hover:bg-red-50"
            title="Delete task"
          >
            ✕
          </button>
        </div>
      )}
    </Draggable>
  );
}