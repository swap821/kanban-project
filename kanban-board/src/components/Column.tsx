import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import type { Column as ColumnType, Task } from '../data';
import { TaskCard } from './TaskCard';

interface Props {
  column: ColumnType;
  tasks: Task[];
  addTask: (columnId: string, content: string) => void;
  // Two new props!
  deleteTask: (columnId: string, taskId: string) => void;
  deleteColumn: (columnId: string) => void;
}

export function Column({ column, tasks, addTask, deleteTask, deleteColumn }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [taskContent, setTaskContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskContent.trim()) return;
    
    addTask(column.id, taskContent);
    setTaskContent('');
    setIsAdding(false);
  };

  return (
    <div className="bg-gray-100 rounded-xl w-80 min-w-[20rem] flex flex-col max-h-full shrink-0">
      <div className="p-4 font-semibold text-gray-700 flex justify-between items-center group">
        <h2>{column.title}</h2>
        <div className="flex items-center gap-2">
          {/* Delete Column Button */}
          <button 
            onClick={() => deleteColumn(column.id)}
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity px-2 rounded hover:bg-red-50"
            title="Delete list"
          >
            ✕
          </button>
          <span className="text-gray-400 text-sm bg-gray-200 px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-3 flex-1 overflow-y-auto flex flex-col gap-2 min-h-[100px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-200' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index} 
                // We pass the column ID down so App.tsx knows which array to remove it from
                deleteTask={(taskId) => deleteTask(column.id, taskId)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      <div className="p-3 mt-auto border-t border-gray-200">
        {isAdding ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <textarea
              autoFocus
              className="w-full p-2 rounded shadow-sm border border-gray-300 resize-none focus:outline-blue-500 text-sm"
              placeholder="Enter a title for this card..."
              rows={3}
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex items-center gap-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-medium text-sm transition-colors">
                Add card
              </button>
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="text-gray-500 hover:text-gray-700 px-2 py-1"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 w-full text-left p-2 rounded transition-colors"
          >
            <span className="text-xl">+</span> Add a card
          </button>
        )}
      </div>
    </div>
  );
}