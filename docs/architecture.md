# Architecture

## Executive Summary

CVAI Turbo is a web application designed to help university and college students generate tailored cover letters using an AI (Gemini). The core functionality involves users providing their CV information and a job description, upon which the AI generates a customized cover letter. The technical foundation will be a decoupled architecture comprising a Next.js frontend, a FastAPI backend, and Supabase for database and authentication, deployed on Vercel.

The project emphasizes a "Refined Minimalist" UX with key interactive patterns like a "Hybrid Save Model" for CV management and a tabbed interface for comparing regenerated cover letters. Non-functional requirements include robust security via Supabase Row Level Security (RLS) and strong performance considerations, such as server-side rendering. The primary architectural challenges lie in implementing the specific, state-intensive UX patterns and ensuring a secure, scalable, and consistent system.

## Project Initialization

The first implementation story should execute these commands to set up the frontend:

1.  Initialize a new Next.js project (replace `my-app` with your chosen project name):
    ```bash
    npx create-next-app@latest my-app
    ```
    (This will interactively prompt for TypeScript, ESLint, App Router, etc.)

2.  Navigate into the project directory and initialize Shadcn/UI:
    ```bash
    cd my-app
    npx shadcn-ui@latest init
    ```
    (This will interactively configure Tailwind CSS, global CSS, and other UI preferences.)

### Core Technologies

*   **Frontend Framework:** Next.js (with React)
*   **Language:** TypeScript (Frontend), Python (Backend)
*   **UI Framework:** Shadcn/UI (built on Radix UI and Tailwind CSS)
*   **Backend Framework:** FastAPI
*   **Database & Authentication:** Supabase (PostgreSQL with built-in Auth and RLS)
*   **API Communication (Frontend):** React Query (TanStack Query)
*   **Frontend UI State Management:** React Context
*   **Form Management:** React Hook Form
*   **Testing:** Jest (Unit/Component), Playwright (E2E)
*   **Email Service:** Resend
*   **Date/Time Handling:** `date-fns` (Frontend), Python `datetime` (Backend)
*   **Monorepo Tooling:** NPM/PNPM Workspaces
*   **Language/TypeScript:** Yes (chosen during `create-next-app` interactive setup).
*   **Styling Solution:** Tailwind CSS with Shadcn/UI components.
*   **Testing Framework:** Not explicitly provided by this setup; this will be a separate architectural decision.
*   **Linting/Formatting:** ESLint (provided by `create-next-app`). Prettier will likely be added.
*   **Build Tooling:** Next.js integrated build system.
*   **Project Structure:** Standard Next.js project structure (e.g., `/app`, `/public`, `/components`).

## Architectural Decisions To Be Made

Based on the project requirements and the chosen Next.js/Shadcn/UI starter, the following 9 architectural decisions need to be made. They are prioritized to ensure we build a solid foundation first.

### Critical Decisions (Blocking)
*These must be decided to have a functional, testable application.*
1.  **Testing Strategy:** Defining the tools and approach for unit, integration, and end-to-end (E2E) testing.
2.  **API Communication (Frontend):** Choosing the library and pattern for how the Next.js frontend fetches data from the backend (e.g., SWR, React Query).
3.  **State Management (Frontend):** Selecting a library to manage complex UI state for features like the hybrid save and version comparison (e.g., Zustand, React Context).

### Important Decisions (Structural)
*These shape the developer experience and overall structure.*
4.  **Error Handling Strategy:** Creating a consistent plan for managing and displaying errors across the full stack.
5.  **Logging Strategy:** Deciding where and how to log application events and errors.
6.  **Monorepo Strategy:** Selecting the tooling to manage the `frontend` and `backend` in a single repository (e.g., npm workspaces, Turborepo).
7.  **Form Management (Frontend):** Choosing a library to handle complex forms, which is recommended by Shadcn/UI (e.g., React Hook Form).

### Nice-to-Have Decisions (Can be deferred)
*These are needed, but can be decided later if necessary.*
8.  **Email Service:** Selecting a third-party service for sending transactional emails like verification (e.g., Resend).
9.  **Date/Time Handling:** Choosing a library to consistently manage dates and timezones.

## Decision Summary

| Category | Decision | Version(s) | Affects Epics | Rationale |
| --- | --- | --- | --- | --- |
| Testing Strategy | Jest for unit/component tests; Playwright for end-to-end (E2E) tests. | Jest `~30.2.0`, Playwright `~1.56.1` | All | Jest is a popular framework for isolated tests. Playwright is powerful for ensuring the user experience works seamlessly from end to end. |
| API Communication (Frontend) | React Query (TanStack Query) for data fetching and caching. | `~5.90.10` | Epic 2, Epic 3 | Provides a robust solution for managing server state (fetching, caching, etc.), simplifying the implementation of complex UI. |
| State Management (Frontend) | React Context for managing client-side UI state. | N/A | Epic 2, Epic 3 | Built-in to React, avoiding extra dependencies. User preference for familiarity. Developers will need to be mindful of re-render optimizations. |
| Error Handling Strategy | Full-stack consistent approach leveraging FastAPI exception handling, React Error Boundaries, Shadcn/UI Toast for user feedback, and React Query for API error management. | N/A | All | Ensures consistent error communication, graceful degradation, and user-friendly feedback across the application, simplifying debugging and improving UX. |
| Logging Strategy | Cloud Logging Service via Vercel Log Drains, integrated with a service like Logtail. | N/A | All | Provides a centralized, managed, and easy-to-configure logging solution for both frontend and backend, crucial for debugging and application monitoring on Vercel. |
| Monorepo Strategy | NPM/PNPM Workspaces for managing separate `frontend` and `backend` packages within a single repository. | N/A | All | Offers a simple, integrated solution for monorepo management without significant overhead, facilitating code sharing (e.g., TypeScript types) between frontend and backend. |
| Form Management (Frontend) | React Hook Form for managing forms, validation, and submission. | `~7.66.1` | Epic 2, Epic 3 | Highly performant, minimal re-renders, and integrates seamlessly with Shadcn/UI, simplifying complex form handling for a cleaner codebase. |
| Email Service | Resend for transactional email delivery. | `~6.5.2` | Epic 2 | Easy integration, modern developer experience, generous free tier, and strong support for building emails with React components. |
| Date/Time Handling | `date-fns` for frontend (Next.js) for formatting and manipulation; Python `datetime` (with `zoneinfo`) for backend (FastAPI), storing UTC. | `date-fns ~4.1.0` | Epic 2, Epic 3 | Provides consistent and reliable date/time management across the stack, leveraging lightweight, modern libraries for the frontend and robust built-in features for the backend, while minimizing timezone complexities. |


---
*This section replaces the placeholder `Decision Summary` table for now. A summary table will be generated once decisions are made.*

## Project Structure

Based on our decision to use a Monorepo, the project will be organized in a single repository with distinct packages for the frontend, backend, and shared code.

```
/
├── packages/
│   └── shared-types/       # Shared TypeScript types for API contracts
│       └── index.ts
├── frontend/               # Next.js Application
│   ├── app/
│   │   ├── (auth)/         # Route group for auth pages (login/register)
│   │   │   └── page.tsx
│   │   ├── dashboard/      # Main application dashboard
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/         # Shared React components (Shadcn/UI)
│   │   ├── ui/             # Unstyled components from Shadcn
│   │   └── stateful-textbox.tsx
│   ├── lib/                # Libraries, helpers, and React Query setup
│   │   └── query-client.ts
│   ├── styles/
│   │   └── globals.css
│   ├── __tests__/          # Jest unit/component tests
│   ├── playwright/         # Playwright E2E tests
│   ├── next.config.mjs
│   └── package.json
├── backend/                # FastAPI Application
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth.py
│   │   │       ├── users.py
│   │   │       └── generation.py
│   │   ├── core/           # Configuration, settings
│   │   ├── db/             # Database models, Supabase client
│   │   ├── services/       # Business logic (e.g., AI integration)
│   │   └── main.py
│   ├── tests/              # Pytest/Jest tests for the backend
│   └── requirements.txt
├── .gitignore
├── package.json            # Root package.json defining workspaces
└── README.md
```

## Epic to Architecture Mapping

This table shows where the primary work for each epic will take place within the defined project structure.

| Epic | Value | Primary Code Location(s) |
| --- | --- | --- |
| **Epic 1: Foundation & Setup** | Establishes the core technical foundation. | Entire root structure, `frontend/`, `backend/` setup. |
| **Epic 2: User Onboarding & Profile** | Allows users to register, log in, and manage their CV. | `frontend/app/(auth)/`, `frontend/components/`, `backend/app/api/v1/auth.py`, `backend/app/api/v1/users.py` |
| **Epic 3: Core Cover Letter Generation** | Delivers the primary AI-powered generation functionality. | `frontend/app/dashboard/`, `backend/app/api/v1/generation.py`, `backend/services/` |

## Integration Points

The primary integration point between the frontend and backend is a versioned **REST API**.

*   **Communication:** The Next.js frontend will use **React Query** to communicate with the FastAPI backend.
*   **Authentication:** All authenticated requests from the frontend will include a JWT in the `Authorization: Bearer <token>` header, which the backend will validate.
*   **Data Contracts:** Shared TypeScript types will be defined in `/packages/shared-types` to ensure type safety between the client and server.
*   **API Structure:**
    *   Success responses will be wrapped: `{ "data": ... }`.
    *   Error responses will follow the standardized format defined in our Error Handling Strategy.
    *   The API will be versioned (e.g., `/api/v1/`).

## Novel Architectural Patterns

After a thorough review of the Product Requirements Document (PRD) and UX Design Specification, it has been determined that **no novel architectural patterns are required for this project**.

While the application of AI is innovative, the user interactions and system components rely on established, well-understood patterns. The most complex features, such as the "Hybrid Save Model" and "Version Comparison UI", can be implemented effectively using the standard technologies and architectural decisions already outlined in this document. Therefore, we will proceed with a reliable and predictable implementation based on these existing patterns.

## Cross-Cutting Concerns

These are the fundamental "rules of the road" that ensure consistency and proper functioning across the entire application, affecting every epic and story.

**1. Authentication Pattern & Token Handling:**
*   **Decision:** Supabase JWTs will be passed from the frontend to the backend using the standard `Authorization: Bearer <token>` header for all authenticated requests.
*   **Rationale:** This is the industry standard for REST APIs, highly secure, and easily supported by FastAPI and React Query.

**2. API Response Format:**
*   **Decision:** API success responses will use a wrapped data format, e.g., `{ "data": ... }`. Error responses will follow the format defined in the Error Handling Strategy.
*   **Rationale:** Provides a consistent and extensible response structure, allowing for future additions like pagination or metadata without breaking existing frontend parsing logic.

**3. Error Handling Strategy:**
*   **Decision:** Full-stack consistent approach leveraging FastAPI exception handling, React Error Boundaries, Shadcn/UI Toast for user feedback, and React Query for API error management.
*   **Rationale:** Ensures consistent error communication, graceful degradation, and user-friendly feedback across the application.

**4. Logging Strategy:**
*   **Decision:** Cloud Logging Service via Vercel Log Drains, integrated with a service like Logtail.
*   **Rationale:** Provides a centralized, managed, and easy-to-configure logging solution for both frontend and backend for debugging and monitoring.

**5. Date/Time Handling:**
*   **Decision:** `date-fns` for frontend (Next.js) for formatting and manipulation; Python `datetime` (with `zoneinfo`) for backend (FastAPI), storing UTC.
*   **Rationale:** Provides consistent and reliable date/time management across the stack, leveraging lightweight, modern libraries for the frontend and robust built-in features for the backend, while minimizing timezone complexities.

**6. Testing Strategy:**
*   **Decision:** Jest for unit/component tests; Playwright for end-to-end (E2E) tests.
*   **Rationale:** Provides robust quality assurance across all layers of the application.

**7. Monorepo Strategy:**
*   **Decision:** NPM/PNPM Workspaces for managing separate `frontend` and `backend` packages within a single repository.
*   **Rationale:** Simplifies code sharing and dependency management for the entire project.

## Architectural Coherence Validation

A thorough review of the architectural decisions has been completed to ensure coherence, compatibility, and completeness.

*   **Decision Compatibility:** All chosen technologies (Next.js, FastAPI, Supabase, React Query, Shadcn/UI, React Hook Form, etc.) are highly compatible and represent a modern, robust tech stack. There are no version or system conflicts.
*   **Epic Coverage:** The architecture directly supports all defined epics. The foundational, user onboarding, and core generation epics are all fully supported by the decisions made regarding the database, API, authentication, and frontend libraries.
*   **Pattern Completeness:** The defined implementation patterns for naming, structure, and data formats are comprehensive and will ensure a consistent and maintainable codebase.

**Conclusion:** The architecture is validated as coherent and complete. It provides a solid and reliable foundation for the implementation phase.

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents and human developers, preventing conflicts and promoting a cohesive codebase.

### 1. Naming Conventions

*   **Frontend Components (React):** Use **PascalCase** (e.g., `UserCard`, `StatefulTextbox`).
    *   *Example:* `MyButton.tsx`, `UserProfile.tsx`
*   **Frontend Files:** Use **kebab-case** for most files (e.g., `api-client.ts`), but **PascalCase** for component files matching the component name (e.g., `UserCard.tsx`).
    *   *Example:* `my-utils.ts`, `api-routes.ts`, `UserProfile.tsx`
*   **Backend (FastAPI) Endpoints (URLs):** Use **kebab-case** for paths, **plural** for collections, **singular** for specific resources identified by ID.
    *   *Example:* `/api/v1/users` (for all users), `/api/v1/users/{user_id}` (for a specific user).
*   **Database (PostgreSQL) Tables:** Use **lowercase, plural, snake_case** (e.g., `users`, `cover_letters`).
    *   *Example:* `products`, `orders_history`
*   **Database (PostgreSQL) Columns:** Use **lowercase, snake_case** (e.g., `user_id`, `created_at`).
    *   *Example:* `product_name`, `order_date`
*   **Foreign Keys (Database):** Use `referenced_table_singular_id` format (e.g., `user_id` when referencing the `users` table).
    *   *Example:* `category_id`, `product_id`

### 2. Structure Patterns

*   **Component Organization (Frontend):** Feature-sliced (components specific to a page/feature live within that feature's directory). Truly shared reusable components go in `frontend/components/`. Shadcn UI primitives are in `frontend/components/ui/`.
*   **Test File Location:**
    *   **Unit/Component Tests (Jest):** `__tests__` directory alongside the file being tested.
    *   **End-to-End Tests (Playwright):** Central `frontend/playwright/` directory.
*   **Shared Utilities/Logic:**
    *   **Frontend-only:** `frontend/lib/`.
    *   **Backend-only:** `backend/app/services/`.
    *   **Shared (Frontend & Backend):** `packages/shared-types/` (for TypeScript types, especially API contracts).

### 3. Format and Consistency Patterns

*   **API Data Formats:** All data exchanged via our REST API will be in **JSON** format.
*   **Date Formats:** Dates sent to/from the API will be **ISO 8601 strings**. In the UI, `date-fns` will format these for human readability.
*   **API Response Wrappers:** Successful API responses will be wrapped (e.g., `{ "data": [...] }`). Error responses will follow our standardized error handling format.
*   **Logging Format:** All logs sent to our cloud logging service will be structured as **JSON**.

### 4. Communication Patterns (Recap from Cross-Cutting)

*   **API Communication:** Next.js frontend uses React Query to communicate with FastAPI backend.
*   **Authentication:** JWTs from Supabase are passed in `Authorization: Bearer <token>` header.

### 5. Lifecycle/State Management (Recap from Decisions)

*   **Frontend UI State:** Managed using React Context.
*   **Data Fetching State:** Managed using React Query (TanStack Query), handling loading, error, and caching.

### 6. Error Recovery (Recap from Cross-Cutting)

*   **Frontend UI Errors:** Handled by React Error Boundaries.
*   **User Feedback for API Errors:** Global notification/toast system using Shadcn/UI.

### 7. Location Patterns (Recap from Project Structure)

*   **API Route Structure:** Versioned as `/api/v1/...`.
*   **Configuration:** `frontend/next.config.mjs`, `backend/app/core/`.



## Data Architecture

*   **Primary Database:** Supabase (PostgreSQL)
*   **Data Modeling:** Relational database with tables for users, CVs, job applications, and cover letters. Relationships will be defined (e.g., a user has multiple CVs, a CV has multiple cover letters).
*   **Data Isolation:** Row Level Security (RLS) in Supabase will enforce user-specific data access, ensuring users can only access their own data.

## API Contracts

*   **API Type:** RESTful API exposed by FastAPI.
*   **Versioning:** Versioned at `/api/v1/`.
*   **Data Formats:** JSON request/response format for all communication.
*   **Success Responses:** Wrapped in a `data` object, e.g., `{ "data": ... }`.
*   **Error Responses:** Standardized format `{ "message": "...", "code": "...", "details": [...] }`.
*   **Authentication:** JWT in `Authorization: Bearer <token>` header for authenticated requests.
*   **Data Contracts:** Shared TypeScript interfaces defined in `packages/shared-types` for type safety between frontend and backend.

## Security Architecture

*   **Authentication:** Supabase Auth (email/password registration, JWT-based sessions).
*   **Authorization:** Supabase Row Level Security (RLS) for fine-grained, user-specific data access control.
*   **API Keys:** Securely managed using environment variables (e.g., Vercel secrets) for third-party services (Gemini API, Resend API).
*   **Communication:** All traffic between client and server will be encrypted via HTTPS.

## Performance Considerations

*   **Frontend (Next.js):**
    *   Server-Side Rendering (SSR) for fast initial page loads and improved SEO.
    *   React Query for efficient data fetching, caching, and background revalidation, reducing unnecessary network requests.
*   **Backend (FastAPI):**
    *   High-performance Python web framework, designed for speed.
    *   Stateless design of API endpoints to facilitate horizontal scaling and load balancing.
*   **Database (Supabase/PostgreSQL):**
    *   Leveraging a managed, scalable PostgreSQL instance from Supabase for optimized database performance.

## Deployment Architecture

*   **Frontend (Next.js):** Deployed on Vercel.
*   **Backend (FastAPI):** Deployed on Vercel as Serverless Functions (or a compatible platform if specific needs arise).
*   **Database & Authentication:** Managed by Supabase.
*   **Logging:** Vercel Log Drains integrated with a Cloud Logging Service (e.g., Logtail).

## Development Environment

### Prerequisites

*   **Node.js**: For frontend development and monorepo tooling (LTS version recommended).
*   **pnpm**: As the package manager for the monorepo (install globally: `npm install -g pnpm`).
*   **Python**: For backend development (3.9+ recommended for `zoneinfo`).
*   **Git**: For version control.
*   **Docker Desktop**: Recommended for local Supabase development (if not using remote Supabase).

### Setup Commands

```bash
# 1. Clone the monorepo
git clone <your-repo-url>
cd <your-repo-name>

# 2. Install root dependencies using pnpm
pnpm install

# 3. Frontend Setup (navigate into the frontend package)
cd frontend
# If creating a new Next.js project:
# pnpm create next-app . --typescript --eslint --app --tailwind --src-dir --import-alias "@/*"
# If the project is already created, ensure dependencies are installed via pnpm install in root
npx shadcn-ui@latest init
# Configure according to prompts (TypeScript, global CSS, etc.)
cd ..

# 4. Backend Setup (navigate into the backend package)
cd backend
python -m venv .venv
source .venv/bin/activate # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
# Set up environment variables (.env file) for Supabase URL/keys, Gemini API keys etc.
cd ..
```

## Architecture Decision Records (ADRs)

This section summarizes the key architectural decisions made during this workflow, providing a high-level overview of the choices and their rationale. For detailed rationale, please refer to the "Decision Summary" table.

1.  **Testing Strategy:** Jest for unit/component tests, Playwright for E2E tests.
2.  **API Communication (Frontend):** React Query (TanStack Query) for data fetching and caching.
3.  **State Management (Frontend):** React Context for client-side UI state.
4.  **Error Handling Strategy:** Full-stack consistent approach (FastAPI exceptions, React Error Boundaries, Shadcn/UI Toast, React Query).
5.  **Logging Strategy:** Cloud Logging Service via Vercel Log Drains (e.g., Logtail).
6.  **Monorepo Strategy:** NPM/PNPM Workspaces for frontend/backend.
7.  **Form Management (Frontend):** React Hook Form.
8.  **Email Service:** Resend for transactional emails.
9.  **Date/Time Handling:** `date-fns` (Frontend), Python `datetime` (Backend) with UTC storage.

---

## Validation Summary

### Document Quality Score

-   Architecture Completeness: Complete
-   Version Specificity: All Verified
-   Pattern Clarity: Crystal Clear
-   AI Agent Readiness: Ready

### Critical Issues Found

N/A

### Recommended Actions Before Implementation

N/A

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-11-25_
_For: BIP_
