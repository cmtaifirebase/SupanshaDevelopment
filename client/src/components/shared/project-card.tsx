import React from 'react';
import { Link } from 'wouter';
import ProgressBar from './progress-bar';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, title, description, category, image, raised, goal, progress } = project;

  // Map category to color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Health': 'bg-red-100 text-red-800',
      'Education': 'bg-blue-100 text-blue-800',
      'Ecocare': 'bg-green-100 text-green-800',
      'Research': 'bg-purple-100 text-purple-800',
      // Default color
      'default': 'bg-gray-100 text-gray-800'
    };
    
    return colors[category] || colors.default;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="p-6">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryColor(category)}`}>
          {category}
        </span>
        <h3 className="font-montserrat font-semibold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="mb-3">
          <ProgressBar progress={progress} />
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Raised: ₹{raised.toLocaleString()}</span>
            <span className="font-medium">Goal: ₹{goal.toLocaleString()}</span>
          </div>
        </div>
        <Link href={`/projects/${id}`} className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors w-full text-center">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
