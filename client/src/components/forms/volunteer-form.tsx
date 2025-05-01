import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Form schema
const volunteerSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  age: z.number()
    .min(18, { message: 'You must be at least 18 years old' })
    .max(80, { message: 'Please enter a valid age' }),
  city: z.string().min(2, { message: 'Please enter your city' }),
  interests: z.array(z.string()).min(1, { message: 'Please select at least one area of interest' }),
  experience: z.string().optional(),
  availability: z.string().min(1, { message: 'Please select your availability' }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

const VolunteerForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      age: 25,
      city: '',
      interests: [],
      experience: '',
      availability: '',
      acceptTerms: false,
    },
  });

  const watchedInterests = watch('interests');

  const interestOptions = [
    { value: 'health', label: 'Health & Wellbeing' },
    { value: 'education', label: 'Education & Literacy' },
    { value: 'environment', label: 'Environment & Conservation' },
    { value: 'women', label: 'Women Empowerment' },
    { value: 'children', label: 'Child Welfare' },
    { value: 'digital', label: 'Digital Skills' },
    { value: 'livelihood', label: 'Livelihood Training' },
    { value: 'fundraising', label: 'Fundraising' },
    { value: 'events', label: 'Event Management' },
    { value: 'media', label: 'Media & Design' },
  ];

  const availabilityOptions = [
    { value: 'weekdays', label: 'Weekdays' },
    { value: 'weekends', label: 'Weekends' },
    { value: 'full_time', label: 'Full Time (1+ months)' },
    { value: 'onetime', label: 'One-time Events' },
    { value: 'remote', label: 'Remote Only' },
  ];

  const onSubmit = async (data: VolunteerFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await apiRequest('POST', '/api/volunteer/register', data);
      const result = await response.json();

      toast({
        title: 'Application Submitted!',
        description: result.message || 'Your volunteer application has been received. We will contact you soon.',
      });

      // Reset the form and go back to step 1
      reset();
      setStep(1);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
              placeholder="Enter your full name"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
              placeholder="Enter your email address"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
              placeholder="Enter your phone number"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              id="age"
              type="number"
              className={`w-full p-3 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
              {...register('age', { valueAsNumber: true })}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              id="city"
              type="text"
              className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
              placeholder="Enter your city"
              {...register('city')}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md font-medium transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Areas of Interest (Select all that apply)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interestOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`interest_${option.value}`}
                    type="checkbox"
                    value={option.value}
                    className="h-4 w-4 border-gray-300 rounded focus:ring-primary text-primary"
                    {...register('interests')}
                  />
                  <label htmlFor={`interest_${option.value}`} className="ml-2 text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.interests && (
              <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              Relevant Experience (Optional)
            </label>
            <textarea
              id="experience"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="Tell us about any previous volunteer experience or relevant skills"
              {...register('experience')}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <div className="space-y-2">
              {availabilityOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`availability_${option.value}`}
                    type="radio"
                    value={option.value}
                    className="h-4 w-4 border-gray-300 focus:ring-primary text-primary"
                    {...register('availability')}
                  />
                  <label htmlFor={`availability_${option.value}`} className="ml-2 text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.availability && (
              <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
            )}
          </div>

          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input
                id="acceptTerms"
                type="checkbox"
                className={`h-4 w-4 border ${errors.acceptTerms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-primary text-primary`}
                {...register('acceptTerms')}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptTerms" className="text-gray-700">
                I agree to the{' '}
                <a href="/policies/volunteer" className="text-primary hover:underline">
                  volunteer policy
                </a>{' '}
                and{' '}
                <a href="/policies/privacy" className="text-primary hover:underline">
                  privacy policy
                </a>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={prevStep}
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-md font-medium transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md font-medium transition-colors flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default VolunteerForm;
