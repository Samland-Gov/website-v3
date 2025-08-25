---
template: home_template
masthead:
  title: "Samland Government"
  line1: "Recognized in Miners Online since 2017"
  line2: "Coordinating projects and community activities for the server."
  # Assuming the template also has slots for primary CTAs like:
  # primaryCta:
  #   text: "Explore Our Operations"
  #   href: "/operations"
  # secondaryCta:
  #   text: "View Official Updates"
  #   href: "/articles"
---

## Official Updates
This section details recent projects, completed infrastructure, and key community directives. These updates provide essential insights into our current initiatives and areas requiring focused participation.

<div class="govuk-grid-row govuk-!-margin-bottom-7">
  {% set entries = getContentEntries("articles") %}

  {% if entries|length == 0 %}
    <div class="govuk-grid-column-full">
      <p class="govuk-body-m">There are no current official updates. Please check back soon for new directives and reports, or <a class="govuk-link" href="/operations">review our operational overview</a>.</p>
    </div>
  {% else %}
    {% for post in entries %}
      <div class="govuk-grid-column-one-third govuk-!-margin-bottom-4">
        <div class="app-card" style="background:#f0f4f8; border-left: 5px solid #1d70b8; padding: 15px; height: 100%;">
          <p class="govuk-hint govuk-!-margin-bottom-1">{{ post.articleCategory }}</p>
          <h3 class="govuk-heading-s govuk-!-margin-bottom-2"><a class="govuk-link" href="{{ post.slug }}">{{ post.name }}</a></h3>
          <p class="govuk-body-s govuk-!-margin-bottom-0">{{ post.description }}</p>
          <a class="govuk-link govuk-link--no-visited-state govuk-!-font-size-16" href="{{ post.slug }}">Read directive</a>
        </div>
      </div>
    {% endfor %}
  {% endif %}
</div>

## Contributing to Samland Initiatives

Players can contribute to Samland's various initiatives, aiding in development, infrastructure, and organized events. Participation guidelines are detailed in relevant sections.

*   ### Project Contributions
    Assist with established builds, resource procurement, or specialized tasks under Samland direction.
    [Review Current Projects](/projects)

*   ### Event Support
    Offer assistance for organized server events, ensuring their successful execution and order.
    [View Event Calendar](/events)

*   ### Infrastructure Maintenance
    Help maintain public utilities, designated zones, or submit proposals for new communal structures.
    [Submit a Proposal](/operations#infrastructure)

## Key Administrative Resources

Consult these official resources to understand Samland's governance, historical records, and communication channels.

*   [Samland Policies & Directives](/policies) – Understand official protocols and expected conduct within our jurisdiction.
*   [Registry of Current Projects](/projects) – Review detailed dossiers for all active initiatives and assigned roles.
*   [Historical Archives & Key Milestones](/history) – Access official records of Samland's development and significant events.
*   [Official Communications Channel](/contact) – Use this channel for formal inquiries and contact with Samland administration.