# Project Plan

## Instruksjoner

1. Der hvor det står {prompt / user-input-file}, kan dere legge inn en egen prompt eller filnavn for å gi ekstra instruksjoner. Hvis dere ikke ønsker å legge til ekstra instruksjoner, kan dere bare fjerne denne delen.
2. Hvis jeg har skrevet noe der allerede, f.eks. "Root Cause Analysis and Solution Design for Player Inactivity", så kan dere bytte ut min prompt med deres egen.


## Fase 0

- [x] Brainstorming
  - [x] /run-agent-task analyst *brainstorm 
    - [x] File: brainstorming-session-results-2025-10-26.md
    - [x] File: brainstorming-session-results-2025-10-27.md
    - [x] File: brainstorming-session-results-2025-10-29.md
- [x] Product Brief
  - [x] /run-agent-task analyst *product-brief
    - [x] File: product-brief-ibe160-2025-11-03.md


## Fase 1

- [x] Planning
  - [x] /run-agent-task pm *prd
    - [x] File: PRD.md 
  - [x] /run-agent-task pm *validate-prd
    - [x] File: validation-report-2025-11-12-prd-epics.md
  - [x] /run-agent-task ux-designer *create-ux-design
    - [x] File: ux-design-specification.md
    - [x] File: ux-color-themes.html
    - [x] File: ux-design-directions.html
  - [x] /run-agent-task ux-designer *validate-ux-design 
    - [x] File: validation-ux-design-date.md


## Fase 2

- [x] Solutioning
  - [x] /run-agent-task architect *architecture
    - [x] File: architecture.md
  - [x] /run-agent-task pm *epics
    - [x] File: epics.md
  - [x] /run-agent-task architect *validate-architecture
  - [x] /run-agent-task tea *framework
  - [x] /run-agent-task tea *ci
  - [x] /run-agent-task tea *test-design


## Fase 3

- [x] Implementation
  - [x] /run-agent-task sm *sprint-planning {prompt / user-input-file}
    - [x] File: sprint-artifacts/sprint-status.yaml
  - foreach epic in sprint planning:
    - [x] /run-agent-task sm create-epic-tech-context {prompt / user-input-file}
      - [x] File: sprint-artifacts/tech-spec-epic-{{epic_id}}.md
    - [x] /run-agent-task sm validate-epic-tech-context {prompt / user-input-file}
    - foreach story in epic:
      - [x] /run-agent-task sm *create-story 
        - [x] File: sprint-artifacts/{{story_key}}.md
      - [x] /run-agent-task sm *validate-create-story
      - [x] /run-agent-task sm *create-story-context
        - [x] File: sprint-artifacts/{{story_key}}.context.xml
      - [x] /run-agent-task sm *validate-story-context
      - [x] /run-agent-task sm *story-ready-for-dev
      while code-review != approved:
        - [x] /run-agent-task dev *develop-story
        - [x] /run-agent-task dev *code-review
      - [x] /run-agent-task dev *story-done
      - [x] /run-agent-task sm *test-review
    - [x] /run-agent-task sm *epic-retrospective





## BMAD workflow

<img src="images/bmad-workflow.svg" alt="BMAD workflow">