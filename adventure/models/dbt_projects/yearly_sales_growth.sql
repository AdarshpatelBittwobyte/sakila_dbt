{{ config(materialized='view') }}


WITH YearlySales AS (
    SELECT 
        EXTRACT(YEAR FROM Order_Date) AS OrderYear,
        Territory_ID,
        ROUND(SUM(sub_total), 2) AS YearlySales
    FROM 
        {{source('adventure','salesorderheader')}}
    GROUP BY 
        OrderYear, Territory_ID
),
YearlySalesWithGrowth AS (
    SELECT
        OrderYear,
        Territory_ID,
        YearlySales AS CurrentYearSales,
        COALESCE(LAG(YearlySales) OVER (PARTITION BY Territory_ID ORDER BY OrderYear), 0) AS PreviousYearSales,
        CASE 
            WHEN LAG(YearlySales) OVER (PARTITION BY Territory_ID ORDER BY OrderYear) IS NOT NULL 
            THEN ROUND(((YearlySales - COALESCE(LAG(YearlySales) OVER (PARTITION BY Territory_ID ORDER BY OrderYear), 0)) / COALESCE(LAG(YearlySales) OVER (PARTITION BY Territory_ID ORDER BY OrderYear), 0)) * 100, 1)
            ELSE NULL
        END AS GrowthPercentage
    FROM 
        YearlySales
)
SELECT 
    OrderYear,
    Territory_ID,
    CurrentYearSales,
    PreviousYearSales,
    GrowthPercentage
FROM 
    YearlySalesWithGrowth
order by OrderYear,Territory_ID