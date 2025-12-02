# Epic Technical Specification: Foundation & Setup

Date: 2025-12-02
Author: BIP
Epic ID: 1
Status: Draft

---

## Overview

This document provides the technical specification for Epic 1: Foundation & Setup. The primary goal of this epic is to establish the complete technical foundation for the CVAI Turbo project. This includes initializing the monorepo, setting up the frontend (Next.js) and backend (FastAPI) applications, configuring the CI/CD pipeline for automated deployment to Vercel, and integrating with Supabase for database and authentication services. This foundational work is critical as it enables all subsequent development for other epics.

## Objectives and Scope

**In-Scope:**
- Setting up a PNPM workspaces monorepo.
- Initializing a Next.js frontend application with TypeScript, ESLint, and Shadcn/UI.
- Initializing a FastAPI backend application.
- Creating a shared TypeScript types package for API contracts.
- Configuring environment variables for both frontend and backend to connect to a Supabase project.
- Establishing a basic CI/CD pipeline using Vercel that automatically deploys the monorepo on pushes to the main branch.

**Out-of-Scope:**
- Implementation of any user-facing features (login, registration, etc.).
- Definition of specific API endpoints beyond what's needed for a health check.
- Creation of database schemas or tables (these will be handled in Epic 2).
- Detailed E2E or unit testing infrastructure (though the foundation for it will be laid).

## System Architecture Alignment

This epic directly implements the foundational structure outlined in the Architecture document. The monorepo strategy using PNPM Workspaces is realized, creating the `frontend`, `backend`, and `packages/shared-types` directories as specified. The technology choices for the frontend (Next.js, Shadcn/UI) and backend (FastAPI) are instantiated. Furthermore, the deployment architecture is addressed by setting up the Vercel pipeline for continuous deployment, aligning with the "Deployment on Vercel" strategy.

## Detailed Design

### Services and Modules

| Service/Module | Responsibilities | Inputs | Outputs | Owner |
| --- | --- | --- | --- | --- |
| **Frontend** | Render the user interface (placeholder for this epic). | - | HTML/CSS/JS | Dev |
| **Backend** | Serve as the API layer (placeholder for this epic). | - | JSON | Dev |
| **CI/CD Pipeline**| Automate build and deployment of frontend and backend. | Code push to `main` branch. | Deployed application on Vercel. | Dev |
| **Supabase Project** | Provide database and authentication services. | Configuration settings. | Connection URLs and keys. | Dev |

### Data Models and Contracts

No new data models will be created in this epic. The focus is on establishing the connection to Supabase. The `packages/shared-types` directory will be created to house future API contracts, but will remain empty for this epic.

### APIs and Interfaces

No new APIs will be defined in this epic. The project setup will include the default endpoints that come with `create-next-app` and a basic health check endpoint for FastAPI, but no business-logic APIs.

### Workflows and Sequencing

The primary workflow established is the **CI/CD Workflow**:
1.  A developer pushes a commit to the `main` branch of the Git repository.
2.  A Vercel build is automatically triggered.
3.  Vercel builds the Next.js frontend application.
4.  Vercel builds the FastAPI backend into serverless functions.
5.  Upon successful builds, the new version of the application is deployed and becomes available at the public Vercel URL.

## Non-Functional Requirements

### Performance

- **Build Times:** The initial CI/CD pipeline build and deployment should complete in a reasonable time (e.g., under 5 minutes) to ensure a fast feedback loop for developers.

### Security

- **Credential Management:** Supabase URL, `anon` key, and `service_role` key must be stored securely as environment variables in Vercel and not exposed in the frontend code.

### Reliability/Availability

- The Vercel deployment pipeline should be reliable. A failed deployment should not take down the last known good version of the application.

### Observability

- Basic deployment logs will be available through the Vercel dashboard. No advanced logging is required for this epic.

## Dependencies and Integrations

| Dependency | Version | Purpose |
| --- | --- | --- |
| Next.js | `~14.x` | Frontend framework. |
| React | `~18.x` | UI library. |

| Shadcn/UI | `latest` | UI component library. |
| FastAPI | `~0.104.x`| Backend framework. |
| Supabase | N/A | Database and Authentication provider. |
| Vercel | N/A | Hosting and CI/CD platform. |
| PNPM | `~9.x` | Monorepo package manager. |

## Acceptance Criteria (Authoritative)

1.  A monorepo exists with `frontend`, `backend`, and `packages/shared-types` directories.
2.  The `frontend` directory contains a functional, default Next.js application.
3.  Shadcn/UI is initialized in the frontend project.
4.  The `backend` directory contains a functional, default FastAPI application.
5.  The frontend and backend applications have separate `.env.example` files documenting the required Supabase environment variables.
6.  A push to the `main` branch successfully triggers a deployment on Vercel.
7.  The deployed Vercel application is accessible via its URL and both the frontend and backend default pages load correctly.

## Traceability Mapping

| Acceptance Criterion | Spec Section(s) | Component(s)/API(s) | Test Idea |
| --- | --- | --- | --- |
| 1-4 | Detailed Design | `frontend/`, `backend/`, `packages/` | Manual Inspection: Verify project structure. |
| 5 | Security | `.env.example` files | Manual Inspection: Check for documented env vars. |
| 6, 7 | Workflows, Deployment | Vercel Pipeline | E2E Test: Push to `main` and verify deployment URL loads. |

## Risks, Assumptions, Open Questions

| Type | Description | Mitigation / Next Step |
| --- | --- | --- |
| **Risk** | Vercel's serverless function configuration for FastAPI might be complex. | Rely on Vercel's official documentation and templates for FastAPI deployment. Allocate time for potential troubleshooting. |
| **Assumption** | The free tiers for Supabase and Vercel are sufficient for this project's development and deployment needs. | Monitor usage. No immediate action required. |

## Test Strategy Summary

The primary test for this epic is a manual end-to-end (E2E) test of the CI/CD pipeline. The developer will push a change to the `main` branch and verify that the deployment completes successfully on Vercel and that the application is accessible. Automated testing frameworks (Jest, Playwright) will be installed as part of the project setup, but no tests will be written in this epic.
