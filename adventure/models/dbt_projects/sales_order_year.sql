/*
{{
  config(materialized='table')
 
}} {{ sales_order_years(2014) }}
*/
{%- set years = run_query("SELECT DISTINCT EXTRACT(YEAR FROM modified_date)::INT AS year FROM stg.salesorderdetail ") -%}

{% for year_data in years %}
    {% set year = year_data.year %}
    {{ sales_order_year(year) }}
{% endfor %}
