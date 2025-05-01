import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    id: 'general',
    name: 'General Questions',
    questions: [
      {
        id: 'general-1',
        question: 'What is Supansha Development Foundation?',
        answer: 'Supansha Development Foundation is a non-profit organization dedicated to empowering rural communities through sustainable development initiatives. We work in the areas of education, healthcare, livelihood development, and environmental conservation.'
      },
      {
        id: 'general-2',
        question: 'Where does Supansha Development Foundation operate?',
        answer: 'We primarily work in rural and underserved areas across multiple states in India, with a focus on communities that have limited access to essential services and resources.'
      },
      {
        id: 'general-3',
        question: 'How can I contact Supansha Development Foundation?',
        answer: 'You can reach us through our contact page, email us at contact@supansha.org, or call us at +91-XXXXXXXXXX. Our team is available Monday through Friday from 9 AM to 6 PM IST.'
      },
      {
        id: 'general-4',
        question: 'Is Supansha Development Foundation a registered organization?',
        answer: 'Yes, Supansha Development Foundation is a registered non-profit organization under the Indian Societies Registration Act, 1860. We are also registered under Section 80G of the Income Tax Act, which allows donors to claim tax benefits on their donations.'
      }
    ]
  },
  {
    id: 'donations',
    name: 'Donations & Funding',
    questions: [
      {
        id: 'donations-1',
        question: 'How can I donate to Supansha Development Foundation?',
        answer: 'You can donate through our website using credit/debit cards, UPI, net banking, or digital wallets. For larger donations or corporate partnerships, please contact our donation team at donations@supansha.org.'
      },
      {
        id: 'donations-2',
        question: 'Are donations to Supansha tax-deductible?',
        answer: 'Yes, donations to Supansha Development Foundation are eligible for tax deduction under Section 80G of the Income Tax Act in India. International donors should consult their local tax regulations regarding deductions for international charitable contributions.'
      },
      {
        id: 'donations-3',
        question: 'How is my donation used?',
        answer: 'Your donation directly supports our programs in education, healthcare, livelihood development, and environmental conservation. We maintain a high level of transparency and accountability, with at least 85% of donations going directly to our programs and no more than 15% used for administrative and fundraising costs.'
      },
      {
        id: 'donations-4',
        question: 'Can I donate to a specific project or cause?',
        answer: 'Yes, you can specify the project or cause you wish to support during the donation process. If you have a specific interest that isn\'t listed, please contact us and we\'ll be happy to discuss how we can direct your contribution according to your wishes.'
      },
      {
        id: 'donations-5',
        question: 'What payment methods do you accept?',
        answer: 'We accept payments via credit/debit cards, UPI, net banking, digital wallets, and bank transfers. For international donors, we support major credit cards and PayPal.'
      }
    ]
  },
  {
    id: 'volunteering',
    name: 'Volunteering & Internships',
    questions: [
      {
        id: 'volunteering-1',
        question: 'How can I volunteer with Supansha Development Foundation?',
        answer: 'You can apply to volunteer through our website\'s volunteer page. We offer various volunteering opportunities based on your skills, interests, and availability. After reviewing your application, our team will contact you to discuss potential matches with our current needs.'
      },
      {
        id: 'volunteering-2',
        question: 'What kinds of volunteer opportunities are available?',
        answer: 'We offer diverse volunteer opportunities including field volunteering (direct community engagement), skill-based volunteering (contributing professional skills), event volunteering, and virtual volunteering for those who cannot commit in person.'
      },
      {
        id: 'volunteering-3',
        question: 'Do you offer internship programs?',
        answer: 'Yes, we offer structured internship programs for students and early-career professionals interested in the development sector. Our internships typically last 2-6 months and provide hands-on experience in program management, research, communications, or administration.'
      },
      {
        id: 'volunteering-4',
        question: 'Is there any fee or cost associated with volunteering?',
        answer: 'There is no application fee for volunteering. However, for certain long-term field volunteering opportunities, participants may need to cover their own travel and accommodation expenses. We provide detailed information about any potential costs before you commit.'
      }
    ]
  },
  {
    id: 'programs',
    name: 'Programs & Impact',
    questions: [
      {
        id: 'programs-1',
        question: 'What types of programs does Supansha Development Foundation run?',
        answer: 'Our programs focus on four main areas: education (including digital literacy and teacher training), healthcare (preventive care and health education), livelihood development (skill training and microenterprise support), and environmental conservation (sustainable agriculture and natural resource management).'
      },
      {
        id: 'programs-2',
        question: 'How do you measure the impact of your programs?',
        answer: 'We use a combination of quantitative and qualitative methods to measure impact, including baseline and endline surveys, regular monitoring of key indicators, case studies, and community feedback. We also conduct periodic independent evaluations of our major programs.'
      },
      {
        id: 'programs-3',
        question: 'How can communities request support from Supansha?',
        answer: 'Communities can reach out to us through our website, email, or phone. We also work with local government bodies, community organizations, and other NGOs who often refer communities in need to us. Each request is evaluated based on alignment with our mission, existing programs, and available resources.'
      },
      {
        id: 'programs-4',
        question: 'Do you partner with other organizations?',
        answer: 'Yes, we believe in the power of collaboration and actively seek partnerships with other NGOs, government agencies, academic institutions, and corporate partners. These partnerships help us leverage complementary strengths, expand our reach, and increase our impact.'
      }
    ]
  },
  {
    id: 'skill-store',
    name: 'Skill Store',
    questions: [
      {
        id: 'skill-store-1',
        question: 'What is the Skill Store?',
        answer: "The Skill Store is our platform that connects skilled individuals from rural communities with opportunities to sell their products, offer their services, share knowledge, and build connections. It's designed to create sustainable livelihoods while preserving traditional skills and knowledge."
      },
      {
        id: 'skill-store-2',
        question: 'How can I purchase products from the Skill Store?',
        answer: "You can browse and purchase products directly through our website's Shop Products section. Each product includes information about the artisan, the materials used, and the story behind the craft."
      },
      {
        id: 'skill-store-3',
        question: 'How can I hire skilled professionals through the Skill Store?',
        answer: 'Our Hire Skills section lets you browse profiles of skilled professionals from rural communities. You can contact them directly through our platform to discuss your project requirements and negotiate terms.'
      },
      {
        id: 'skill-store-4',
        question: 'I have traditional skills. How can I list my services or products on the Skill Store?',
        answer: 'You can apply to become a Skill Store seller by filling out the application form in the Listing Guide section. Our team will review your application and contact you to complete the onboarding process, which includes verification of your skills and setting up your profile or product listings.'
      },
      {
        id: 'skill-store-5',
        question: 'How does the Community Forum work?',
        answer: 'The Community Forum is a space where members can share knowledge, ask questions, and connect with others interested in rural development, traditional skills, and sustainable livelihoods. You need to create an account to participate, after which you can post topics, respond to discussions, and connect with other members.'
      }
    ]
  }
];

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-3 text-center">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-center mb-10">
            Find answers to common questions about Supansha Development Foundation, our programs, and how you can get involved.
          </p>
          
          {/* Category tabs */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* FAQ Accordion */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {faqCategories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              {faqCategories
                .find(cat => cat.id === activeCategory)
                ?.questions.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
          
          <div className="mt-10 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              If you couldn't find the answer you were looking for, please feel free to reach out to us directly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 mb-3">
                  Send us an email and we'll get back to you within 24-48 hours.
                </p>
                <a href="mailto:contact@supansha.org" className="text-primary font-medium hover:underline">
                  contact@supansha.org
                </a>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 mb-3">
                  Available Monday-Friday, 9 AM to 6 PM IST.
                </p>
                <a href="tel:+91XXXXXXXXXX" className="text-primary font-medium hover:underline">
                  +91-XXXXXXXXXX
                </a>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href="/contact" 
                className="inline-block bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;