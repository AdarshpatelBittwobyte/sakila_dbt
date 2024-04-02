{{ config(materialized='view') }}

WITH YearlySales AS (
    SELECT 
        Sales_Person_ID,
        EXTRACT(YEAR FROM Order_Date) AS SalesYear,
        SUM(sub_total) AS NetSales
    FROM   {{source('adventure','salesorderheader')}}
    GROUP BY Sales_Person_ID, SalesYear
),
SalesGrowth AS (
    SELECT 
        s1.Sales_Person_ID,
        s1.SalesYear,
        s1.NetSales AS ActualRevenue,
        LAG(s1.NetSales) OVER (PARTITION BY s1.Sales_Person_ID ORDER BY s1.SalesYear) AS LastYearRevenue,
        t."Target" AS TargetRevenue
    FROM YearlySales s1
    INNER JOIN  {{source('adventure','targetsales')}} t ON s1.Sales_Person_ID = t."SalesPersonID"
),
final AS (
    SELECT 
        Sales_Person_ID,
        SalesYear,
        ActualRevenue,
        LastYearRevenue,
        TargetRevenue,
        CASE 
            WHEN LastYearRevenue IS NOT NULL AND LastYearRevenue <> 0 THEN CONCAT(ROUND(((ActualRevenue - LastYearRevenue) / LastYearRevenue) * 100, 2), '%')
            ELSE NULL 
        END AS GrowthRate,
        CASE 
            WHEN ActualRevenue IS NOT NULL AND TargetRevenue IS NOT NULL THEN TargetRevenue - ActualRevenue 
            ELSE NULL 
        END AS RevenueGap
    FROM SalesGrowth 
)
select * from final