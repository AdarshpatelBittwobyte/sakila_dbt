
WITH cte_sales_order AS (
 {%- set years = run_query("SELECT DISTINCT EXTRACT(YEAR FROM modified_date)::INT AS year FROM stg.salesorderdetail ") -%}

--{%- set years = ['2011', '2012', '2013', '2014'] -%}
    
{%- for year in years -%}
    {{ config(materialized='incremental', unique_key=['sales_order_id', 'sales_order_detail_id'], alias='fact_sales_order') }}

        select *
        from dwh.sales_order_year_{{ year }} 
        where 1=1
         {% if is_incremental() %}
           and modified_date::timestamp > (select max(modified_date) from {{ this }} )
        {% endif %}
    {% if not loop.last -%}
        union all
    {%- endif -%}
{%- endfor -%}
) ,

salesorderheaders AS (
    SELECT * 
    FROM {{ source('adventure', 'salesorderheader') }}
),
final AS (
    SELECT
        soh.sales_order_id,
        sod.order_qty,
        sod.unit_price,
        soh.tax_amt,
        (sod.order_qty * sod.unit_price) AS gross_sale,
        (sod.order_qty * sod.unit_price - soh.tax_amt) AS net_sale,
        cast('01/01/1999' as date)::timestamp as etl_time
    FROM  
        cte_sales_order sod
    INNER JOIN 
        salesorderheaders soh ON soh.sales_order_id = sod.sales_order_detail_id
)

SELECT * FROM final