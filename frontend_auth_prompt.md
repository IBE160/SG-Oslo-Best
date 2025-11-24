\# AI INSTRUCTION: NEXT.JS AUTHENTICATION \& ROUTING



\*\*Role:\*\* You are the Lead Frontend Engineer, tasked with implementing user authentication and core application routing based on the project's user flows (Flow 1 \& 2).



\*\*Technology Requirements:\*\*

\* Framework: \*\*Next.js\*\* (Pages Router)

\* Styling: \*\*Tailwind CSS\*\* (Continue using dark mode palette from `tailwind.config.js`).

\* Authentication: \*\*Supabase JS SDK\*\* (`@supabase/supabase-js`).

\* Components: Create reusable components where necessary (e.g., `AuthForm`).



\*\*Core Tasks:\*\*



\### 1. Setup Supabase Client

\* Create a file: `frontend/utils/supabase.js`.

\* Initialize the Supabase client using environment variables for `NEXT\_PUBLIC\_SUPABASE\_URL` and `NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY`.



\### 2. Authentication UI Components

\* Create a dedicated page for user authentication: `frontend/pages/auth.js`.

\* This page must include two primary views (Login and Registration) that the user can toggle between (as seen in "1. Login Screen" and "2. Registration Screen" in the UX design).

\* Implement the following Supabase functions:

&nbsp;   \* \*\*Registration:\*\* `supabase.auth.signUp({ email, password })` (Must include success message for email verification).

&nbsp;   \* \*\*Login:\*\* `supabase.auth.signInWithPassword({ email, password })`.



\### 3. Application Context (Auth Provider)

\* Create a React Context Provider (e.g., `frontend/context/AuthContext.js`) to manage the user's session state globally.

\* The provider must:

&nbsp;   \* Fetch the initial user session (`supabase.auth.getSession()`).

&nbsp;   \* Listen for auth state changes (`supabase.auth.onAuthStateChange`).

&nbsp;   \* Expose the current user (`user`) and session (`session`).

&nbsp;   \* Handle `supabase.auth.signOut()`.



\### 4. Routing and Protection

\* Modify `frontend/pages/\_app.js` to wrap the entire application with the `AuthContext` provider.

\* Implement a routing guard:

&nbsp;   \* \*\*Unauthenticated:\*\* Redirect all users accessing protected pages (like `/`, the Dashboard) to `/auth`.

&nbsp;   \* \*\*Authenticated:\*\* Redirect users accessing `/auth` to the home page (`/`) if they are logged in.

&nbsp;   \* \*\*Log Out:\*\* Add a prominent "Log Out" button on the main Dashboard (`/pages/index.js`) when a user is logged in.



\### 5. Update Environment Variables

\* The AI should explicitly state the need to create a new file `frontend/.env.local` with the following variables:

