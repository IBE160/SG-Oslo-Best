"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const [jobAdText, setJobAdText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobAdvertisementText: jobAdText,
          instructionsText: instructionsText,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Success",
        description: "Application generated successfully!",
      });
      
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
      <h1 className="text-2xl font-bold mb-6">Create Job Application</h1>

      <div className="flex flex-col gap-6">
        
        <div className="flex flex-col gap-2">
          <label className="font-medium">Job Advertisement</label>
          <textarea
            data-testid="job-ad-textarea"
            placeholder="Paste job ad here..."
            className="border p-3 rounded-md min-h-[150px]"
            value={jobAdText}
            onChange={(e) => setJobAdText(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Instructions</label>
          <textarea
            data-testid="instructions-input"
            placeholder="Optional instructions..."
            className="border p-3 rounded-md"
            value={instructionsText}
            onChange={(e) => setInstructionsText(e.target.value)}
          />
        </div>

        <button
          data-testid="generate-button"
          onClick={handleGenerate}
          disabled={!jobAdText || isLoading}
          className="p-3 rounded-md font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {isLoading ? "Generating..." : "Generate Application"}
        </button>
      </div>
    </main>
  );
}

