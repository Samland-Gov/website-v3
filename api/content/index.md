---
template: home_template
masthead:
  title: "Samland Government"
  line1: "A Minecraft political simulation on the Miners Online server."
  line2: "Coordinating projects and community activities for the server."
  # Assuming the template also has slots for primary CTAs like:
  # primaryCta:
  #   text: "Explore Our Operations"
  #   href: "/operations"
  # secondaryCta:
  #   text: "View Official Updates"
  #   href: "/articles"
---

## Welcome to Samland Government

The Samland Government is a political simulation established within the Miners Online server. Its primary function is to maintain order, oversee development, and manage public resources for the community. The administration upholds transparent operations, facilitates community initiatives, and advances infrastructure and services in accordance with established protocols.

## Government activity

Find out what the government is doing

<div class="govuk-grid-row govuk-!-margin-bottom-7">
  {% set entries = getContentEntries(["articles", "government"]) %}

  {% if entries|length == 0 %}
    <div class="govuk-grid-column-full">
      <p class="govuk-body-m">There are no current official updates. Please check back soon for new directives and reports, or <a class="govuk-link" href="/operations">review our operational overview</a>.</p>
    </div>
  {% else %}
    {% for post in entries %}
      <div class="govuk-grid-column-one-third govuk-!-margin-bottom-4">
        <a href="{{ post.slug }}"> <!-- Make the whole card clickable for ease of use-->
          <div class="app-card" style="background:#f0f4f8; border-left: 5px solid #1d70b8; padding: 15px; height: 100%;">
            <p class="govuk-hint govuk-!-margin-bottom-1">{{ post.articleCategory }}</p>
            <h3 class="govuk-heading-s govuk-!-margin-bottom-2">{{ post.name }}</h3>
            <p class="govuk-body-s govuk-!-margin-bottom-0">{{ post.description }}</p>
          </div>
        </a>
      </div>
    {% endfor %}
    {% if entries|length > 3 %} {# Only show if there are more than 3 entries #}
      <div class="govuk-grid-column-full govuk-!-text-align-right govuk-!-margin-top-3">
        <a class="govuk-link" href="/articles">View all official updates &rarr;</a>
      </div>
    {% endif %}
  {% endif %}
</div>

### Government organisations

Access activities and information from all government organisations

<ul class="govuk-list app-document-list">
  {% set entries = getContentEntries(["organisations"]) %}

  {% for document in entries %}
    {% if document.template == "organisation_template" %}
    <li>
      <h3 class="govuk-heading-s govuk-!-margin-bottom-2">
        <a class="govuk-link govuk-link--no-underline" href="/{{ document.slug }}">
          {{ document.name }}
        </a>
      </h3>
      <p class="govuk-body-s govuk-!-margin-bottom-4">
        {{ document.description }}
      </p>
      {% if document.metadata %}
        <ul class="app-metadata-list govuk-!-padding-0">
          {% for data in document.metadata %}
            <li class="govuk-body govuk-!-font-size-16">
              {% if data['is_text'] %}
                {{ data.value }}
              {% endif %}
              {% if data['is_date'] %}
                Updated: {{ data['human_date'] }}
              {% endif %}
            </li>
          {% endfor %}
        </ul>
      {% endif %}
    </li>
    {% endif %}
  {% endfor %}
</ul>