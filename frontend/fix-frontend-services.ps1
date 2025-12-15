# Auto-generated frontend services fix
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$servicesPath = Join-Path $root "services"

if (-Not (Test-Path $servicesPath)) {
    New-Item -ItemType Directory -Path $servicesPath | Out-Null
    Write-Host "?? Created folder: services"
} else {
    Write-Host "?? Folder already exists: services"
}

Set-Content (Join-Path $servicesPath "supabaseClient.ts") @"
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
"@
Write-Host "? Created supabaseClient.ts"

Set-Content (Join-Path $servicesPath "jobApplications.ts") @"
export async function createJobApplication(token: string, payload: any) {
  const response = await fetch("http://localhost:8000/api/v1/job-applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to create job application");
  }

  return response.json();
}

export async function getJobApplications(token: string) {
  const response = await fetch("http://localhost:8000/api/v1/job-applications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to fetch job applications");
  }

  return response.json();
}
"@
Write-Host "? Created jobApplications.ts"

Write-Host "?? All services created successfully!"
