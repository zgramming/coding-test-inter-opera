export interface ISalesReport {
  data: SalesReportData[];
  page: number;
  limit: number;
  total_items: number;
}

export interface SalesReportData {
  id: number;
  name: string;
  role: string;
  region: string;
  skills: string[];
  deals: Deal[];
  clients: Client[];
}

interface Deal {
  client: string;
  value: number;
  status: string;
}

interface Client {
  name: string;
  industry: string;
  contact: string;
}
