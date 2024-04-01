{% macro sales_order_years(year) %}
    {{ config(alias = 'sales_order_year_'~year) }}
    SELECT s.*,s2.sub_total,s2.total_due, EXTRACT(YEAR FROM Order_date) AS "Year"
    FROM {{source('adventure','salesorderdetail')}} s
    INNER JOIN   {{source('adventure','salesorderheader')}} s2 
    ON s.sales_order_id = s2.sales_order_id 
    WHERE EXTRACT(YEAR FROM ORDER_DATE) = '{{ year }}'
{% endmacro %}