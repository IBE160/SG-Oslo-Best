# {{project_name}} - Product Requirements Document

**Author:** {{user_name}}
**Date:** {{date}}
**Version:** 1.0

---

## Executive Summary

{{vision_alignment}}

### What Makes This Special

{{product_magic_essence}}

---

## Project Classification

**Technical Type:** {{project_type}}
**Domain:** {{domain_type}}
**Complexity:** {{complexity_level}}

{{project_classification}}

{{#if domain_context_summary}}

### Domain Context

{{domain_context_summary}}
{{/if}}

---

## Success Criteria

{{success_criteria}}

{{#if business_metrics}}

### Business Metrics

{{business_metrics}}
{{/if}}

---

## Product Scope

### MVP - Minimum Viable Product

{{mvp_scope}}

### Growth Features (Post-MVP)

{{growth_features}}

### Vision (Future)

{{vision_features}}

---

{{#if domain_considerations}}

## Domain-Specific Requirements

{{domain_considerations}}

This section shapes all functional and non-functional requirements below.
{{/if}}

---

{{#if innovation_patterns}}

<h2>Innovation & Novel Patterns</h2>

{{innovation_patterns}}

<h3>Validation Approach</h3>

{{validation_approach}}
{{/if}}

---

{{#if project_type_requirements}}

<h2>{{project_type}} Specific Requirements</h2>

{{project_type_requirements}}

{{#if endpoint_specification}}

<h3>API Specification</h3>

{{endpoint_specification}}
{{/if}}

{{#if authentication_model}}

<h3>Authentication & Authorization</h3>

{{authentication_model}}
{{/if}}

{{#if platform_requirements}}

<h3>Platform Support</h3>

{{platform_requirements}}
{{/if}}

{{#if device_features}}

<h3>Device Capabilities</h3>

{{device_features}}
{{/if}}

{{#if tenant_model}}

<h3>Multi-Tenancy Architecture</h3>

{{tenant_model}}
{{/if}}

{{#if permission_matrix}}

<h3>Permissions & Roles</h3>

{{permission_matrix}}
{{/if}}
{{/if}}

---

{{#if ux_principles}}

<h2>User Experience Principles</h2>

{{ux_principles}}

<h3>Key Interactions</h3>

{{key_interactions}}
{{/if}}

---

<h2>Functional Requirements</h2>

{{functional_requirements_complete}}

---

<h2>Non-Functional Requirements</h2>

{{#if performance_requirements}}

<h3>Performance</h3>

{{performance_requirements}}
{{/if}}

{{#if security_requirements}}

<h3>Security</h3>

{{security_requirements}}
{{/if}}

{{#if scalability_requirements}}

<h3>Scalability</h3>

{{scalability_requirements}}
{{/if}}

{{#if accessibility_requirements}}

<h3>Accessibility</h3>

{{accessibility_requirements}}
{{/if}}

{{#if integration_requirements}}

<h3>Integration</h3>

{{integration_requirements}}
{{/if}}

{{#if no_nfrs}}
_No specific non-functional requirements identified for this project type._
{{/if}}

---

<h2>Implementation Planning</h2>

<h3>Epic Breakdown Required</h3>

Requirements must be decomposed into epics and bite-sized stories (200k context limit).

**Next Step:** Run `workflow epics-stories` to create the implementation breakdown.

---

<h2>References</h2>

{{#if product_brief_path}}

- Product Brief: {{product_brief_path}}
  {{/if}}
  {{#if domain_brief_path}}
- Domain Brief: {{domain_brief_path}}
  {{/if}}
  {{#if research_documents}}
- Research: {{research_documents}}
  {{/if}}

---

<h2>Next Steps</h2>

1. **Epic & Story Breakdown** - Run: `workflow epics-stories`
2. **UX Design** (if UI) - Run: `workflow ux-design`
3. **Architecture** - Run: `workflow create-architecture`

---

_This PRD captures the essence of {{project_name}} - {{product_magic_summary}}_

_Created through collaborative discovery between {{user_name}} and AI facilitator._
