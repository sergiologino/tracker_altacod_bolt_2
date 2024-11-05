import React from 'react';
import { User, Project } from '../types';

interface FilterBarProps {
  users: User[];
  projects: Project[];
  selectedAssignees: string[];
  selectedProjects: string[];
  onAssigneesChange: (assignees: string[]) => void;
  onProjectsChange: (projects: string[]) => void;
}

export function FilterBar({
  users,
  projects,
  selectedAssignees,
  selectedProjects,
  onAssigneesChange,
  onProjectsChange,
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Assignee</h3>
        <div className="flex flex-wrap gap-2">
          {users.map(user => (
            <label
              key={user.id}
              className="inline-flex items-center"
            >
              <input
                type="checkbox"
                checked={selectedAssignees.includes(user.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onAssigneesChange([...selectedAssignees, user.id]);
                  } else {
                    onAssigneesChange(selectedAssignees.filter(id => id !== user.id));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">{user.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Project</h3>
        <div className="flex flex-wrap gap-2">
          {projects.map(project => (
            <label
              key={project.id}
              className="inline-flex items-center"
            >
              <input
                type="checkbox"
                checked={selectedProjects.includes(project.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onProjectsChange([...selectedProjects, project.id]);
                  } else {
                    onProjectsChange(selectedProjects.filter(id => id !== project.id));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">{project.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}