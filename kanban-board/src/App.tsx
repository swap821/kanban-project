import { useState, useEffect } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { initialData, type BoardData } from './data';
import { Column } from './components/Column';

function App() {
  const [data, setData] = useState<BoardData>(initialData);
  const [isLoading, setIsLoading] = useState(true); // NEW: Keeps UI hidden until DB loads
  
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  // ==========================================
  // FULL STACK MAGIC: GET & POST
  // ==========================================

  // 1. GET: Fetch data from MongoDB when the app loads
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/board`)
      .then((res) => res.json())
      .then((dbData) => {
        // If the database has columns, use the database! 
        // Otherwise, it falls back to our 'initialData' mockup.
        if (dbData.columnOrder && dbData.columnOrder.length > 0) {
          setData(dbData);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch board:", err);
        setIsLoading(false); 
      });
  }, []);

  // 2. POST: Save to MongoDB automatically every time 'data' changes
  useEffect(() => {
    // Prevent saving our default state to the DB before the initial fetch finishes
    if (isLoading) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/board`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((err) => console.error("Failed to save board:", err));
  }, [data, isLoading]);

  // ==========================================
  // CRUD LOGIC (Unchanged)
  // ==========================================

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...startColumn, taskIds: newTaskIds };
      setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...startColumn, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finishColumn, taskIds: finishTaskIds };

    setData({
      ...data,
      columns: { ...data.columns, [newStart.id]: newStart, [newFinish.id]: newFinish },
    });
  };

  const addTask = (columnId: string, content: string) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content };
    const column = data.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    setData({
      ...data,
      tasks: { ...data.tasks, [newTaskId]: newTask },
      columns: { ...data.columns, [columnId]: { ...column, taskIds: newTaskIds } },
    });
  };

  const addColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnTitle.trim()) return;

    const newColumnId = `col-${Date.now()}`;
    const newColumn = { id: newColumnId, title: newColumnTitle, taskIds: [] };

    setData({
      ...data,
      columns: { ...data.columns, [newColumnId]: newColumn },
      columnOrder: [...data.columnOrder, newColumnId],
    });
    
    setNewColumnTitle('');
    setIsAddingColumn(false);
  };

  const deleteTask = (columnId: string, taskId: string) => {
    const column = data.columns[columnId];
    const newTaskIds = column.taskIds.filter(id => id !== taskId);
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    setData({
      ...data,
      tasks: newTasks,
      columns: { ...data.columns, [columnId]: { ...column, taskIds: newTaskIds } }
    });
  };

  const deleteColumn = (columnId: string) => {
    const newColumnOrder = data.columnOrder.filter(id => id !== columnId);
    const newTasks = { ...data.tasks };
    data.columns[columnId].taskIds.forEach(taskId => delete newTasks[taskId]);
    const newColumns = { ...data.columns };
    delete newColumns[columnId];

    setData({ ...data, tasks: newTasks, columns: newColumns, columnOrder: newColumnOrder });
  };

  // NEW: Simple loading screen while we wait for MongoDB
  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">
        Loading your workspace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col font-sans">
      <header className="bg-blue-800/50 text-white p-4 font-bold text-xl shadow-sm backdrop-blur-sm flex justify-between items-center">
        <span>Kanban Board</span>
        <span className="text-sm font-normal bg-green-500/20 text-green-100 px-3 py-1 rounded-full border border-green-500/30">
          Connected to MongoDB
        </span>
      </header>

      <main className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 h-full items-start">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <Column 
                  key={column.id} 
                  column={column} 
                  tasks={tasks} 
                  addTask={addTask} 
                  deleteTask={deleteTask}
                  deleteColumn={deleteColumn}
                />
              );
            })}
            
            <div className="w-80 min-w-[20rem] shrink-0">
              {isAddingColumn ? (
                <form onSubmit={addColumn} className="bg-white p-3 rounded-xl shadow-sm flex flex-col gap-2">
                  <input
                    autoFocus
                    type="text"
                    className="w-full p-2 rounded border border-blue-600 focus:outline-none text-sm"
                    placeholder="Enter list title..."
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-medium text-sm transition-colors">
                      Add list
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsAddingColumn(false)}
                      className="text-gray-500 hover:text-gray-700 px-2 py-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button 
                  onClick={() => setIsAddingColumn(true)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-xl w-full p-4 font-semibold text-left transition-colors flex items-center gap-2 shadow-sm"
                >
                  <span className="text-xl">+</span> Add another list
                </button>
              )}
            </div>
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}

export default App;