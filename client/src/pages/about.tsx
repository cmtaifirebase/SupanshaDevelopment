import React from 'react';
import { Helmet } from 'react-helmet';
import { Tab } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const About: React.FC = () => {
  const categories = [
    'Structure & Spirit',
    'Strategic Spheres',
    'Served Communities',
    'Supansha Squad'
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Supansha Development Foundation</title>
        <meta name="description" content="Learn about Supansha's mission, vision, values, and the team behind our transformation efforts." />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Structure & Spirit</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Supansha Development Foundation Delivering Sustainable Choices Empowering Communities | Fostering Growth | Driving Sustainable Impact
          </p>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl mb-8">
              {categories.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm leading-5 font-medium rounded-lg',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary ring-primary ring-opacity-60',
                      selected
                        ? 'bg-primary text-white shadow'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {/* Structure & Spirit */}
              <Tab.Panel className="p-3">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-montserrat font-bold mb-6">Welcome to SUPANSHA®</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    <strong>Social Union for Progressive Advancement and Navigation towards Sustainable Holistic Actions</strong>
                  </p>
                  <p className="text-gray-700 mb-6">
                    At Supansha Development Foundation, we stand for more than just service delivery—we stand for transformation. 
                    Every initiative we design and implement is guided by our mission of Delivering Sustainable Choices, 
                    empowering individuals and communities to shape their own future with dignity, opportunity, and self-reliance.
                  </p>

                  <h3 className="text-2xl font-montserrat font-semibold mb-4">Essence of SUPANSHA®</h3>
                  <p className="text-gray-700 mb-6">
                    Our name, SUPANSHA, is inspired by the Sanskrit words "सु" (Su) meaning good or noble, 
                    and "पंशा" (Pansha) meaning support or encouragement. Together, they symbolize "Noble Support", 
                    the essence of what we offer: upliftment, strength, and hope for a better tomorrow.
                  </p>

                  <h3 className="text-2xl font-montserrat font-semibold mb-4">Who We Are – The SUPANSHA® Network</h3>
                  <p className="text-gray-700 mb-6">
                    At SUPANSHA®, we are more than an organization—we are a movement of change makers, 
                    united by our mission to build a better, inclusive future. We bring together governments, 
                    corporations, civil society, and individuals into a single network that believes in shared progress.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Through this collective, we unite four types of development champions:
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-700">
                    <li><strong>Development Doers</strong> – Individuals driving social change through grassroots action and leadership.</li>
                    <li><strong>Development Dealers</strong> – Businesses delivering practical, innovative, and scalable solutions.</li>
                    <li><strong>Development Drivers</strong> – NGOs and civil society organizations creating real impact on the ground.</li>
                    <li><strong>Development Donors</strong> – Supporters, CSR funders, and philanthropists empowering sustainable futures.</li>
                  </ul>
                  <p className="text-gray-700 mb-6">
                    Together, this powerful ecosystem collaborates to tackle societal challenges with innovation, compassion, and resilience.
                  </p>

                  <h3 className="text-2xl font-montserrat font-semibold mb-4">Our Core Commitment</h3>
                  <p className="text-gray-700 mb-4 font-semibold">Transforming Lives, Building Futures</p>
                  <p className="text-gray-700 mb-6">
                    At the heart of the SUPANSHA® network lies the integration of three transformative forces that guide our strategy and inspire our people:
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-light p-6 rounded-lg">
                      <h4 className="font-montserrat font-semibold text-xl mb-2">इक्षा शक्ति (Iksha-Shakti)</h4>
                      <p className="text-gray-700">The Power of Intention: The unwavering will to bring change where it's needed most.</p>
                    </div>
                    <div className="bg-light p-6 rounded-lg">
                      <h4 className="font-montserrat font-semibold text-xl mb-2">ज्ञान शक्ति (Gyan-Shakti)</h4>
                      <p className="text-gray-700">The Power of Knowledge: Empowering minds through education, research, and informed decision-making.</p>
                    </div>
                    <div className="bg-light p-6 rounded-lg">
                      <h4 className="font-montserrat font-semibold text-xl mb-2">क्रिया शक्ति (Kriya-Shakti)</h4>
                      <p className="text-gray-700">The Power of Action: Translating intent and insight into ground-level impact.</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-montserrat font-semibold mb-4">Mission & Vision</h3>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h4 className="font-montserrat font-semibold text-xl mb-3 text-primary">Our Mission</h4>
                      <p className="text-gray-700">
                        To create a world where every individual can live with dignity, reach their full potential, 
                        and contribute to a sustainable, inclusive future.
                      </p>
                    </div>
                    <div className="bg-secondary/5 p-6 rounded-lg">
                      <h4 className="font-montserrat font-semibold text-xl mb-3 text-secondary">Our Vision</h4>
                      <p className="text-gray-700">
                        To build empowered communities that are resilient, self-sufficient, and capable of 
                        transforming their own futures through access, equity, and opportunity.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-montserrat font-semibold mb-4">Our CREATE Values</h3>
                  <p className="text-gray-700 mb-6">
                    We are guided by our CREATE values—six key principles that ensure all our programs are inclusive, ethical, and future-ready:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="flex gap-3">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">C</div>
                      <div>
                        <p className="font-semibold">Choices for All</p>
                        <p className="text-gray-700 text-sm">Enabling fair, accessible options for every individual and community.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">R</div>
                      <div>
                        <p className="font-semibold">Respect with Inclusion</p>
                        <p className="text-gray-700 text-sm">Celebrating diversity and promoting equal dignity for all.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">E</div>
                      <div>
                        <p className="font-semibold">Empathy in Action</p>
                        <p className="text-gray-700 text-sm">Listening first, then acting—rooted in compassion and community feedback.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">A</div>
                      <div>
                        <p className="font-semibold">Accountable Support</p>
                        <p className="text-gray-700 text-sm">Delivering transparent, ethical, and reliable partnerships.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">T</div>
                      <div>
                        <p className="font-semibold">Technical and Transparent Approach</p>
                        <p className="text-gray-700 text-sm">Using smart tools to improve training and communication.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0">E</div>
                      <div>
                        <p className="font-semibold">Empowerment for Sustainability</p>
                        <p className="text-gray-700 text-sm">Ensuring long-term change through self-reliant systems.</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-montserrat font-semibold mb-4">Legal Standing & Social Impact</h3>
                  <p className="text-gray-700 mb-6">
                    We are proud to be an ISO 9001:2015-certified Section 8 Company (License No. 144064), 
                    with 12A and 80G certifications, making your support eligible for up to 50% tax deductions under Indian Income Tax laws.
                  </p>
                  <p className="text-gray-700 mb-8">
                    Our work is sustained through CSR partnerships, government collaborations, and crowdfunding, 
                    allowing us to scale impact across India and beyond.
                  </p>

                  <div className="bg-gray-900 text-white p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Let's Build the Future Together</h3>
                    <p className="mb-6">
                      At Supansha, we believe in collective action and shared responsibility. 
                      Join us in this journey of transformation—where every choice matters, every voice counts, and every life is valued.
                    </p>
                    <p className="font-semibold">Together, we are delivering sustainable choices.</p>
                  </div>
                </div>
              </Tab.Panel>

              {/* Strategic Spheres */}
              <Tab.Panel className="p-3">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-montserrat font-bold mb-6">Our Strategic Spheres</h2>
                  <p className="text-gray-700 mb-8">
                    Our work spans four key areas where we focus our efforts and expertise to create lasting change.
                    These strategic spheres guide our projects and initiatives across communities.
                  </p>

                  {/* Health and Well-Being */}
                  <div className="mb-12 bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                    <div className="p-8">
                      <h3 className="text-2xl font-montserrat font-bold mb-4">1. Health and Well-Being</h3>
                      <div className="text-lg font-semibold text-primary mb-4">A Call for Compassionate Care</div>
                      <blockquote className="italic border-l-4 border-primary pl-4 mb-6 text-gray-700">
                        "The human body is the most precious creation in this universe—our responsibility is to protect and preserve it."
                        <footer className="text-sm mt-2 font-normal">— Sharda Dubey, Founder, Supansha Development Foundation</footer>
                      </blockquote>

                      <p className="text-gray-700 mb-4">
                        In a world racing ahead with medical advancements, a silent crisis persists: people are falling through the cracks—not 
                        because solutions are missing, but because they don't know whom to ask or where to go. Amid policies and hospitals, 
                        what's often lost is the human touch—empathy, emotional support, and community care.
                      </p>

                      <p className="text-gray-700 mb-4">
                        At Supansha Development Foundation, we step into this gap—not just with services, but with connection, care, and commitment.
                      </p>

                      <div className="bg-red-50 p-4 rounded-lg mb-6">
                        <h4 className="text-xl font-montserrat font-semibold mb-3">The Problem: Health Access is More Than Just Infrastructure</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Lack of health literacy: People don't understand what services are available—or even which doctor to see for which problem.</li>
                          <li>Fear and stigma around mental health: Anxiety, depression, and even suicidal thoughts go unspoken in families.</li>
                          <li>Emotional isolation: Patients often suffer alone, with no one to talk to or guide them.</li>
                          <li>Disconnection from services: Especially in rural areas, people struggle to reach even the most basic preventive screenings.</li>
                          <li>No clear "go-to" support: In times of emergency or chronic illness, families are lost in a maze of systems and procedures.</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="text-xl font-montserrat font-semibold mb-3">Supansha's Solutions: Where care feels like family</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Mobile health clinics bringing essential services directly to underserved communities</li>
                          <li>Training local health workers as community health navigators</li>
                          <li>Mental health support groups and destigmatization campaigns</li>
                          <li>Digital health literacy programs and telemedicine facilitation</li>
                          <li>Emergency response and patient support systems</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-12 bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                    <div className="p-8">
                      <h3 className="text-2xl font-montserrat font-bold mb-4">2. Education</h3>
                      <div className="text-lg font-semibold text-primary mb-4">Bridging Knowledge Gaps</div>

                      <p className="text-gray-700 mb-4">
                        Education is not just about literacy—it's about developing critical thinking, practical skills, and the confidence to apply knowledge. Our education initiatives focus on making quality learning accessible to everyone, especially in underserved communities.
                      </p>

                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h4 className="text-xl font-montserrat font-semibold mb-3">Our Approach to Education</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Digital Learning Centers in rural areas</li>
                          <li>Teacher training and curriculum enhancement programs</li>
                          <li>After-school programs focusing on practical skills</li>
                          <li>Scholarships for promising students from underprivileged backgrounds</li>
                          <li>Adult literacy and vocational training programs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Ecocare */}
                  <div className="mb-12 bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                    <div className="p-8">
                      <h3 className="text-2xl font-montserrat font-bold mb-4">3. Ecocare</h3>
                      <div className="text-lg font-semibold text-primary mb-4">Preserving Our Planet</div>

                      <p className="text-gray-700 mb-4">
                        Environmental sustainability is integral to community development. Our ecocare initiatives promote sustainable practices that protect natural resources while improving livelihoods.
                      </p>

                      <div className="bg-green-50 p-4 rounded-lg mb-6">
                        <h4 className="text-xl font-montserrat font-semibold mb-3">Our Environmental Initiatives</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Sustainable farming techniques training for small farmers</li>
                          <li>Water conservation and management projects</li>
                          <li>Reforestation and biodiversity preservation programs</li>
                          <li>Renewable energy adoption in rural communities</li>
                          <li>Waste management and recycling awareness campaigns</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Research and Data */}
                  <div className="mb-12 bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                    <div className="p-8">
                      <h3 className="text-2xl font-montserrat font-bold mb-4">4. Data-Led Research</h3>
                      <div className="text-lg font-semibold text-primary mb-4">Evidence-Based Impact</div>

                      <p className="text-gray-700 mb-4">
                        We believe in using data and research to guide our interventions and measure our impact. Our research initiatives help us understand community needs better and develop more effective solutions.
                      </p>

                      <div className="bg-purple-50 p-4 rounded-lg mb-6">
                        <h4 className="text-xl font-montserrat font-semibold mb-3">Our Research Approach</h4>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                          <li>Community needs assessments and baseline studies</li>
                          <li>Impact evaluation of development programs</li>
                          <li>Data collection and analysis for evidence-based policy advocacy</li>
                          <li>Participatory research involving community members</li>
                          <li>Knowledge sharing through publications and conferences</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* Served Communities */}
              <Tab.Panel className="p-3">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-montserrat font-bold mb-6">Communities We Serve</h2>
                  <p className="text-gray-700 mb-8">
                    We center our efforts on the most vulnerable and underserved populations across India, with a special focus on:
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">Rural Women</h3>
                        <p className="text-gray-700 mb-4">
                          Women in rural communities face unique challenges including limited access to healthcare, education, and economic opportunities. We work to empower women through skills training, health education, and entrepreneurship support.
                        </p>
                        <div className="text-primary font-medium">Programs include:</div>
                        <ul className="list-disc pl-6 text-gray-700 mt-2">
                          <li>Self-help group formation and management</li>
                          <li>Microfinance and entrepreneurship development</li>
                          <li>Digital and financial literacy</li>
                          <li>Maternal health services</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">Children</h3>
                        <p className="text-gray-700 mb-4">
                          Children are the future of any community. We focus on ensuring they have access to quality education, healthcare, nutrition, and a safe environment to grow and develop their potential.
                        </p>
                        <div className="text-primary font-medium">Programs include:</div>
                        <ul className="list-disc pl-6 text-gray-700 mt-2">
                          <li>Early childhood development programs</li>
                          <li>School infrastructure improvement</li>
                          <li>Supplementary education and tutoring</li>
                          <li>Child health and nutrition initiatives</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558797107-c2d339c43802?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">Farmers</h3>
                        <p className="text-gray-700 mb-4">
                          Small and marginal farmers form the backbone of rural economies but often struggle with low productivity, climate vulnerabilities, and market access challenges. We support farmers in adopting sustainable practices and improving their livelihoods.
                        </p>
                        <div className="text-primary font-medium">Programs include:</div>
                        <ul className="list-disc pl-6 text-gray-700 mt-2">
                          <li>Sustainable agriculture training</li>
                          <li>Market linkage development</li>
                          <li>Farmer producer organizations</li>
                          <li>Water management techniques</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-6">
                        <h3 className="text-xl font-montserrat font-bold mb-3">Frontline Workers</h3>
                        <p className="text-gray-700 mb-4">
                          Community health workers, teachers, and other frontline service providers play a crucial role in delivering essential services. We focus on capacity building and support systems for these change agents.
                        </p>
                        <div className="text-primary font-medium">Programs include:</div>
                        <ul className="list-disc pl-6 text-gray-700 mt-2">
                          <li>Training and skill development</li>
                          <li>Resource provision and support</li>
                          <li>Peer learning networks</li>
                          <li>Recognition and incentive programs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-light p-8 rounded-lg">
                    <h3 className="text-2xl font-montserrat font-bold mb-4">Our Geographical Focus</h3>
                    <p className="text-gray-700 mb-4">
                      While we work across India, we prioritize communities in:
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        Remote rural areas with limited access to services
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        Drought-prone regions facing water scarcity
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        Areas with high poverty rates and low development indicators
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        Tribal and indigenous communities
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        Regions prone to natural disasters
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        Urban slums with inadequate infrastructure
                      </li>
                    </ul>
                  </div>
                </div>
              </Tab.Panel>

              {/* Supansha Squad */}
              <Tab.Panel className="p-3">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-montserrat font-bold mb-6">Our Team</h2>
                  <p className="text-gray-700 mb-8">
                    Meet the passionate individuals who drive our mission forward. Our team combines expertise, dedication, and a deep commitment to social change.
                  </p>

                  {/* Leadership Team */}
                  <h3 className="text-2xl font-montserrat font-semibold mb-6">Leadership Team</h3>
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-6">
                        <h4 className="font-montserrat font-semibold text-xl mb-1">Sharda Dubey</h4>
                        <p className="text-primary mb-3">Founder & Chairperson</p>
                        <p className="text-gray-600 text-sm">With over 25 years of experience in rural development, Sharda has pioneered innovative approaches to sustainable community transformation.</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-6">
                        <h4 className="font-montserrat font-semibold text-xl mb-1">Dr. Amit Kumar</h4>
                        <p className="text-primary mb-3">Executive Director</p>
                        <p className="text-gray-600 text-sm">A public health expert with extensive experience in designing and implementing healthcare programs in underserved communities.</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-6">
                        <h4 className="font-montserrat font-semibold text-xl mb-1">Priya Sharma</h4>
                        <p className="text-primary mb-3">Director of Programs</p>
                        <p className="text-gray-600 text-sm">An education specialist who has transformed learning outcomes across numerous schools and educational initiatives.</p>
                      </div>
                    </div>
                  </div>

                  {/* Program Directors */}
                  <h3 className="text-2xl font-montserrat font-semibold mb-6">Program Directors</h3>
                  <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-4">
                        <h4 className="font-montserrat font-semibold text-lg mb-1">Rajesh Singh</h4>
                        <p className="text-primary mb-2 text-sm">Health Initiatives</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551022372-0bdac482a9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-4">
                        <h4 className="font-montserrat font-semibold text-lg mb-1">Neha Gupta</h4>
                        <p className="text-primary mb-2 text-sm">Education Programs</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-4">
                        <h4 className="font-montserrat font-semibold text-lg mb-1">Anita Verma</h4>
                        <p className="text-primary mb-2 text-sm">Ecocare Initiatives</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
                      <div className="p-4">
                        <h4 className="font-montserrat font-semibold text-lg mb-1">Vikram Reddy</h4>
                        <p className="text-primary mb-2 text-sm">Research & Data</p>
                      </div>
                    </div>
                  </div>

                  {/* Advisory Board */}
                  <h3 className="text-2xl font-montserrat font-semibold mb-6">Advisory Board</h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="flex items-center p-4 bg-light rounded-lg">
                      <img className="h-16 w-16 rounded-full object-cover mr-4" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Advisory board member" />
                      <div>
                        <h4 className="font-montserrat font-semibold">Arun Mehta</h4>
                        <p className="text-gray-600 text-sm">Corporate CSR Expert</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-light rounded-lg">
                      <img className="h-16 w-16 rounded-full object-cover mr-4" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Advisory board member" />
                      <div>
                        <h4 className="font-montserrat font-semibold">Dr. Lakshmi Rao</h4>
                        <p className="text-gray-600 text-sm">Public Health Specialist</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-light rounded-lg">
                      <img className="h-16 w-16 rounded-full object-cover mr-4" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Advisory board member" />
                      <div>
                        <h4 className="font-montserrat font-semibold">Ravi Shankar</h4>
                        <p className="text-gray-600 text-sm">Environmental Policy Expert</p>
                      </div>
                    </div>
                  </div>

                  {/* Field Teams */}
                  <h3 className="text-2xl font-montserrat font-semibold mb-6">Our Field Teams</h3>
                  <p className="text-gray-700 mb-6">
                    The heart of our work lies with our dedicated field teams who work directly with communities across India.
                    Our field force includes:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-light p-6 rounded-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-3">Community Health Workers</h4>
                      <p className="text-gray-700 mb-2">
                        Over 50 trained health workers providing preventive and primary healthcare services in rural areas.
                      </p>
                    </div>

                    <div className="bg-light p-6 rounded-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-3">Education Facilitators</h4>
                      <p className="text-gray-700 mb-2">
                        A team of 30+ educators working with schools and communities to improve learning outcomes.
                      </p>
                    </div>

                    <div className="bg-light p-6 rounded-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-3">Agricultural Extension Workers</h4>
                      <p className="text-gray-700 mb-2">
                        25 field experts supporting farmers with sustainable agricultural practices and market linkages.
                      </p>
                    </div>

                    <div className="bg-light p-6 rounded-lg">
                      <h4 className="text-xl font-montserrat font-semibold mb-3">Community Mobilizers</h4>
                      <p className="text-gray-700 mb-2">
                        40 trained professionals working to organize communities and build local leadership.
                      </p>
                    </div>
                  </div>

                  {/* Join Our Team CTA */}
                  <div className="bg-primary text-white p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-montserrat font-semibold mb-4">Join Our Team</h3>
                    <p className="mb-6">
                      We're always looking for passionate individuals who share our vision of creating empowered communities.
                      Check our careers page for current opportunities or reach out to explore how you can contribute.
                    </p>
                    <a href="/careers" className="inline-block bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors">
                      View Opportunities
                    </a>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};

export default About;
