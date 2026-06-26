import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const COLUMNS = ["Todo", "In Progress", "Done"];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design landing page", status: "Todo" },
    { id: 2, title: "Set up authentication", status: "Todo" },
    { id: 3, title: "Build API endpoints", status: "In Progress" },
    { id: 4, title: "Write unit tests", status: "In Progress" },
    { id: 5, title: "Deploy to production", status: "Done" },
    { id: 6, title: "Configure CI/CD", status: "Done" },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      status: "Todo",
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const moveTask = (taskId, direction) => {
    setTasks(
      tasks.map((task) => {
        if (task.id !== taskId) return task;
        const currentIndex = COLUMNS.indexOf(task.status);
        const newIndex = currentIndex + direction;
        if (newIndex < 0 || newIndex >= COLUMNS.length) return task;
        return { ...task, status: COLUMNS[newIndex] };
      })
    );
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#0ea5e9]">Kanban Board</h1>

        <div className="mb-8 flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            placeholder="Enter new task..."
            className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0ea5e9]"
          />
          <button
            onClick={addTask}
            className="px-6 py-2 bg-[#0ea5e9] hover:bg-[#0284c7] rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {COLUMNS.map((column) => {
            const columnTasks = getTasksByStatus(column);
            return (
              <div key={column} className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{column}</h2>
                  <span className="bg-[#0ea5e9] text-white text-sm font-bold px-3 py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {columnTasks.map((task) => {
                    const currentIndex = COLUMNS.indexOf(task.status);
                    const canMoveLeft = currentIndex > 0;
                    const canMoveRight = currentIndex < COLUMNS.length - 1;

                    return (
                      <div
                        key={task.id}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                      >
                        <div className="text-gray-100 mb-3">{task.title}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveTask(task.id, -1)}
                            disabled={!canMoveLeft}
                            className={`flex-1 px-3 py-1.5 rounded flex items-center justify-center gap-1 transition-colors ${
                              canMoveLeft
                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                : "bg-gray-900 text-gray-600 cursor-not-allowed"
                            }`}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() => moveTask(task.id, 1)}
                            disabled={!canMoveRight}
                            className={`flex-1 px-3 py-1.5 rounded flex items-center justify-center gap-1 transition-colors ${
                              canMoveRight
                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                : "bg-gray-900 text-gray-600 cursor-not-allowed"
                            }`}
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {columnTasks.length === 0 && (
                    <div className="text-gray-600 text-center py-8 text-sm">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}