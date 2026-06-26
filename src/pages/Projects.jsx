import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    { id: 1, name: "BOSS v3", taskCount: 12, status: "Active" },
    { id: 2, name: "FlowStack UI", taskCount: 8, status: "Active" },
    { id: 3, name: "Supabase Migration", taskCount: 5, status: "Paused" }
  ]);

  const handleAddProject = () => {
    const name = prompt("Enter project name:");
    if (name && name.trim()) {
      const newProject = {
        id: Date.now(),
        name: name.trim(),
        taskCount: 0,
        status: "Active"
      };
      setProjects([...projects, newProject]);
    }
  };

  const handleOpenBoard = (projectId) => {
    navigate("/board");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <button
            onClick={handleAddProject}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-sky-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    project.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-gray-400 text-sm">Tasks:</span>
                <span className="bg-gray-800 text-sky-400 px-2 py-1 rounded text-sm font-medium">
                  {project.taskCount}
                </span>
              </div>

              <button
                onClick={() => handleOpenBoard(project.id)}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Open Board
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}