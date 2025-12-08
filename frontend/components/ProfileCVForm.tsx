// frontend/components/ProfileCVForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // Assuming AuthContext is located at '@/context/AuthContext'

interface ProfileCVFormInputs {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
  cvContent: string;
}

const ProfileCVForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<ProfileCVFormInputs>();
  const router = useRouter();
  const { session } = useAuth();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (data: ProfileCVFormInputs) => {
    if (!session?.access_token) {
      setSubmissionError("You must be logged in to create a profile.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

    try {
      const response = await fetch(`${backendUrl}/api/v1/users/me/cv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          full_name: data.fullName,
          date_of_birth: data.dateOfBirth,
          gender: data.gender,
          phone_number: data.phoneNumber,
          address: data.address,
          cv_content: data.cvContent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || 'Failed to save profile and CV.';
        setSubmissionError(errorMessage);
        // Optionally, map backend errors to specific form fields
        if (errorData.detail && Array.isArray(errorData.detail)) {
            errorData.detail.forEach((err: any) => {
                if (err.loc && err.loc.length > 1) {
                    const fieldName = err.loc[1]; // Assuming loc[1] is the field name
                    // Ensure fieldName matches ProfileCVFormInputs keys
                    if (fieldName in data) {
                        setError(fieldName as keyof ProfileCVFormInputs, { type: 'manual', message: err.msg });
                    }
                }
            });
        }
        throw new Error(errorMessage);
      }

      router.push('/dashboard'); // Redirect on successful submission
    } catch (error: any) {
      console.error("Submission error:", error);
      if (!submissionError) { // Only set if not already set by backend response
        setSubmissionError(error.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Create Your Profile and CV</h2>
      
      {submissionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{submissionError}</span>
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="fullName"
          type="text"
          {...register('fullName', { required: 'Full Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="fullName-input"
          disabled={isSubmitting}
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          id="dateOfBirth"
          type="date"
          {...register('dateOfBirth', { required: 'Date of Birth is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="dateOfBirth-input"
          disabled={isSubmitting}
        />
        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          id="gender"
          {...register('gender', { required: 'Gender is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="gender-select"
          disabled={isSubmitting}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          {...register('phoneNumber', { required: 'Phone Number is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="phoneNumber-input"
          disabled={isSubmitting}
        />
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          id="address"
          type="text"
          {...register('address', { required: 'Address is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="address-input"
          disabled={isSubmitting}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

      <div>
        <label htmlFor="cvContent" className="block text-sm font-medium text-gray-700">CV Content</label>
        <textarea
          id="cvContent"
          rows={10}
          {...register('cvContent', { required: 'CV Content is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="cvContent-textarea"
          disabled={isSubmitting}
        ></textarea>
        {errors.cvContent && <p className="mt-1 text-sm text-red-600">{errors.cvContent.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        data-testid="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Profile and CV'}
      </button>
    </form>
  );
};

export default ProfileCVForm;