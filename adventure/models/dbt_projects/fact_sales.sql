
WITH cte_sales_order AS (
 {%- set years = run_query("SELECT DISTINCT EXTRACT(YEAR FROM modified_date)::INT AS year FROM stg.salesorderdetail ") -%}

--{%- set years = ['2011', '2012', '2013', '2014'] -%}
    
{%- for year in years -%}
    {{ config(materialized='incremental', unique_key=['sales_order_id', 'sales_order_detail_id'], alias='fact_sales') }}

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
    SELECT sod.sales_order_id::int,
    sod.sales_order_detail_id::int,
    carrier_tracking_number::varchar(50),
    order_qty::int,
    product_id::int,
    special_offer_id::int,
    unit_price::numeric(38, 9),
    unit_price_discount::numeric(38, 9),
    line_total::numeric(38, 9),
    sod.modified_date::timestamp,
    soh.sub_total::numeric(38, 9) as Gross_sales,
    soh.Total_due::numeric(38, 9) as Net_Sales,
    cast('01/01/1999' as date)::timestamp as etl_time
    FROM  
        cte_sales_order sod
    INNER JOIN 
        salesorderheaders soh ON sod.sales_order_id = soh.sales_order_id
)

SELECT * FROM final