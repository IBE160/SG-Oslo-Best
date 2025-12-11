"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useUnsavedChanges } from "@/context/UnsavedChangesContext";
import { StatefulTextbox } from "@/components/ui/StatefulTextbox";

const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  cv_content: z.string().min(1, "CV content is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type SaveState = 'default' | 'unsaved' | 'saving' | 'saved';
type FieldSaveStates = Record<keyof ProfileFormData, SaveState>;

async function fetchUserProfile() {
  const response = await fetch("/api/v1/users/me/cv");
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch user profile");
  const data = await response.json();
  // Ensure date is in YYYY-MM-DD format for the input
  if (data.date_of_birth) {
    data.date_of_birth = data.date_of_birth.split('T')[0];
  }
  return data;
}

async function updateUserProfile(data: Partial<ProfileFormData>) {
  const response = await fetch("/api/v1/users/me/cv", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
}

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setHasUnsavedChanges } = useUnsavedChanges();

  const [fieldSaveStates, setFieldSaveStates] = useState<FieldSaveStates>({
    full_name: 'default',
    date_of_birth: 'default',
    gender: 'default',
    phone_number: 'default',
    address: 'default',
    cv_content: 'default',
  });

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    getValues,
    trigger,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });
  
  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
    }
  }, [userProfile, reset]);
  
  useEffect(() => {
    const hasDirtyFields = Object.keys(dirtyFields).length > 0;
    setHasUnsavedChanges(hasDirtyFields);
    
    // Update save states for fields that become dirty
    const newFieldSaveStates = { ...fieldSaveStates };
    for (const fieldName in dirtyFields) {
        const key = fieldName as keyof ProfileFormData;
        if (dirtyFields[key]) {
            newFieldSaveStates[key] = 'unsaved';
        }
    }
    setFieldSaveStates(newFieldSaveStates);

  }, [dirtyFields, setHasUnsavedChanges]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data, variables) => {
        const updatedFieldName = Object.keys(variables)[0] as keyof ProfileFormData;
        setFieldSaveStates(prev => ({ ...prev, [updatedFieldName]: 'saved' }));
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        toast({ title: "Success", description: `${updatedFieldName.replace('_', ' ')} saved!` });
    },
    onError: (error, variables) => {
      const updatedFieldName = Object.keys(variables)[0] as keyof ProfileFormData;
      setFieldSaveStates(prev => ({ ...prev, [updatedFieldName]: 'unsaved' }));
      toast({
        title: "Error",
        description: `Failed to save ${updatedFieldName.replace('_', ' ')}.`,
        variant: "destructive",
      });
    },
  });
  
  const handleBlur = async (fieldName: keyof ProfileFormData) => {
    const isDirty = dirtyFields[fieldName];
    if (!isDirty) return;

    const isValid = await trigger(fieldName);
    if (!isValid) return;

    setFieldSaveStates(prev => ({ ...prev, [fieldName]: 'saving' }));
    const value = getValues(fieldName);
    mutation.mutate({ [fieldName]: value });
  };

  const handleSaveAll = () => {
    const dirtyFieldNames = Object.keys(dirtyFields) as (keyof ProfileFormData)[];
    const dataToSave: Partial<ProfileFormData> = {};
    dirtyFieldNames.forEach(fieldName => {
        dataToSave[fieldName] = getValues(fieldName);
    });
    // This needs a separate mutation or logic to handle multiple fields update feedback
    mutation.mutate(dataToSave); 
  };


  if (isLoading) return <div>Loading...</div>;
  if (!userProfile) return <div>Please create a profile first.</div>; // Or redirect to create page

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile and CV</h1>
      <form onSubmit={handleSubmit(handleSaveAll)} className="flex flex-col gap-6">
        
        <div className="flex flex-col gap-2">
          <label className="font-medium">Full Name</label>
          <StatefulTextbox {...register("full_name")} onBlur={() => handleBlur('full_name')} saveState={fieldSaveStates.full_name} />
          {errors.full_name && <p className="text-red-500">{errors.full_name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Date of Birth</label>
          <StatefulTextbox type="date" {...register("date_of_birth")} onBlur={() => handleBlur('date_of_birth')} saveState={fieldSaveStates.date_of_birth} />
          {errors.date_of_birth && <p className="text-red-500">{errors.date_of_birth.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Gender</label>
          <StatefulTextbox {...register("gender")} onBlur={() => handleBlur('gender')} saveState={fieldSaveStates.gender} />
          {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Phone Number</label>
          <StatefulTextbox {...register("phone_number")} onBlur={() => handleBlur('phone_number')} saveState={fieldSaveStates.phone_number} />
          {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Address</label>
          <StatefulTextbox {...register("address")} onBlur={() => handleBlur('address')} saveState={fieldSaveStates.address} />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
            <label className="font-medium">CV Content</label>
            <StatefulTextbox
                {...register("cv_content")}
                onBlur={() => handleBlur('cv_content')}
                saveState={fieldSaveStates.cv_content}
                className="min-h-[200px]"
            />
            {errors.cv_content && <p className="text-red-500">{errors.cv_content.message}</p>}
        </div>

        <button
          type="submit"
          disabled={Object.keys(dirtyFields).length === 0 || mutation.isPending}
          className="p-3 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {mutation.isPending ? "Saving..." : "Save All Changes"}
        </button>
      </form>
    </main>
  );
}

