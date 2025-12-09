Okay, BIP. I understand you'd like to proceed with manual testing. Here are detailed instructions to manually verify the implemented features for Story 2.4: Update User Profile & CV with Hybrid Save.

Before you begin:
1.  Ensure both your frontend and backend applications are running.
    *   **Frontend:** Navigate to `frontend/` and run `npm run dev` (or `pnpm run dev`).
    *   **Backend:** Navigate to `backend/` and activate your virtual environment, then run `uvicorn backend.app.main:app --reload`.
2.  Make sure you have a Supabase project set up and configured for both frontend (`.env.local` in `frontend/`) and backend (`.env` in `backend/`).
3.  **Crucially, ensure you have an existing user registered and logged in.** If not, you'll need to use the registration and login flows first.

---

### **Manual Test Case 1: Initial Profile & CV Creation (If no existing profile)**

*   **Objective:** Verify that a new user can successfully create their profile and CV.
*   **Steps:**
    1.  **Register a New User:** If you don't have a user without a profile, register a new one through the frontend's `/` page.
    2.  **Log In:** Log in with the newly registered user. You should be redirected to a `/cv-creation` or similar page showing the "Create Your Profile and CV" form.
    3.  **Fill in All Fields:**
        *   Provide a `Full Name`, `Date of Birth`, `Gender`, `Phone Number`, `Address`.
        *   Enter some text into the `CV Content` textarea.
    4.  **Submit the Form:** Click the "Create Profile and CV" button.
    5.  **Verify Redirection:** You should be redirected to the dashboard (e.g., `/dashboard`).
    6.  **Verify Data Persistence:** Log out and log back in. Navigate to the profile editing page (e.g., `/dashboard/profile`). The fields should be pre-populated with the data you entered.

---

### **Manual Test Case 2: Editing Existing Profile & CV**

*   **Objective:** Verify that a logged-in user can modify their profile and CV data.
*   **Steps:**
    1.  **Log In:** Log in with a user who already has a profile and CV created (from Test Case 1 or an existing user).
    2.  **Navigate to Profile Edit Page:** Go to the profile editing page (e.g., `/dashboard/profile`). You should see your existing data pre-populated.
    3.  **Modify a Field:** Change the `Full Name` field.
    4.  **Verify "Unsaved Changes" Indicator:** Observe that the "Unsaved changes..." indicator appears (usually bottom right). The "Save Profile and CV" button should become enabled.
    5.  **Trigger Auto-Save (onBlur):** Click outside the `Full Name` input field (e.g., click on the page heading).
    6.  **Verify Indicator Disappears:** The "Unsaved changes..." indicator should disappear, and the "Save Profile and CV" button should become disabled.
    7.  **Verify Data Persistence:** Refresh the page. The `Full Name` should reflect the change you just made.
    8.  **Modify Multiple Fields:** Change the `Address` and `CV Content` fields.
    9.  **Verify "Unsaved Changes" Indicator:** The indicator should reappear, and the button should be enabled.
    10. **Trigger Manual Save:** Click the "Save Profile and CV" button.
    11. **Verify Indicator Disappears:** The indicator should disappear, and the button should become disabled.
    12. **Verify Data Persistence:** Refresh the page. Both `Address` and `CV Content` should reflect the changes.

---

### **Manual Test Case 3: Validation Errors**

*   **Objective:** Verify that validation errors are displayed for mandatory fields left empty.
*   **Steps:**
    1.  **Log In & Navigate:** Log in to a user with an existing profile and go to the profile editing page (e.g., `/dashboard/profile`).
    2.  **Clear a Field:** Clear the `Full Name` field.
    3.  **Trigger Validation (onBlur):** Click outside the `Full Name` input.
    4.  **Verify Error Message:** An inline error message "Full Name is required" should appear below the input. The "Save Profile and CV" button should remain disabled if `isDirty` and there are validation errors.
    5.  **Clear Another Field:** Clear the `CV Content` field.
    6.  **Attempt Manual Save:** Click the "Save Profile and CV" button.
    7.  **Verify Multiple Errors:** Both "Full Name is required" and "CV Content is required" errors should be visible. The form should not submit.
    8.  **Fill Fields Back:** Re-enter valid data into the `Full Name` and `CV Content` fields. The error messages should disappear.
    9.  **Submit Successfully:** Click the "Save Profile and CV" button. It should now submit successfully (as per Test Case 2).

---

### **Manual Test Case 4: Navigation Blocker**

*   **Objective:** Verify the confirmation modal appears when attempting to navigate away with unsaved changes.
*   **Steps:**
    1.  **Log In & Navigate:** Log in to a user with an existing profile and go to the profile editing page (e.g., `/dashboard/profile`).
    2.  **Make Changes:** Modify the `Full Name` field (but do NOT auto-save or manually save yet). The "Unsaved changes..." indicator should be visible.
    3.  **Attempt Client-Side Navigation:** Click on a navigation link to another page (e.g., to `/dashboard`).
    4.  **Verify Confirmation Modal:** A modal titled "You have unsaved changes" should appear. It should offer "Save & Leave", "Discard Changes", and "Cancel" options.
    5.  **Test "Cancel" Option:** Click "Cancel". The modal should close, and you should remain on the profile editing page. The "Unsaved changes..." indicator should still be visible.
    6.  **Attempt Navigation (Discard):** Again, make a change and attempt to navigate away. This time, click "Discard Changes" in the modal.
    7.  **Verify Navigation & Discard:** You should be navigated to the target page (e.g., `/dashboard`), and the "Unsaved changes..." indicator should be gone. Navigate back to the profile edit page; your previous changes should NOT be there.
    8.  **Attempt Navigation (Save & Leave):** Make a new change to `Full Name`. Attempt to navigate away and click "Save & Leave" in the modal.
    9.  **Verify Save & Navigation:** You should be navigated to the target page. Navigate back to the profile edit page; your changes to `Full Name` should be saved and present.
    10. **Test Browser Reload/Close (Optional):** While on the profile edit page with unsaved changes, try to refresh your browser or close the tab/window. The browser's native "Leave site?" warning should appear. (The custom modal will not trigger for browser-level navigation).

---

### **Manual Test Case 5: Supabase RLS Policy Verification (Critical Backend Security)**

*   **Objective:** Manually verify that Supabase's Row Level Security policies prevent unauthorized access or modification of other users' data.
*   **Steps:**
    1.  **Access Supabase Dashboard:** Log in to your Supabase project dashboard.
    2.  **Navigate to Authentication -> Users:** Note down the `UUID` for at least two different registered users (User A and User B).
    3.  **Navigate to Database -> Table Editor:**
        *   **Select `profiles` table:**
            *   Try to directly `UPDATE` a record belonging to User A while authenticated as User B (e.g., by changing the `user_id` in the SQL Editor or by attempting to craft a request via Postman/Insomnia with User B's JWT but User A's `user_id` as the target). This should be denied by RLS.
            *   Try to `SELECT` a record belonging to User A while authenticated as User B. This should also be denied/return no rows.
        *   **Select `cv_documents` table:** Repeat the same `UPDATE` and `SELECT` tests for `cv_documents` records.
    4.  **Navigate to Authentication -> Policies:**
        *   **Review `profiles` table policies:** Ensure there's a policy for `SELECT` that allows users to view their own profile (`USING (auth.uid() = user_id)`) and similar policies for `INSERT` and `UPDATE`.
        *   **Review `cv_documents` table policies:** Ensure there's a policy for `SELECT` that allows users to view their own CV (`USING (auth.uid() = user_id)`) and similar policies for `INSERT` and `UPDATE`.
    5.  **Test Backend API with Postman/Insomnia (Advanced):**
        *   Obtain a valid JWT for User A (e.g., by logging in User A through the frontend and inspecting network requests, or directly via Supabase Auth API).
        *   Make a `PATCH` request to `/api/v1/users/me/cv` with User A's JWT in the `Authorization: Bearer` header. Try to include fields like `full_name` or `cv_full_text`. This should succeed.
        *   Now, try to manually modify the `user_id` being sent in the backend request (if you were to modify the `get_current_user_id` dependency mock, for example, or if you were using an unprotected endpoint). This is primarily covered by the RLS.

---

This comprehensive manual testing approach should allow you to verify all aspects of the implemented hybrid save, validation, navigation blocker, and critical backend security for Story 2.4. Let me know if you need any clarification on these steps.