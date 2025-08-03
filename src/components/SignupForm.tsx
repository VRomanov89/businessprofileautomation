'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Please select a business type'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const businessTypes = [
  'Restaurant/Food Service',
  'Healthcare/Medical',
  'Retail Store',
  'Professional Services',
  'Beauty/Wellness',
  'Auto/Automotive',
  'Real Estate',
  'Fitness/Gym',
  'Education/Training',
  'Other'
];

export default function SignupForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          businessName: data.businessName,
          businessType: data.businessType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join waitlist');
      }
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Signup error:', error);
      // You could add error state here to show user-friendly error message
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <div className="text-green-600 text-4xl mb-3">✓</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">You&apos;re on the list!</h3>
        <p className="text-green-700">
          We&apos;ll notify you as soon as BPA is ready to launch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Enter your email address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('businessName')}
          type="text"
          placeholder="Your business name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.businessName && (
          <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
        )}
      </div>

      <div>
        <select
          {...register('businessType')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          defaultValue=""
        >
          <option value="" disabled>Select your business type</option>
          {businessTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.businessType && (
          <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Joining Waitlist...' : 'Join the Waitlist'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        No spam, ever. We&apos;ll only contact you when BPA is ready.
      </p>
    </form>
  );
}