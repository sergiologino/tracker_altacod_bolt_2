import React from 'react';
import { Task, User, Project } from '../types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  users: User[];
  projects: Project[];
  groupBy: 'none' | 'assignee' | 'project';
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onAssigneeChange: (taskId: string, assigneeId: string | undefined) => void;
  onProjectChange: (taskId: string, projectId: string | undefined) => void;
  onCompletionDateChange: (taskId: string, date: Date | undefined) => void;
}

export function TaskList({ 
  tasks, 
  users, 
  projects,
  groupBy,
  onStatusChange,
  onAssigneeChange,
  onProjectChange,
  onCompletionDateChange,
}: TaskListProps) {
  if (groupBy === 'none') {
    return (
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            users={users}
            projects={projects}
            onStatusChange={onStatusChange}
            onAssigneeChange={onAssigneeChange}
            onProjectChange={onProjectChange}
            onCompletionDateChange={onCompletionDateChange}
          />
        ))}
      </div>
    );
  }

  const groups = groupBy === 'assignee'
    ? [undefined, ...users.map(u => u.id)]
    : [undefined, ...projects.map(p => p.id)];

  return (
    <div className="space-y-8">
      {groups.map((groupId) => {
        const groupItems = groupBy === 'assignee'
          ? tasks.filter(t => t.assigneeId === groupId)
          : tasks.filter(t => t.projectId === groupId);
        
        if (groupItems.length === 0) return null;

        const groupTitle = groupBy === 'assignee'
          ? users.find(u => u.id === groupId)?.name || 'Unassigned'
          : projects.find(p => p.id === groupId)?.name || 'No Project';

        return (
          <div key={groupId ?? 'unassigned'}>
            <h2 className="font-semibold text-xl text-gray-800 mb-4">
              {groupTitle}
            </h2>
            <div className="space-y-3">
              {groupItems.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  users={users}
                  projects={projects}
                  onStatusChange={onStatusChange}
                  onAssigneeChange={onAssigneeChange}
                  onProjectChange={onProjectChange}
                  onCompletionDateChange={onCompletionDateChange}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}