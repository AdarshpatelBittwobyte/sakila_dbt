{{ config(materialized='view') }}

WITH RankedTerritories AS (
    SELECT 
        pc.product_category_id,
        EXTRACT(YEAR FROM soh.Order_Date) AS SalesYear,
        soh.Territory_ID,
        SUM(soh.Total_Due) AS TerritoryRevenue,
        ROW_NUMBER() OVER (PARTITION BY pc.product_category_id, EXTRACT(YEAR FROM soh.Order_Date) ORDER BY SUM(soh.Total_Due) DESC) AS TerritoryRank
    FROM 
          {{source('adventure','salesorderheader')}} soh
    INNER JOIN 
          {{source('adventure','salesorderdetail')}} sod ON soh.Sales_Order_ID = sod.sales_order_detail_id
    INNER JOIN 
          {{source('adventure','product')}} p ON p.Product_ID = sod.Product_ID
    INNER JOIN 
          {{source('adventure','product_sub_category')}} ps ON ps.product_subcategory_id = p.product_subcategory_id
    INNER JOIN 
          {{source('adventure','product_category')}} pc ON pc.product_category_id = ps.product_category_id
    GROUP BY 
        pc.product_category_id, EXTRACT(YEAR FROM soh.Order_Date), soh.Territory_ID
)
SELECT 
    product_category_id,
    SalesYear,
    Territory_ID,
    TerritoryRevenue
FROM 
    RankedTerritories
WHERE 
    TerritoryRank <= 3
--ORDER BY 
   -- product_category_id, SalesYear, Territory_ID