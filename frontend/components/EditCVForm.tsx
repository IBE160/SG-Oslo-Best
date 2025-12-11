import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useUnsavedChanges } from '@/context/UnsavedChangesContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigationBlocker } from '@/hooks/useNavigationBlocker';
// FIKSET HER: La til krøllparenteser { } for named import
import { StatefulTextbox } from './ui/StatefulTextbox'; 

interface UserProfile {
  id: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  address: string;
  cv_content: string;
  created_at: string;
  updated_at: string;
}

interface ProfileCVFormInputs {
  full_name: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  address: string;
  cv_content: string;
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

const fetchUserProfileCvData = async (accessToken: string): Promise<UserProfile> => {
  const response = await fetch(`${backendUrl}/api/v1/users/me/cv`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (response.status === 404) {
    throw new Error('PROFILE_NOT_FOUND');
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to load profile and CV data.');
  }

  return response.json();
};

const updateUserProfileCvData = async (accessToken: string, formData: ProfileCVFormInputs): Promise<UserProfile> => {
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

const EditCVForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isDirty }, reset, getValues } = useForm<ProfileCVFormInputs>({
    mode: 'onChange' // Validate on every change
  });
  const router = useRouter();
  const { session } = useAuth();
  const { setHasUnsavedChanges } = useUnsavedChanges();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch initial profile and CV data
  const { data: userData, isLoading: isUserCvLoading, isError: isUserCvError, error: userCvError } = useQuery({
    queryKey: ['userProfileCv', session?.access_token],
    queryFn: () => fetchUserProfileCvData(session!.access_token!),
    enabled: !!session?.access_token,
    retry: (failureCount, error) => {
        if (error.message === 'PROFILE_NOT_FOUND') return false;
        return failureCount < 2;
    },
  });

  // Handle data loading success
  useEffect(() => {
    if (userData) {
        reset({
            full_name: userData.full_name || '',
            date_of_birth: userData.date_of_birth ? new Date(userData.date_of_birth).toISOString().split('T')[0] : '',
            gender: userData.gender || '',
            phone_number: userData.phone_number || '',
            address: userData.address || '',
            cv_content: userData.cv_content || '',
        });
    }
  }, [userData, reset]);

  // Handle 404 - Redirect to create
  useEffect(() => {
    if (isUserCvError && userCvError.message === 'PROFILE_NOT_FOUND') {
        router.replace('/cv-creation');
    }
  }, [isUserCvError, userCvError, router]);


  const updateMutation = useMutation({
    mutationFn: (formData: ProfileCVFormInputs) => updateUserProfileCvData(session!.access_token!, formData),
    onSuccess: (data) => {
      setHasUnsavedChanges(false);
      queryClient.invalidateQueries({ queryKey: ['userProfileCv'] });
      router.push('/dashboard');
      console.log("Profile and CV updated successfully!");
    },
    onError: (error: any) => {
      setSubmissionError(error.message || 'An unexpected error occurred during update.');
    },
  });

  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty, setHasUnsavedChanges]);

  const { BlockerDialog } = useNavigationBlocker({
    when: isDirty,
    onConfirm: () => {
      reset(); 
      setHasUnsavedChanges(false);
    },
    onSave: async () => {
      const formValues = getValues();
      try {
        await updateMutation.mutateAsync(formValues);
        return true; 
      } catch (e) {
        return false; 
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
      await updateMutation.mutateAsync(data); 
    } catch (e) {
      // Error handled by onError callback
    }
  };

  const [fieldStatus, setFieldStatus] = useState<Record<string, 'dirty' | 'saving' | 'saved'>>({});

  const autoSaveMutation = useMutation({
    mutationFn: (fieldData: { fieldName: keyof ProfileCVFormInputs; value: any }) => {
      const payload = { [fieldData.fieldName]: fieldData.value };
      return updateUserProfileCvData(session!.access_token!, payload as ProfileCVFormInputs);
    },
    onMutate: (variables) => {
      setFieldStatus(prev => ({ ...prev, [variables.fieldName]: 'saving' }));
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['userProfileCv', session?.access_token], data);
      setFieldStatus(prev => ({ ...prev, [variables.fieldName]: 'saved' }));
    },
    onError: (error, variables) => {
      setFieldStatus(prev => ({ ...prev, [variables.fieldName]: 'dirty' }));
    },
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const fieldName = e.target.name as keyof ProfileCVFormInputs;
    const isFieldDirty = getValues(fieldName) !== (userData?.[fieldName] || '');
    
    if (isFieldDirty) {
      autoSaveMutation.mutate({ fieldName, value: getValues(fieldName) });
    }
  };

  if (isUserCvLoading) {
    return <div className="p-4 text-center">Loading Profile and CV data...</div>;
  }

  if (isUserCvError && userCvError.message !== 'PROFILE_NOT_FOUND') {
    return <div className="p-4 text-center text-red-600">Error loading Profile and CV data: {userCvError?.message}</div>;
  }
  
  if (isUserCvError && userCvError.message === 'PROFILE_NOT_FOUND') {
      return <div className="p-4 text-center">Redirecting to profile creation...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Your Profile and CV</h2>
      
      {submissionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{submissionError}</span>
        </div>
      )}

      {/* Profile Fields */}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <StatefulTextbox
          id="full_name"
          type="text"
          {...register('full_name', { required: 'Full Name is required' })}
          status={fieldStatus.full_name}
          data-testid="fullName-input"
          disabled={updateMutation.isPending}
          onBlur={handleBlur}
        />
        {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
      </div>

      <div>
        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <StatefulTextbox
          id="date_of_birth"
          type="date"
          {...register('date_of_birth', { required: 'Date of Birth is required' })}
          status={fieldStatus.date_of_birth}
          data-testid="dateOfBirth-input"
          disabled={updateMutation.isPending}
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
          disabled={updateMutation.isPending}
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
        <StatefulTextbox
          id="phone_number"
          type="tel"
          {...register('phone_number', { required: 'Phone Number is required' })}
          status={fieldStatus.phone_number}
          data-testid="phoneNumber-input"
          disabled={updateMutation.isPending}
          onBlur={handleBlur}
        />
        {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <StatefulTextbox
          id="address"
          type="text"
          {...register('address', { 
            required: 'Address is required',
            validate: (value) => value.trim().length > 0 || 'Address cannot be empty or whitespace only'
          })}
          status={fieldStatus.address}
          data-testid="address-input"
          disabled={updateMutation.isPending}
          onBlur={handleBlur}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

<div>
        <label htmlFor="cv_content" className="block text-sm font-medium text-gray-700">CV Content</label>
        <StatefulTextbox
          as="textarea"
          id="cv_content"
          className="min-h-[250px]"
          {...register('cv_content', { required: 'CV Content is required' })}
          status={fieldStatus.cv_content}
          data-testid="cvContent-textarea"
          disabled={updateMutation.isPending}
          onBlur={handleBlur}
        />
        {errors.cv_content && <p className="mt-1 text-sm text-red-600">{errors.cv_content.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        data-testid="submit-button"
        disabled={updateMutation.isPending || isUserCvLoading}
      >
        {updateMutation.isPending ? 'Saving...' : 'Save Profile and CV'}
      </button>

      <BlockerDialog />
    </form>
  );
};

export default EditCVForm;