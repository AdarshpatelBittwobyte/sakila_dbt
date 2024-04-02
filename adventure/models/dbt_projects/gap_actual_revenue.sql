{{ config(materialized='view') }}

WITH YearlySales AS (
    SELECT 
        Sales_Person_ID,
        EXTRACT(YEAR FROM Order_Date) AS SalesYear,
        SUM(sub_total) AS YearlySales
    FROM   {{source('adventure','salesorderheader')}}
    GROUP BY Sales_Person_ID, SalesYear
),
SalesGrowth AS (
    SELECT 
        Sales_Person_ID,
        SalesYear,
        ROUND(YearlySales, 2) AS CurrentYearSales,
        t."Target" AS TargetRevenue,
        COALESCE(LAG(YearlySales) OVER (PARTITION BY sales_person_id ORDER BY SalesYear), 0) AS LastYearSales,
        CASE 
            WHEN LAG(YearlySales) OVER (PARTITION BY sales_person_id ORDER BY SalesYear) IS NULL THEN NULL 
            ELSE ROUND((((YearlySales - COALESCE(LAG(YearlySales) OVER (PARTITION BY sales_person_id ORDER BY SalesYear), 0))
            / COALESCE(LAG(YearlySales) OVER (PARTITION BY sales_person_id ORDER BY SalesYear), 0)) * 100), 1)
        END AS GrowthRate,
         CASE 
            WHEN LAG(YearlySales) OVER (PARTITION BY sales_person_id ORDER BY SalesYear) IS NULL THEN NULL 
            ELSE 
            ROUND((YearlySales::numeric - "Target"::numeric), 2)
        END AS RevenueGap
    FROM YearlySales s1
    Left JOIN  {{source('adventure','targetsales')}} t ON s1.Sales_Person_ID = t."SalesPersonID"
     
),
final AS (
    SELECT 
        Sales_Person_ID,
        SalesYear,
        CurrentYearSales,
        TargetRevenue,
        LastYearSales,
        GrowthRate,
        RevenueGap
    FROM SalesGrowth 
    order by Sales_Person_ID,SalesYear
)
select * from final
ORDER BY 
    sales_person_id,SalesYear