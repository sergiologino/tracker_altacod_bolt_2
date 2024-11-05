import React, { useState } from 'react';
import { LayoutGrid, List, Users, Folders } from 'lucide-react';
import { Task, User, Project } from './types';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskList } from './components/TaskList';
import { NewTaskForm } from './components/NewTaskForm';
import { FilterBar } from './components/FilterBar';

const initialUsers: User[] = [
  { id: '1', name: 'Alice Johnson', avatar: '' },
  { id: '2', name: 'Bob Smith', avatar: '' },
  { id: '3', name: 'Carol Williams', avatar: '' },
];

const initialProjects: Project[] = [
  { id: '1', name: 'Website Redesign', color: '#FFE1E1' },
  { id: '2', name: 'Mobile App', color: '#E1F5FE' },
  { id: '3', name: 'Marketing Campaign', color: '#E8F5E9' },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Research market trends',
      description: 'Analyze current market trends and compile a report',
      status: 'todo',
      createdAt: new Date('2024-03-10'),
      completionDate: new Date('2024-03-20'),
      assigneeId: '1',
      projectId: '1',
    },
    {
      id: '2',
      title: 'Update documentation',
      description: 'Review and update project documentation',
      status: 'in-progress',
      createdAt: new Date('2024-03-11'),
      completionDate: new Date('2024-03-25'),
      assigneeId: '2',
      projectId: '2',
    },
    {
      id: '3',
      title: 'Client presentation',
      description: 'Prepare and deliver client presentation',
      status: 'done',
      createdAt: new Date('2024-03-12'),
      completionDate: new Date('2024-03-15'),
      assigneeId: '3',
      projectId: '3',
    },
  ]);

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [groupBy, setGroupBy] = useState<'none' | 'assignee' | 'project'>('none');
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const filteredTasks = tasks.filter(task => {
    const assigneeMatch = selectedAssignees.length === 0 || 
      (task.assigneeId && selectedAssignees.includes(task.assigneeId));
    const projectMatch = selectedProjects.length === 0 || 
      (task.projectId && selectedProjects.includes(task.projectId));
    return assigneeMatch && projectMatch;
  });

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleAssigneeChange = (taskId: string, assigneeId: string | undefined) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, assigneeId } : task
    ));
  };

  const handleProjectChange = (taskId: string, projectId: string | undefined) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, projectId } : task
    ));
  };

  const handleCompletionDateChange = (taskId: string, date: Date | undefined) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completionDate: date } : task
    ));
  };

  const handleNewTask = (
    title: string, 
    description: string, 
    assigneeId?: string,
    projectId?: string
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'todo',
      createdAt: new Date(),
      assigneeId,
      projectId,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setGroupBy(groupBy === 'assignee' ? 'none' : 'assignee')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                    groupBy === 'assignee'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users size={18} />
                  <span className="text-sm font-medium">Group by Assignee</span>
                </button>
                <button
                  onClick={() => setGroupBy(groupBy === 'project' ? 'none' : 'project')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                    groupBy === 'project'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-gray-50 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Folders size={18} />
                  <span className="text-sm font-medium">Group by Project</span>
                </button>
              </div>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 rounded ${
                    viewMode === 'kanban'
                      ? 'bg-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="mb-6 space-y-4">
          <NewTaskForm 
            onSubmit={handleNewTask} 
            users={initialUsers}
            projects={initialProjects}
          />
          <FilterBar
            users={initialUsers}
            projects={initialProjects}
            selectedAssignees={selectedAssignees}
            selectedProjects={selectedProjects}
            onAssigneesChange={setSelectedAssignees}
            onProjectsChange={setSelectedProjects}
          />
        </div>
        
        {viewMode === 'kanban' ? (
          <KanbanBoard
            tasks={filteredTasks}
            users={initialUsers}
            projects={initialProjects}
            groupBy={groupBy}
            onStatusChange={handleStatusChange}
            onAssigneeChange={handleAssigneeChange}
            onProjectChange={handleProjectChange}
            onCompletionDateChange={handleCompletionDateChange}
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            users={initialUsers}
            projects={initialProjects}
            groupBy={groupBy}
            onStatusChange={handleStatusChange}
            onAssigneeChange={handleAssigneeChange}
            onProjectChange={handleProjectChange}
            onCompletionDateChange={handleCompletionDateChange}
          />
        )}
      </main>
    </div>
  );
}

export default App;