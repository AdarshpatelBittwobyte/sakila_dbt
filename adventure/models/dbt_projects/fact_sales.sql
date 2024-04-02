{%- set years = ['2011', '2012', '2013', '2014'] -%}

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

