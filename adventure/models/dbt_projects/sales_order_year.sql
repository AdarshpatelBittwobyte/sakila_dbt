 

 -- Generate seed data for each year
{% set years_query %}
    SELECT DISTINCT EXTRACT(YEAR FROM modified_date)  AS year
    FROM {{source('adventure','salesorderdetail')}}
{% endset %}

{% set years = run_query(years_query) %}

{% for year in years %}
    -- Construct seed data for each year
    {{sales_order_years(row['year']) }}
{% endfor %}
     

   --   {% for row in run_query("SELECT DISTINCT EXTRACT(YEAR FROM modified_date) AS year FROM {{source('adventure','salesorderdetail')}}") %}
  --  {{ sales_order_years(row['year']) }}
--{% endfor %}
  {{sales_order_years(2013) }}