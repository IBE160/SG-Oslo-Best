"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GenerationStatusIndicator } from "@/components/ui/GenerationStatusIndicator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 🔥 IMPORT AUTH HERE
import { useAuth } from "@/context/AuthContext";

type JobApplication = {
  id: string;
  jobAdvertisementText: string;
  instructionsText: string | null;
  status: string;
};

// Fetch with Authorization
async function fetchJobApplications(token: string): Promise<{ items: JobApplication[] }> {
  const response = await fetch("http://localhost:8000/api/v1/job-applications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}

export default function DashboardPage() {
  const [jobAdText, setJobAdText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLetters, setGeneratedLetters] = useState<{ id: string; text: string }[]>([]);
  const [currentJobApplicationId, setCurrentJobApplicationId] = useState<string | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 🔥 Get token from AuthContext
  const { session } = useAuth();
  const token = session?.access_token;

  // Load job applications only after token exists
  const { data: jobApplicationsData, isLoading: isLoadingApplications } = useQuery({
    queryKey: ["jobApplications"],
    queryFn: () => fetchJobApplications(token!),
    enabled: !!token,
  });

  // DELETE Application
  const deleteApplicationMutation = useMutation({
    mutationFn: (applicationId: string) =>
      fetch(`http://localhost:8000/api/v1/job-applications/${applicationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      toast({
        title: "Success",
        description: "Application deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // SAVE Cover Letter
  const saveCoverLetterMutation = useMutation({
    mutationFn: (letterContent: string) =>
      fetch("http://localhost:8000/api/v1/cover-letters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: letterContent,
          job_application_id: currentJobApplicationId,
        }),
      }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Cover letter saved!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save cover letter.",
        variant: "destructive",
      });
    },
  });

  // GENERATE Cover Letter
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // FIRST time – create a job application
      if (generatedLetters.length === 0) {
        const appResponse = await fetch("http://localhost:8000/api/v1/job-applications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobAdvertisementText: jobAdText,
            instructionsText: instructionsText,
          }),
        });

        if (!appResponse.ok) throw new Error("Failed to create job application");

        const appData = await appResponse.json();
        setCurrentJobApplicationId(appData.id);
        queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      }

      // Generate AI text
      const genResponse = await fetch("http://localhost:8000/api/v1/generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_ad: jobAdText,
          instructions: instructionsText,
          user_cv: "My amazing CV...",
        }),
      });

      if (!genResponse.ok) throw new Error("Failed to generate cover letter");

      const genData = await genResponse.json();

      setGeneratedLetters((prev) => [
        ...prev,
        { id: `v${prev.length + 1}`, text: genData.generated_text },
      ]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      {isLoading && <GenerationStatusIndicator />}

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Existing Job Applications</h1>
        {isLoadingApplications ? (
          <p>Loading applications...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {jobApplicationsData?.items.map((app) => (
              <div key={app.id} className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-bold">ID: {app.id}</p>
                  <p>{app.jobAdvertisementText.substring(0, 100)}...</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/job-applications/${app.id}/edit`}>
                    <button className="p-2 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                      Edit
                    </button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="p-2 rounded-md font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the job application.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteApplicationMutation.mutate(app.id)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <h1 className="text-2xl font-bold mb-6">Create or Generate Cover Letter</h1>
      <fieldset disabled={isLoading}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Job Advertisement</label>
            <textarea
              className="border p-3 rounded-md min-h-[150px]"
              placeholder="Paste job ad here..."
              value={jobAdText}
              onChange={(e) => setJobAdText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Instructions</label>
            <textarea
              className="border p-3 rounded-md"
              placeholder="Optional instructions..."
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!jobAdText || isLoading}
            className="p-3 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {isLoading ? "Generating..." : "Generate Cover Letter"}
          </button>
        </div>
      </fieldset>

      {generatedLetters.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Generated Cover Letter</h2>

          <Tabs defaultValue="v1" className="w-full">
            <TabsList>
              {generatedLetters.map((letter, index) => (
                <TabsTrigger key={letter.id} value={letter.id}>
                  Version {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {generatedLetters.map((letter) => (
              <TabsContent key={letter.id} value={letter.id}>
                <div className="border p-4 rounded-md bg-gray-50">{letter.text}</div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="p-3 rounded-md font-bold text-white bg-gray-600 hover:bg-gray-700 transition-colors"
                  >
                    Regenerate
                  </button>

                  <button
                    onClick={() => saveCoverLetterMutation.mutate(letter.text)}
                    disabled={saveCoverLetterMutation.isPending}
                    className="p-3 rounded-md font-bold text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    {saveCoverLetterMutation.isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </main>
  );
}
