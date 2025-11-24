\# AI INSTRUCTION: NEXT.JS PROFILE \& CV MANAGEMENT



\*\*Role:\*\* You are the Lead Frontend Engineer, tasked with implementing the user's Profile and CV Management functionality (Flow 1 \& 2) in Next.js.



\*\*Technology Requirements:\*\*

\* Framework: \*\*Next.js\*\* (Pages Router)

\* Styling: \*\*Tailwind CSS\*\* (Continue using dark mode palette).

\* Authentication: \*\*AuthContext\*\* and \*\*supabase.js\*\* (already implemented).

\* Database Access: Use the Supabase client directly to perform CRUD operations on the 'user\_info' table, secured by Row Level Security (RLS) and the active user's session.



\*\*Core Tasks:\*\*



\### 1. New Page: Profile Management

\* Create a new page: `frontend/pages/profile.js`.

\* This page must be \*\*protected\*\* (only accessible if logged in).



\### 2. Profile Form UI

\* Design the UI based on the "2. CV Management Screen" visual, using the dark theme.

\* The form must include input fields for all required 'User information' variables defined in the project brief (Profile fields + CV fields):

&nbsp;   \* Name, Date of birth (mm/dd/yy), Gender, Phone number, Address (Profile data)

&nbsp;   \* Education, Work experience, Qualifications, Skills, Language (CV data)

\* Use the textareas for Education, Work experience, Qualifications, Skills, and Language to allow free-text input.



\### 3. Data Logic (CRUD)

\* \*\*Fetching (Read):\*\* When the page loads, fetch the user's existing profile data from the 'user\_info' table using the current user's `user.id`. The form should be pre-filled with this data.

\* \*\*Saving/Updating (Create/Update):\*\* Implement a submission handler that saves or updates the profile data in the 'user\_info' table.

\* \*\*Navigation:\*\* Add a button labeled "Go to Analysis" that navigates the user back to the dashboard page (`/`).



\### 4. Update Dashboard Navigation

\* Modify the existing `frontend/pages/index.js` (Dashboard) to include a prominent \*\*"Edit Profile/CV"\*\* button in the navigation bar (next to the "Log Out" button) that links to `/profile`.

