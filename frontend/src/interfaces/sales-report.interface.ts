export interface ISalesReport {
  salesReps: SalesReportData[];
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

interface Client {
  name: string;
  industry: string;
  contact: string;
}

interface Deal {
  client: string;
  value: number;
  status: string;
}
