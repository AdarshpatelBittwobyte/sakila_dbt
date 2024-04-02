{{
  config(materialized='view')
}}

select
    sales_person_id,
    {{ dbt_utils.pivot(" SalesYear", dbt_utils.get_column_values(ref("gap_actual_revenue"), " SalesYear"), then_value="CurrentYearSales") }}
from {{ ref('gap_actual_revenue') }}
group by sales_person_id 

 