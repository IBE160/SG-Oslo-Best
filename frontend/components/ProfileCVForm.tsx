import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useUnsavedChanges } from '@/context/UnsavedChangesContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigationBlocker } from '@/hooks/useNavigationBlocker'; // Import the new hook

// Assuming these types are defined in packages/shared-types or a local types file
interface UserProfile {
  id: string;
  full_name: string;
  date_of_birth: string; // ISO format date string for HTML date input
  gender: string;
  phone_number: string;
  address: string;
  cv_content: string;
  created_at: string;
  updated_at: string;
}

// Data structure for the form inputs
interface ProfileCVFormInputs {
  full_name: string;
  date_of_birth: string; // Keep as string for HTML date input
  gender: string;
  phone_number: string;
  address: string;
  cv_content: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Function to fetch full profile and CV data
const fetchUserProfileCvData = async (accessToken: string): Promise<UserProfile> => {
  const response = await fetch(`${backendUrl}/api/v1/users/me/cv`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok && response.status !== 404) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to load profile and CV data.');
  }

  // Directly return the JSON response, as it appears to be the UserProfile object itself
  const userProfile = await response.json();
  return userProfile;
};

// Function to update full profile and CV data (PATCH)
const updateUserProfileCvData = async (accessToken: string, formData: ProfileCVFormInputs): Promise<UserProfile> => {
    // Construct payload, only sending fields that have a value
    const payload: Partial<ProfileCVFormInputs> = {};
    if (formData.full_name) payload.full_name = formData.full_name;
    if (formData.date_of_birth) payload.date_of_birth = formData.date_of_birth;
    if (formData.gender) payload.gender = formData.gender;
    if (formData.phone_number) payload.phone_number = formData.phone_number;
    if (formData.address) payload.address = formData.address;
    if (formData.cv_content) payload.cv_content = formData.cv_content;

    const response = await fetch(`${backendUrl}/api/v1/users/me/cv`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to update profile and CV.');
    }
    
    const { data } = await response.json();
    return data;
};

// Function to create full profile and CV data (POST)
const createUserProfileCvData = async (accessToken: string, formData: ProfileCVFormInputs): Promise<UserProfile> => {
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


const ProfileCVForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isDirty }, reset, getValues } = useForm<ProfileCVFormInputs>();
  const router = useRouter();
  const { session } = useAuth();
  const { setHasUnsavedChanges } = useUnsavedChanges();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [isNewProfile, setIsNewProfile] = useState(true); // Initialize to true, will be set to false if data exists




  // Fetch initial profile and CV data using useQuery
  const { data: userData, isLoading: isUserCvLoading, isError: isUserCvError, error: userCvError } = useQuery({
    queryKey: ['userProfileCv', session?.access_token],
    queryFn: () => fetchUserProfileCvData(session!.access_token!),
    enabled: !!session?.access_token,
    retry: 1, // Don't keep retrying if 404
    onSuccess: (data) => {
        // Populate form fields
        reset({
            full_name: data.full_name || '',
            date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().split('T')[0] : '',
            gender: data.gender || '',
            phone_number: data.phone_number || '',
            address: data.address || '',
            cv_content: data.cv_content || '',
        });
        setIsNewProfile(data.id === ''); // Set to false if profile data exists
    }
  });

  // Use useMutation for updating profile/CV data (PATCH)
  const updateMutation = useMutation({
    mutationFn: (formData: ProfileCVFormInputs) => updateUserProfileCvData(session!.access_token!, formData),
    onSuccess: (data) => {
      // No need to reset all fields, as data contains the updated values
      // reset(data); // This might cause issues if data structure from API doesn't exactly match form input
      setHasUnsavedChanges(false);
      queryClient.invalidateQueries({ queryKey: ['userProfileCv'] });
      router.push('/dashboard'); // Redirect on successful update
      console.log("Profile and CV updated successfully!");
    },
    onError: (error) => {
      setSubmissionError(error.message || 'An unexpected error occurred during update.');
    },
  });

  // Use useMutation for creating profile/CV data (POST)
  const createMutation = useMutation({
    mutationFn: (formData: ProfileCVFormInputs) => createUserProfileCvData(session!.access_token!, formData),
    onSuccess: (data) => {
      setHasUnsavedChanges(false);
      queryClient.invalidateQueries({ queryKey: ['userProfileCv'] });
      setIsNewProfile(false); // No longer a new profile after creation
      router.push('/dashboard'); // Redirect on successful creation
      console.log("Profile and CV created successfully!");
    },
    onError: (error) => {
      setSubmissionError(error.message || 'An unexpected error occurred during creation.');
    },
  });

  // Determine which mutation to use
  const { mutateAsync, isPending: isMutating, isError: isMutationError, error: mutationError } = isNewProfile ? createMutation : updateMutation;


  // Update UnsavedChangesContext based on form's isDirty state
  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty, setHasUnsavedChanges]);

  // Navigation Blocker
  const { BlockerDialog } = useNavigationBlocker({
    when: isDirty,
    onConfirm: () => {
      reset(); // Discard changes
      setHasUnsavedChanges(false);
    },
    onSave: async () => {
      const formValues = getValues();
      try {
        await mutateAsync(formValues); // Use mutateAsync for awaiting
        return true; // Indicate successful save
      } catch (e) {
        return false; // Indicate save failed
      }
    },
  });

  const onSubmit = async (data: ProfileCVFormInputs) => {
    if (!session?.access_token) {
      setSubmissionError("You must be logged in to update your profile.");
      return;
    }
    setSubmissionError(null);
    try {
      await mutateAsync(data); // Trigger appropriate mutation (create or update)
    } catch (e) {
      // Error handled by onError callback of useMutation
    }
  };

  // Auto-save on blur for any field
  const handleBlur = () => {
    console.log(`DEBUG: handleBlur - isDirty: ${isDirty}, isNewProfile: ${isNewProfile}, isUserCvLoading: ${isUserCvLoading}`);
    if (!isUserCvLoading && isDirty && !isNewProfile) { // Only auto-save if not loading the profile data AND it's not a new profile
      const formValues = getValues();
      updateMutation.mutate(formValues);
    }
  };

  if (isUserCvLoading) {
    return <div className="p-4 text-center">Loading Profile and CV data...</div>;
  }

  if (isUserCvError) {
    return <div className="p-4 text-center text-red-600">Error loading Profile and CV data: {userCvError?.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">{isNewProfile ? 'Create Your Profile and CV' : 'Edit Your Profile and CV'}</h2>
      
      {(submissionError || isMutationError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{submissionError || mutationError?.message}</span>
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
          disabled={isMutating}
          onBlur={handleBlur}
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
          disabled={isMutating}
          onBlur={handleBlur}
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
          disabled={isMutating}
          onBlur={handleBlur}
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
          disabled={isMutating}
          onBlur={handleBlur}
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
          disabled={isMutating}
          onBlur={handleBlur}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

      {/* CV Content Field */}
      <div>
        <label htmlFor="cv_content" className="block text-sm font-medium text-gray-700">CV Content</label>
        {/* TODO: Integrate StatefulTextbox component (from Story 2.5) here */}
        <textarea
          id="cv_content"
          rows={10}
          {...register('cv_content', { required: 'CV Content is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          data-testid="cvContent-textarea"
          disabled={isMutating}
          onBlur={handleBlur}
        ></textarea>
        {errors.cv_content && <p className="mt-1 text-sm text-red-600">{errors.cv_content.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        data-testid="submit-button"
        disabled={!isDirty || isMutating || isUserCvLoading}
      >
        {isMutating ? 'Saving...' : (isNewProfile ? 'Create Profile and CV' : 'Save Profile and CV')}
      </button>

      <BlockerDialog />
    </form>
  );
};

export default ProfileCVForm;