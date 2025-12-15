'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const formSchema = z.object({
  jobAdvertisementText: z.string().min(1, 'Job advertisement cannot be empty.'),
  instructionsText: z.string().optional(),
});

type JobApplicationFormValues = z.infer<typeof formSchema>;

// This is a placeholder for the actual API call
const createJobApplication = async (data: JobApplicationFormValues) => {
  console.log('Submitting to API:', data);
  const response = await fetch('http://localhost:8000/api/v1/job-applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function JobApplicationForm() {
  const [isJobAdEmpty, setIsJobAdEmpty] = useState(true);

  const form = useForm<JobApplicationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobAdvertisementText: '',
      instructionsText: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createJobApplication,
    onSuccess: () => {
      console.log('Job application created successfully!');
      // Here you would typically show a success toast or redirect
    },
    onError: (error) => {
      console.error('Error creating job application:', error);
      // Here you would show an error message
    },
  });

  const onSubmit = (data: JobApplicationFormValues) => {
    mutation.mutate(data);
  };

  const handleJobAdChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsJobAdEmpty(event.target.value === '');
    form.setValue('jobAdvertisementText', event.target.value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="jobAdvertisementText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Advertisement</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste the job advertisement here"
                  {...field}
                  onChange={handleJobAdChange}
                  data-testid="job-ad-textarea"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructionsText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Optional Instructions</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., focus on my project management skills"
                  {...field}
                  data-testid="instructions-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isJobAdEmpty || mutation.isPending} data-testid="generate-button">
          {mutation.isPending ? 'Generating...' : 'Generate'}
        </Button>
      </form>
    </Form>
  );
}
