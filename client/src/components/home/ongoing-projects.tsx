import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '@/components/shared/project-card';
import { Project } from '@/lib/types';

const OngoingProjects: React.FC = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-3">Our Strategic Spheres</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Focus areas that lead our efforts across communities, delivering sustainable impact where it matters most.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">Failed to load projects. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects?.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OngoingProjects;
