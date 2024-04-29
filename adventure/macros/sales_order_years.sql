{% macro sales_order_years(year) %}
    {{ config(alias = 'sales_order_year_'~year) }}
    SELECT s.*,s2.sub_total,s2.total_due, EXTRACT(YEAR FROM Order_date) AS "Year",
    cast('01/01/1999' as date)::timestamp as etl_time
    FROM {{source('adventure','salesorderdetail')}} s
    INNER JOIN   {{source('adventure','salesorderheader')}} s2 
    ON s.sales_order_id = s2.sales_order_id 
    WHERE EXTRACT(YEAR FROM ORDER_DATE) = '{{ year }}'
{% endmacro %} 
/*
{% macro sales_order_year(year) %}
    {% set table_alias = 'sales_order_year_' ~ year %}
    {{ config(alias=table_alias) }}
    CREATE TABLE dwh.sales_order_year_{{ year }} AS (
        SELECT s.*, s2.sub_total, s2.total_due, EXTRACT(YEAR FROM Order_date) AS "Year",
        CAST('01/01/1999' AS DATE)::TIMESTAMP AS etl_time
       FROM {{source('adventure','salesorderdetail')}} s
    INNER JOIN   {{source('adventure','salesorderheader')}} s2 
        ON s.sales_order_id = s2.sales_order_id 
        WHERE EXTRACT(YEAR FROM ORDER_DATE) = '{{ year }}'
    );

    SELECT * FROM {{ table_alias }};
{% endmacro %}  */
