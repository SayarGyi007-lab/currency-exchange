import { useGetRateChartQuery } from "../slices/redux-slices/chart-api";

export function useRateChart(params?: { from: string; to: string; days?: number, enabled?: boolean }) {
    const { data, isLoading, error } = useGetRateChartQuery(params!, {
        skip: !params?.from || !params?.to || params.enabled === false
    });

    return {
        chartData: data?.data ?? [],
        isLoading,
        error,
    };
}