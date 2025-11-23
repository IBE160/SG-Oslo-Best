\# AI INSTRUCTION: SETUP SUPABASE DATABASE



\*\*Role:\*\* Supabase \& PostgreSQL Architect.

\*\*Task:\*\* Write the SQL scripts to configure the database in the Supabase Dashboard.



\*\*Integration Requirements:\*\*

1\.  \*\*Authentication:\*\* We are using Supabase Auth. Do not create a separate password table.

2\.  \*\*Tables Structure:\*\*

&nbsp;   \* `public.profiles`: Needs to reference `auth.users` (UUID) via a Foreign Key.

&nbsp;   \* `public.cv\_entries`: Stores the `raw\_text` and `analysis\_json`.

3\.  \*\*Security (Crucial):\*\*

&nbsp;   \* Enable \*\*Row Level Security (RLS)\*\* on all tables.

&nbsp;   \* Write a specific Policy allowing users to ONLY select/insert their own data (`auth.uid() = user\_id`).

4\.  \*\*Automation:\*\*

&nbsp;   \* Create a PostgreSQL Trigger: When a new user signs up in Supabase Auth, automatically create a row in `public.profiles`.



\*\*Output Goal:\*\* Generate the exact PostgreSQL code to run in the Supabase SQL Editor.

