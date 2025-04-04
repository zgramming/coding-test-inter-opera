import { IDashboardSalesIndustryOverview } from "@/interfaces/dashboard-sales-industry-overview.interface";
import { IDashboardSalesOverview } from "@/interfaces/dashboard-sales-overview.interface";
import { IDashboardSalesRegionOverview } from "@/interfaces/dashboard-sales-region-overview.interface";
import { ISalesReport } from "@/interfaces/sales-report.interface";
import { http } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";

interface UseGetSales {
  page: number;
  limit: number;
  region?: string;
  search?: string;
}

const url = {
  base: "/sales",
};

const hooks = {
  useGetSales: ({ page, limit, region, search }: UseGetSales) => {
    let uri = `${url.base}?page=${page}&limit=${limit}`;
    if (region) {
      uri += `&region=${region}`;
    }

    if (search) {
      uri += `&search=${search}`;
    }

    const { data, isLoading, isError, error, refetch } = useQuery<ISalesReport>(
      {
        queryKey: [uri],
        queryFn: async () => {
          const result = await http.fetcher(uri);
          return result;
        },
      }
    );

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  },
  useGetDashboardSalesOverview: () => {
    const uri = `${url.base}/dashboard/sales-overview`;
    const { data, isLoading, isError, error, refetch } =
      useQuery<IDashboardSalesOverview>({
        queryKey: [uri],
        queryFn: async () => {
          const result = await http.fetcher(uri);
          return result;
        },
      });

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  },
  useGetDashboardRegionOverview: () => {
    const uri = `${url.base}/dashboard/region-overview`;
    const { data, isLoading, isError, error, refetch } =
      useQuery<IDashboardSalesRegionOverview>({
        queryKey: [uri],
        queryFn: async () => {
          const result = await http.fetcher(uri);
          return result;
        },
      });

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  },
  useGetDashboardIndustryOverview: () => {
    const uri = `${url.base}/dashboard/industry-overview`;
    const { data, isLoading, isError, error, refetch } =
      useQuery<IDashboardSalesIndustryOverview>({
        queryKey: [uri],
        queryFn: async () => {
          const result = await http.fetcher(uri);
          return result;
        },
      });

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  },
};

export const SalesRepository = {
  url,
  hooks,
};
