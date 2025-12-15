"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const updateApplicationSchema = z.object({
  jobAdvertisementText: z.string().min(1, "Job advertisement is required"),
  instructionsText: z.string().optional(),
});

type UpdateApplicationFormData = z.infer<typeof updateApplicationSchema>;

async function fetchJobApplication(id: string, token: string) {
  const response = await fetch(`http://localhost:8000/api/v1/job-applications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch job application");
  }
  return response.json();
}

async function updateJobApplication({
  id,
  token,
  data,
}: {
  id: string;
  token: string;
  data: UpdateApplicationFormData;
}) {
  const response = await fetch(`http://localhost:8000/api/v1/job-applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update job application");
  }

  return response.json();
}

export default function EditJobApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { session } = useAuth(); // ← GET TOKEN

  const token = session?.access_token;

  const {
    data: jobApplication,
    isLoading,
  } = useQuery({
    queryKey: ["jobApplication", id],
    queryFn: () => fetchJobApplication(id, token!),
    enabled: !!id && !!token,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateApplicationFormData>({
    resolver: zodResolver(updateApplicationSchema),
  });

  useEffect(() => {
    if (jobApplication) {
      reset(jobApplication);
    }
  }, [jobApplication, reset]);

  const mutation = useMutation({
    mutationFn: (data: UpdateApplicationFormData) =>
      updateJobApplication({ id, token: token!, data }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Job application updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  if (isLoading || !token) {
    return <div>Loading...</div>;
  }

    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Job Application</h1>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <div className="mb-6">
            <label htmlFor="jobAdvertisementText" className="block text-sm font-medium mb-2">
              Job Advertisement
            </label>
            <textarea
              id="jobAdvertisementText"
              {...register("jobAdvertisementText")}
              className="w-full border rounded-md p-2"
              rows={6}
            />
            {errors.jobAdvertisementText && (
              <p className="text-red-500 text-sm mt-1">{errors.jobAdvertisementText.message}</p>
            )}
          </div>
  
          <div className="mb-6">
            <label htmlFor="instructionsText" className="block text-sm font-medium mb-2">
              Instructions
            </label>
            <textarea
              id="instructionsText"
              {...register("instructionsText")}
              className="w-full border rounded-md p-2"
              rows={4}
            />
            {errors.instructionsText && (
              <p className="text-red-500 text-sm mt-1">{errors.instructionsText.message}</p>
            )}
          </div>
  
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {mutation.isPending ? "Updating..." : "Update Application"}
          </button>
        </form>
      </main>
    );
  }
