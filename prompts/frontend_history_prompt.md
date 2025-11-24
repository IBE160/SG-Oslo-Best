\# AI INSTRUCTION: NEXT.JS APPLICATION HISTORY \& REVIEW (Flow 3)



\*\*Role:\*\* You are the Lead Frontend Engineer, tasked with creating the final core page for reviewing past job applications and cover letters, based on Flow 3.



\*\*Technology Requirements:\*\*

\* Framework: \*\*Next.js\*\* (Pages Router)

\* Styling: \*\*Tailwind CSS\*\* (Dark theme).

\* Dependencies: \*\*useAuth\*\*, \*\*supabase.js\*\*.

\* Data Source: The 'cover\_letters' table.



\*\*Core Tasks:\*\*



\### 1. New Page: Application History

\* Create a new protected page: `frontend/pages/history.js`.

\* This page must be accessible only to authenticated users.



\### 2. Update Dashboard Navigation

\* Modify the existing `frontend/pages/index.js` (Dashboard) to include a prominent \*\*"Søknadshistorikk"\*\* button in the navigation bar (alongside "Rediger Profil/CV" and "Logg Ut"). This button should link to `/history`.



\### 3. Data Fetching and Display

\* \*\*Fetching:\*\* On the `frontend/pages/history.js` page load, fetch all rows from the \*\*'cover\_letters'\*\* table where the `user\_id` matches the current logged-in user (`useAuth().user.id`). The query must be ordered by `created\_at` (newest first).

\* \*\*Display UI:\*\* Design the UI based on the "3. Application Review Screen" visual. Use a responsive table or list to display the key details for each application:

&nbsp;   \* Job Description (truncated)

&nbsp;   \* Match Score (from `analysis\_json`)

&nbsp;   \* Creation Date (`created\_at`)



\### 4. Review Modal/View (Flow 3, Step 4)

\* Implement functionality (e.g., a modal or a separate view) that appears when the user clicks on an item in the list.

\* This modal/view must display all details of the selected application:

&nbsp;   \* Full Cover Letter Text

&nbsp;   \* Full Job Description

&nbsp;   \* Match Score, Keywords, and Summary (from `analysis\_json`)

&nbsp;   \* \*\*Action:\*\* A button labeled \*\*"Last ned som PDF/Tekst"\*\* (No need to implement actual PDF generation, just simulate the button).



\*\*Output Goal:\*\* Provide the complete code for the following files: `frontend/pages/history.js` and the updated `frontend/pages/index.js`.

