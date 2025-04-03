import { ISalesReport } from "@/interfaces/sales-report.interface";

export const saleReports: ISalesReport = {
  salesReps: [
    {
      id: 1,
      name: "Alice",
      role: "Senior Sales Executive",
      region: "North America",
      skills: ["Negotiation", "CRM", "Client Relations"],
      deals: [
        { client: "Acme Corp", value: 120000, status: "Closed Won" },
        { client: "Beta Ltd", value: 50000, status: "In Progress" },
        { client: "Omega Inc", value: 85000, status: "Closed Lost" },
      ],
      clients: [
        {
          name: "Acme Corp",
          industry: "Manufacturing",
          contact: "alice@acmecorp.com",
        },
        {
          name: "Beta Ltd",
          industry: "Retail",
          contact: "contact@betaltd.com",
        },
      ],
    },
    {
      id: 2,
      name: "Bob",
      role: "Sales Representative",
      region: "Europe",
      skills: ["Lead Generation", "Presentation", "Negotiation"],
      deals: [
        { client: "Gamma Inc", value: 75000, status: "Closed Lost" },
        { client: "Delta LLC", value: 90000, status: "Closed Won" },
        { client: "Sigma Corp", value: 65000, status: "In Progress" },
      ],
      clients: [
        { name: "Gamma Inc", industry: "Tech", contact: "info@gammainc.com" },
        {
          name: "Delta LLC",
          industry: "Finance",
          contact: "support@deltallc.com",
        },
      ],
    },
    {
      id: 3,
      name: "Charlie",
      role: "Account Manager",
      region: "Asia-Pacific",
      skills: ["Customer Service", "Sales Strategy", "Data Analysis"],
      deals: [
        { client: "Epsilon Ltd", value: 110000, status: "In Progress" },
        { client: "Zeta Corp", value: 60000, status: "Closed Won" },
        { client: "Theta Enterprises", value: 70000, status: "Closed Lost" },
      ],
      clients: [
        {
          name: "Epsilon Ltd",
          industry: "Healthcare",
          contact: "contact@epsilonltd.com",
        },
        {
          name: "Zeta Corp",
          industry: "Finance",
          contact: "sales@zetacorp.com",
        },
      ],
    },
    {
      id: 4,
      name: "Dana",
      role: "Business Development Manager",
      region: "South America",
      skills: ["Strategic Partnerships", "Negotiation", "Market Analysis"],
      deals: [
        { client: "Eta Co", value: 130000, status: "In Progress" },
        { client: "Theta Inc", value: 80000, status: "Closed Won" },
        { client: "Iota Group", value: 55000, status: "Closed Lost" },
      ],
      clients: [
        { name: "Eta Co", industry: "Energy", contact: "info@etaco.com" },
        {
          name: "Theta Inc",
          industry: "Telecommunications",
          contact: "sales@thetainc.com",
        },
      ],
    },
    {
      id: 5,
      name: "Eve",
      role: "Regional Sales Manager",
      region: "Middle East",
      skills: ["Relationship Building", "Negotiation", "Market Expansion"],
      deals: [
        { client: "Iota Ltd", value: 95000, status: "Closed Won" },
        { client: "Kappa LLC", value: 45000, status: "In Progress" },
        { client: "Lambda Partners", value: 105000, status: "Closed Lost" },
      ],
      clients: [
        {
          name: "Iota Ltd",
          industry: "Hospitality",
          contact: "contact@iotaltd.com",
        },
        { name: "Kappa LLC", industry: "Retail", contact: "info@kappallc.com" },
      ],
    },
  ],
};
