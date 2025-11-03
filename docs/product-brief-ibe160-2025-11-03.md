# Product Brief: CVAI Turbo

**Date:** {{date}}
**Author:** {{user_name}}
**Status:** Draft for PM Review

---

## Executive Summary

CVAI Turbo is a web application designed to help university and college students overcome the difficulty of writing tailored cover letters. Students struggle to articulate their value to employers, costing them time and job opportunities. Our solution provides an AI-powered tool that takes a user's CV information and a job description, and automatically generates a relevant, high-quality cover letter. The MVP will focus on delivering this core functionality with a simple, text-based interface. The project's success will be measured by its ability to produce application-ready cover letters efficiently, with the ultimate goal of helping students secure employment more effectively.

---

## Problem Statement

Students, particularly those with limited professional experience, face a significant barrier when applying for jobs: the inability to effectively write compelling and tailored cover letters. This challenge stems from a lack of experience in articulating their skills, knowledge, and personal traits in a way that appeals to employers. They struggle with where to start, what content is relevant for a specific role, and how to structure their narrative, often getting stuck mid-way through the writing process.

The consequences are tangible: students miss out on valuable job opportunities and spend an excessive amount of time on a single application, reducing their overall application volume. Current solutions are inadequate. Generic online templates fail to capture individual strengths and specific job requirements, while seeking help from experienced individuals is time-consuming and not scalable. This leaves a critical gap for a tool that can efficiently guide students in creating personalized, high-quality cover letters, enabling them to apply for more jobs with greater confidence and effectiveness.

---

## Proposed Solution

Our proposed solution, CVAI Turbo, is an intelligent, user-centric web application designed to empower students in their job search by streamlining the creation of high-quality, tailored cover letters. The core principle is to transform the time-consuming and often frustrating task of writing cover letters into a fast, easy, and confidence-building experience.

The tool's key differentiator lies in its intelligent adaptation. By securely storing a user's profile information (their 'CV'), the application can, with minimal input, analyze a specific job opening and automatically generate a cover letter that highlights the most relevant skills and experiences. This goes beyond generic templates by creating a personalized and targeted narrative for each application.

The ideal user experience is one of speed and empowerment. The user simply provides the job description, and the tool does the heavy lifting of drafting a compelling letter. This will not only increase the volume of applications a student can manage but also build their confidence by providing a strong foundation for their job applications, ultimately helping them secure employment.

---

## Target Users

### Primary User Segment

Our primary target users can be divided into two key segments:

**1. The Entry-Level Explorer (First-Year Student):**
*   **Profile:** A first-year college or university student with little to no professional work experience.
*   **Goals:** To gain initial work experience and earn money by applying for part-time jobs in sectors like retail, hospitality, or administration.
*   **Pain Points:** They find writing cover letters intimidating because they have limited experience to draw from and don't know how to translate academic achievements into valuable skills for an employer.

**2. The Career-Starter (Third-Year/Graduating Student):**
*   **Profile:** A student in their third or final year of study, or a recent graduate, with a specific field of study and some internship or project experience.
*   **Goals:** To secure a competitive internship alongside their studies or a full-time position that will launch their career in their chosen field.
*   **Pain Points:** They struggle to tailor their cover letters to highly specific and competitive job descriptions and need to effectively communicate the value of their projects and internships to stand out from other qualified candidates.

### Secondary User Segment

**Secondary User Segment: Academic Institutions**

*   **Profile:** Career services departments, faculty advisors, and program coordinators within universities and colleges.
*   **Goals:** To improve student employability and boost the institution's overall employment rates by providing students with effective, modern job-seeking tools.
*   **How they'll use the tool:** They will use CVAI Turbo as a practical teaching tool in workshops and advising sessions. It will help them demonstrate how to analyze job descriptions and translate academic experience into the valuable skills employers seek, offering a scalable way to provide personalized application support.
*   **Value Proposition:** The tool creates a symbiotic relationship. By helping students secure jobs more effectively, it directly contributes to the institution's key performance metrics (e.g., graduate employment rates) and enhances its reputation.

---

## Goals and Success Metrics

### Business Objectives

*   **Objective 1:** Successfully deliver a functional MVP that meets all 'Must Have' requirements by the project deadline.
*   **Objective 2:** Conduct successful demonstrations and gather feedback from the core project team (4 members), the course instructor, and teaching assistants to validate the prototype's functionality and potential.

### User Success Metrics

*   **Efficiency:** The time it takes a user to generate a satisfactory cover letter is significantly less than writing one from scratch.
*   **Output Quality:** The user rates the generated cover letter as a high-quality starting point that requires only minimal editing.
*   **Application Readiness:** The user confirms they would be confident enough to use the generated cover letter in a real job application.

### Key Performance Indicators (KPIs)

1.  **Prototype Completion:** A "pass/fail" metric. Did we deliver a functional MVP meeting all requirements by the deadline?
2.  **Application Readiness Rate:** The percentage of testers who would use the generated letter for a real job application.
3.  **Average Time to Generation:** The average time it takes a tester to create a satisfactory cover letter.
4.  **Positive Feedback Ratio:** The percentage of feedback from the testing group that is positive or constructive.

---

## Strategic Alignment and Financial Impact

### Financial Impact

As a student project, the primary investment is the time and effort of the four-person student team over the 5-week project timeline. The project will leverage free tiers of service for its technical stack (such as Vercel and Supabase), resulting in no direct financial cost.

### Company Objectives Alignment

This project directly aligns with the core educational objectives of the 'IBE 160 Programmering med KI' course. It provides a practical application of key concepts in software engineering, AI integration, and agile project management. The project's success will be a direct measure of the team's ability to apply these learned concepts.

### Strategic Initiatives

The project supports the strategic goal of academic institutions to improve graduate employability. It serves as a proof-of-concept for how technology can enhance career services and deliver better outcomes for students, ultimately contributing to the institution's reputation.

---

## MVP Scope

### Core Features (Must Have)

*   User can create a simple profile.
*   User can input their CV information into a single text area.
*   User can paste a job advertisement into a single text area.
*   A "Generate" button triggers the AI process.
*   The generated cover letter is displayed to the user as plain text.

### Out of Scope for MVP

*   A structured CV input form with separate sections.
*   Saving, editing, or managing multiple CVs or job applications.
*   Saving generated cover letters to a user's profile.
*   Updating profile/CV information after it has been submitted.
*   Advanced formatting or file downloading (e.g., PDF, DOCX).

### MVP Success Criteria

*   A user can successfully register and create a profile.
*   A user can input their CV information and a job ad using simple text fields.
*   A user can trigger the generation and receive a coherent, relevant cover letter.
*   The entire core user journey, from registration to generation, can be completed without errors.

---

## Post-MVP Vision

### Phase 2 Features

1.  **Structured CV Profile:** Introduce an enhanced CV profile with separate, editable sections.
2.  **Cover Letter History:** Allow users to save, view, and manage their previously generated letters.
3.  **Download and Edit:** Allow users to download letters in common formats and make edits within the app.
4.  **CV Update Prompt:** On login, a pop-up will prompt the user to review and update their CV information.

### Long-term Vision

The long-term vision is to evolve CVAI Turbo from a single-purpose tool into a comprehensive, AI-powered career co-pilot. The experience would become a conversational, chat-based interface, allowing users to iteratively refine their application materials through a natural dialogue. The tool would also expand to provide intelligent suggestions for improving the user's core CV, not just the cover letter.

### Expansion Opportunities

A primary expansion opportunity is direct integration with job boards (like LinkedIn, Finn.no, etc.), allowing users to generate a cover letter with a single click from the job posting itself. Another major path is to develop a job recommendation engine that analyzes a user's CV and proactively suggests relevant job openings.

---

## Technical Considerations

### Platform Requirements

The primary platform is a responsive web application designed for desktop and laptop use.
*   **Target Devices:** Desktop computers and laptops (Windows, macOS, Linux).
*   **Browser Compatibility:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.

### Technology Preferences

The project will use a modern, decoupled technology stack:
*   **Frontend:** Next.js 14+ with TypeScript and Tailwind CSS for styling.
*   **Backend:** FastAPI (Python) for a high-performance API.
*   **Database:** Supabase (PostgreSQL) for data storage.
*   **Authentication:** Supabase Auth for user management (email/password, JWTs).
*   **AI Integration:** A Gemini family model will be used for cover letter generation.

### Architecture Considerations

The proposed architecture is a robust, scalable system:
*   **Architecture Pattern:** A decoupled frontend/backend architecture. The frontend will utilize component-based design, and the backend will be a RESTful API.
*   **Database Security:** Row Level Security (RLS) policies in Supabase will be a key feature to ensure users can only access their own data.
*   **Deployment:** The frontend and backend will be deployed to Vercel, which supports both Next.js and FastAPI, enabling a streamlined CI/CD workflow.

---

## Constraints and Assumptions

### Constraints

*   **Timeline:** The project has a fixed 5-week timeline.
*   **Team Size:** The project will be completed by a team of four students.
*   **Budget:** There is no financial budget; the project must rely on free-tier services.
*   **Technology:** The project is constrained to the agreed-upon technology stack (Next.js, FastAPI, Supabase, Gemini).

### Key Assumptions

*   **User Need:** We assume that students will find enough value in an AI-generated cover letter to use the tool.
*   **AI Quality:** We assume that the Gemini model can produce a high-quality, relevant cover letter from the provided inputs with reasonable prompt engineering.
*   **Technical Feasibility:** We assume that the team has the necessary skills to implement the MVP within the timeline.
*   **User Adoption:** We assume that the "lean" MVP is sufficient to attract initial users and validate the core concept.

---

## Risks and Open Questions

### Key Risks

*   **Technical Risk:** The integration of the frontend, backend, database, and AI model could be more complex than anticipated, potentially causing delays in the 5-week timeline.
*   **AI Quality Risk:** The cover letters generated by the AI might be too generic or not high-quality enough without significant, time-consuming prompt engineering.
*   **User Adoption Risk:** The lean MVP might be *too* lean, and users may not see the value without features like saving their work or a structured CV input.

### Open Questions

*   **Technical:** What is our contingency plan if we face a major integration blocker between two parts of our tech stack?
*   **AI Quality:** How will we define and measure "good enough" quality for the AI-generated letters, and how much time should we budget for prompt engineering?
*   **User Adoption:** How can we get feedback from our testers as quickly as possible to determine if the MVP is valuable enough, or if it's too simple?

### Areas Needing Further Research

The open questions listed above highlight the primary areas where the team will need to focus its research and decision-making during the initial phases of the project. Specifically, defining a "good enough" quality bar for AI output and designing a fast, effective user feedback loop will be critical early activities.

---

## Appendices

### A. Research Summary

This document was created through a collaborative process between the project team and the BMAD Business Analyst agent. The primary source of initial requirements and technical specifications was the 'proposal.md' document prepared by the team.

### B. Stakeholder Input

All stakeholder input was provided by the project team, acting as the primary stakeholders for this student project.

### C. References

*   `proposal.md` (Initial project proposal and technical specification)

---

_This Product Brief serves as the foundational input for Product Requirements Document (PRD) creation._

_Next Steps: Handoff to Product Manager for PRD development using the `workflow prd` command._
