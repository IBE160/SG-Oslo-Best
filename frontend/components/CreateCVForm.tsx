import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useUnsavedChanges } from '@/context/UnsavedChangesContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigationBlocker } from '@/hooks/useNavigationBlocker';

// Data structure for the form inputs
interface ProfileCVFormInputs {
  full_name: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  address: string;
  cv_content: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Function to create full profile and CV data (POST)
const createUserProfileCvData = async (accessToken: string, formData: ProfileCVFormInputs) => {
  const response = await fetch(`${backendUrl}/api/v1/users/me/cv`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      full_name: formData.full_name,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      phone_number: formData.phone_number,
      address: formData.address,
      cv_content: formData.cv_content,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create profile and CV.');
  }
  
  const { data } = await response.json();
  return data;
};

const CreateCVForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isDirty }, reset, getValues } = useForm<ProfileCVFormInputs>();
  const router = useRouter();
  const { session } = useAuth();
  const { setHasUnsavedChanges } = useUnsavedChanges();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Use useMutation for creating profile/CV data (POST)
  const createMutation = useMutation({
    mutationFn: (formData: ProfileCVFormInputs) => createUserProfileCvData(session!.access_token!, formData),
    onSuccess: (data) => {
      setHasUnsavedChanges(false);
      queryClient.invalidateQueries({ queryKey: ['userProfileCv'] });
      router.push('/dashboard');
      console.log("Profile and CV created successfully!");
    },
    onError: (error: any) => {
        if (error.message.includes('already exist')) {
            setSubmissionError("Profile already exists. Redirecting to edit...");
            setTimeout(() => router.push('/cv-edit'), 2000);
        } else {
            setSubmissionError(error.message || 'An unexpected error occurred during creation.');
        }
    },
  });

  // Update UnsavedChangesContext based on form's isDirty state
  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty, setHasUnsavedChanges]);

  // Navigation Blocker
  const { BlockerDialog } = useNavigationBlocker({
    when: isDirty,
    onConfirm: () => {
      reset();
      setHasUnsavedChanges(false);
    },
    onSave: async () => {
      const formValues = getValues();
      try {
        await createMutation.mutateAsync(formValues);
        return true;
      } catch (e) {
        return false;
      }
    },
  });

  const onSubmit = async (data: ProfileCVFormInputs) => {
    if (!session?.access_token) {
      setSubmissionError("You must be logged in to create your profile.");
      return;
    }
    setSubmissionError(null);
    try {
      await createMutation.mutateAsync(data);
    } catch (e) {
      // Error handled by onError callback
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

      {/* Profile Fields */}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          id="full_name"
          type="text"
          {...register('full_name', { required: 'Full Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="fullName-input"
          disabled={createMutation.isPending}
        />
        {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
      </div>

      <div>
        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          id="date_of_birth"
          type="date"
          {...register('date_of_birth', { required: 'Date of Birth is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="dateOfBirth-input"
          disabled={createMutation.isPending}
        />
        {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth.message}</p>}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          id="gender"
          {...register('gender', { required: 'Gender is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="gender-select"
          disabled={createMutation.isPending}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
      </div>

      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          id="phone_number"
          type="tel"
          {...register('phone_number', { required: 'Phone Number is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="phoneNumber-input"
          disabled={createMutation.isPending}
        />
        {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          id="address"
          type="text"
          {...register('address', { required: 'Address is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="address-input"
          disabled={createMutation.isPending}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

      {/* CV Content Field */}
      <div>
        <label htmlFor="cv_content" className="block text-sm font-medium text-gray-700">CV Content</label>
        <textarea
          id="cv_content"
          rows={10}
          {...register('cv_content', { required: 'CV Content is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="cvContent-textarea"
          disabled={createMutation.isPending}
        ></textarea>
        {errors.cv_content && <p className="mt-1 text-sm text-red-600">{errors.cv_content.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        data-testid="submit-button"
        disabled={!isDirty || createMutation.isPending}
      >
        {createMutation.isPending ? 'Creating...' : 'Create Profile and CV'}
      </button>

      <BlockerDialog />
    </form>
  );
};

export default CreateCVForm;