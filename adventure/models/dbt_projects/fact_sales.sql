{{ config(
    materialized='incremental',
    unique_key='sales_order_detail_id'
) }}

WITH salesorderdetails AS (
    SELECT * 
    FROM {{ source('adventure', 'salesorderdetail') }}
), 
salesorderheaders AS (
    SELECT * 
    FROM {{ source('adventure', 'salesorderheader') }}
),
final AS (
    SELECT
        sod.sales_order_detail_id,
        sod.order_qty,
        sod.unit_price,
        soh.tax_amt,
        (sod.order_qty * sod.unit_price) AS gross_sale,
        (sod.order_qty * sod.unit_price - soh.tax_amt) AS net_sale
    FROM  
        salesorderdetails sod
    INNER JOIN 
        salesorderheaders soh ON soh.sales_order_id = sod.sales_order_detail_id
)

SELECT * FROM final

 