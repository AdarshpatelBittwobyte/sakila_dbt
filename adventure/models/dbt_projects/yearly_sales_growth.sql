{{ config(materialized='view') }}


WITH YearlySales AS (
    SELECT 
        EXTRACT(YEAR FROM Order_Date) AS OrderYear,
        Territory_ID,
        ROUND(SUM(sub_total), 2) AS NetSales
    FROM 
        {{source('adventure','salesorderheader')}}
    GROUP BY 
        OrderYear, Territory_ID
),
YearlySalesWithGrowth AS (
    SELECT
        OrderYear,
        Territory_ID,
        NetSales,
        LAG(NetSales) OVER (PARTITION BY Territory_ID ORDER BY OrderYear) AS PreviousYearSales,
        CASE 
            WHEN LAG(NetSales) OVER (PARTITION BY Territory_ID ORDER BY OrderYear) IS NOT NULL 
            THEN ROUND(((NetSales - LAG(NetSales) OVER (PARTITION BY Territory_ID ORDER BY OrderYear)) / LAG(NetSales) OVER (PARTITION BY Territory_ID ORDER BY OrderYear)) * 100, 2)
            ELSE NULL
        END AS GrowthPercentage
    FROM 
        YearlySales
)
SELECT 
    OrderYear,
    Territory_ID,
    NetSales,
    PreviousYearSales,
    GrowthPercentage
FROM 
    YearlySalesWithGrowth
