import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cause } from '@/lib/types';
import DonateCard from '@/components/shared/donate-card';
import ProjectCard from '@/components/shared/project-card';

const Causes: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const { data: causes, isLoading: causesLoading } = useQuery<Cause[]>({
    queryKey: ['/api/causes'],
  });

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  const isLoading = causesLoading || projectsLoading;

  const getCategoryCauses = (category: string) => {
    if (category === 'all') return causes;
    return causes?.filter(cause => cause.category === category);
  };

  const getCategoryProjects = (category: string) => {
    if (category === 'all') return projects;
    return projects?.filter(project => project.category === category);
  };

  return (
    <>
      <Helmet>
        <title>Our Causes - Supansha Development Foundation</title>
        <meta name="description" content="Support our active causes and campaigns. Donate to uplift communities and create lasting change through health, education, and environmental initiatives." />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Our Causes & Campaigns</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Support initiatives that create lasting impact. Each donation brings us closer to a more equitable and sustainable future.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">Transform Lives With Your Support</h2>
            <p className="text-gray-700">
              Our causes and projects address critical needs across health, education, environment, and community development. 
              Choose a cause that resonates with you and join us in creating meaningful change.
            </p>
          </div>

          <Tabs defaultValue="causes" className="mb-12">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="causes">Donation Campaigns</TabsTrigger>
                <TabsTrigger value="projects">Ongoing Projects</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="causes">
              <div className="mb-8">
                <div className="flex justify-center mb-6">
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button 
                      onClick={() => setActiveTab('all')}
                      className={`py-2 px-4 text-sm font-medium rounded-l-lg ${
                        activeTab === 'all' 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      All Causes
                    </button>
                    <button 
                      onClick={() => setActiveTab('health')}
                      className={`py-2 px-4 text-sm font-medium ${
                        activeTab === 'health' 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Health
                    </button>
                    <button 
                      onClick={() => setActiveTab('education')}
                      className={`py-2 px-4 text-sm font-medium ${
                        activeTab === 'education' 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Education
                    </button>
                    <button 
                      onClick={() => setActiveTab('environment')}
                      className={`py-2 px-4 text-sm font-medium rounded-r-lg ${
                        activeTab === 'environment' 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Environment
                    </button>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="bg-gray-900 py-12 px-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {causes && getCategoryCauses(activeTab)?.map(cause => (
                      <DonateCard key={cause.id} cause={cause} />
                    ))}
                    {causes && getCategoryCauses(activeTab)?.length === 0 && (
                      <div className="col-span-3 text-center text-white py-8">
                        <p className="text-xl">No causes found in this category.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="projects">
              <div className="mb-8">
                <div className="flex justify-center mb-6">
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button 
                      onClick={() => setActiveTab('all')}
                      className={`py-2 px-4 text-sm font-medium rounded-l-lg ${
                        activeTab === 'all' 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      All Projects
                    </button>
                    <button 
                      onClick={() => setActiveTab('Health')}
                      className={`py-2 px-4 text-sm font-medium ${
                        activeTab === 'Health' 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Health
                    </button>
                    <button 
                      onClick={() => setActiveTab('Education')}
                      className={`py-2 px-4 text-sm font-medium ${
                        activeTab === 'Education' 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Education
                    </button>
                    <button 
                      onClick={() => setActiveTab('Ecocare')}
                      className={`py-2 px-4 text-sm font-medium ${
                        activeTab === 'Ecocare' 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Ecocare
                    </button>
                    <button 
                      onClick={() => setActiveTab('Research')}
                      className={`py-2 px-4 text-sm font-medium rounded-r-lg ${
                        activeTab === 'Research' 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Research
                    </button>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {projects && getCategoryProjects(activeTab)?.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                  {projects && getCategoryProjects(activeTab)?.length === 0 && (
                    <div className="col-span-4 text-center py-8">
                      <p className="text-xl text-gray-700">No projects found in this category.</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Impact Numbers */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-16">
            <h2 className="text-3xl font-montserrat font-bold mb-8 text-center">Our Impact So Far</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">12,500+</div>
                <div className="text-gray-700">Lives Impacted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-gray-700">Villages Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">₹6.8M</div>
                <div className="text-gray-700">Funds Raised</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">43</div>
                <div className="text-gray-700">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-montserrat font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">How are donations used?</h3>
                <p className="text-gray-700">
                  Your donations go directly to the specific cause you choose to support. A small 
                  percentage (not exceeding 10%) goes toward administrative costs to ensure effective 
                  program management and impact assessment.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">Are donations tax-deductible?</h3>
                <p className="text-gray-700">
                  Yes, all donations to Supansha Development Foundation are eligible for tax deductions 
                  under Section 80G of the Indian Income Tax Act. We provide donation receipts that can 
                  be used for tax filing purposes.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">Can I donate to a specific project?</h3>
                <p className="text-gray-700">
                  Absolutely! You can choose a specific project or cause to support. When making your 
                  donation, simply select the project you want to contribute to from the dropdown menu.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-montserrat font-semibold mb-2">How do I know my donation is making an impact?</h3>
                <p className="text-gray-700">
                  We regularly share impact reports, success stories, and project updates on our website 
                  and through email newsletters. Donors receive updates on the specific projects they've 
                  supported so they can see firsthand how their contributions are making a difference.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-montserrat font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Your contribution, no matter the size, helps us create lasting change in communities that need it most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/donate" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition-colors">
                Donate Now
              </a>
              <a href="/volunteer" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-md font-medium transition-colors">
                Become a Volunteer
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Causes;
