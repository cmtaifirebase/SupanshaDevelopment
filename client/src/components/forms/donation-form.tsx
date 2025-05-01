import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';

// Form schema
const donationSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  amount: z.number()
    .min(100, { message: 'Minimum donation amount is ₹100' })
    .max(100000, { message: 'Maximum donation amount is ₹100,000' }),
  aadhaarCard: z.any().optional(),
  panCard: z.any().optional(),
  message: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

interface DonationFormProps {
  selectedCauseId: number | null;
}

const DonationForm: React.FC<DonationFormProps> = ({ selectedCauseId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      amount: 1000,
      message: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);

    try {
      // In a real implementation, this would integrate with Razorpay
      // Create an order
      setPaymentProcessing(true);
      toast({
        title: 'Processing payment...',
        description: 'Please wait while we process your donation.',
      });

      // Simulate payment processing
      setTimeout(async () => {
        try {
          // Process donation after payment
          const donationData = {
            ...data,
            causeId: selectedCauseId,
            paymentId: 'pay_' + Math.random().toString(36).substring(2, 15),
          };

          const response = await apiRequest('POST', '/api/donate', donationData);
          const result = await response.json();

          toast({
            title: 'Thank you for your donation!',
            description: 'Your contribution will help create lasting impact.',
          });

          // Invalidate causes cache to update progress
          queryClient.invalidateQueries({ queryKey: ['/api/causes'] });
          
          // Reset the form
          reset();

          // Simulate a redirect to the receipt
          if (result.donation && result.donation.receipt) {
            setTimeout(() => {
              window.open(result.donation.receipt, '_blank');
            }, 1000);
          }
        } catch (error) {
          console.error('Donation processing error:', error);
          toast({
            title: 'Donation Failed',
            description: 'There was an error processing your donation. Please try again.',
            variant: 'destructive',
          });
        } finally {
          setPaymentProcessing(false);
          setIsSubmitting(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your form. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const suggestedAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Donation Amount (₹)
          </label>
          <input
            id="amount"
            type="number"
            className={`w-full p-3 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {suggestedAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                onClick={() => {
                  // @ts-ignore - This is a valid usage with react-hook-form
                  setValue('amount', amount, { shouldValidate: true });
                }}
              >
                ₹{amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="aadhaarCard" className="block text-sm font-medium text-gray-700 mb-1">
              Aadhaar Card (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="aadhaarCard" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90">
                    <span>Upload a file</span>
                    <input 
                      id="aadhaarCard" 
                      type="file" 
                      className="sr-only" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register('aadhaarCard')}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="panCard" className="block text-sm font-medium text-gray-700 mb-1">
              PAN Card (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="panCard" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90">
                    <span>Upload a file</span>
                    <input 
                      id="panCard" 
                      type="file" 
                      className="sr-only" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register('panCard')}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Add a message with your donation"
            {...register('message')}
          ></textarea>
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
              <a href="/policies/donation" className="text-primary hover:underline">
                donation policy
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
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md font-medium transition-colors flex justify-center items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {paymentProcessing ? 'Processing Payment...' : 'Processing...'}
            </>
          ) : (
            'Make Donation'
          )}
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Secured by <span className="font-semibold">Razorpay</span>
        </p>
      </div>
    </form>
  );
};

export default DonationForm;
