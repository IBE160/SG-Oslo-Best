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
