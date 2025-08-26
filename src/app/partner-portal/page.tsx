"use client";

import React, { useMemo, useState } from "react";
import {
  Download,
  Search,
  Filter,
  ChevronRight,
  Copy,
  Check,
  KeyRound,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
} from "recharts";

// Mock Data
const MOCK_BRANDS = [
  { id: "kit-and-ace", name: "Kit and Ace" },
  { id: "huha", name: "Huha" },
  { id: "level-six", name: "Level Six" },
  { id: "knix", name: "Knix" },
  { id: "lululemon", name: "Lululemon" },
  { id: "left-on-friday", name: "Left on Friday" },
];

const MOCK_SKUS = [
  {
    id: "HUH-BRIEF-01",
    name: "Mineral Brief",
    category: "Underwear",
    status: "Active",
    totalOrders: 1842,
    avgLeadTimeDays: 6.4,
    returnRate: 0.6,
  },
  {
    id: "HUH-THONG-01",
    name: "Mineral Thong",
    category: "Underwear",
    status: "Active",
    totalOrders: 1156,
    avgLeadTimeDays: 5.8,
    returnRate: 0.4,
  },
  {
    id: "HUH-BOXER-01",
    name: "Mineral Boxer Brief",
    category: "Underwear",
    status: "Pilot",
    totalOrders: 218,
    avgLeadTimeDays: 7.1,
    returnRate: 0.3,
  },
  {
    id: "HUH-BRA-01",
    name: "Mineral Bra",
    category: "Bras",
    status: "In Dev",
    totalOrders: 0,
    avgLeadTimeDays: 0,
    returnRate: 0,
  },
];

const MOCK_CUSTOMERS = [
  {
    id: "CUS-1024",
    name: "Alex M.",
    email: "alex****@mail.com",
    doublId: "A9X4B7C2",
    createdAt: "2025-02-05",
    lastOrderId: "ORD-9001",
    lastOrderDate: "2025-08-01",
  },
  {
    id: "CUS-1025",
    name: "Priya K.",
    email: "priya***@mail.com",
    doublId: "Z4T8R1Q9",
    createdAt: "2025-03-11",
    lastOrderId: "ORD-9034",
    lastOrderDate: "2025-08-14",
  },
  {
    id: "CUS-1026",
    name: "Taylor R.",
    email: "taylor**@mail.com",
    doublId: "H7J2L5N0",
    createdAt: "2025-05-20",
    lastOrderId: "ORD-9040",
    lastOrderDate: "2025-08-16",
  },
];

const MOCK_MEASUREMENTS = {
  "CUS-1024": {
    bust: 98.2,
    underbust: 82.4,
    waist: 80.1,
    hip: 104.3,
    torso: 42.8,
    asymmetry_mm: 6,
  },
  "CUS-1025": {
    bust: 92.6,
    underbust: 78.2,
    waist: 76.0,
    hip: 98.4,
    torso: 41.2,
    asymmetry_mm: 3,
  },
  "CUS-1026": {
    bust: 106.9,
    underbust: 90.7,
    waist: 86.3,
    hip: 115.1,
    torso: 44.0,
    asymmetry_mm: 8,
  },
};

const MOCK_PATTERNS = {
  "CUS-1024": {
    dxfUrl: "#",
    pdfUrl: "#",
    objUrl: "#",
    notes: "TEE-V2 pattern v1.3; center front ease +2mm; strap length -4mm.",
  },
  "CUS-1025": {
    dxfUrl: "#",
    pdfUrl: "#",
    objUrl: "#",
    notes: "TEE-V2 pattern v1.2; band +3mm; cup seam eased.",
  },
  "CUS-1026": {
    dxfUrl: "#",
    pdfUrl: "#",
    objUrl: "#",
    notes: "Pilot mastectomy cup left; pocket depth +5mm.",
  },
};

const MOCK_ORDERS = [
  {
    id: "ORD-9001",
    skuId: "HUH-BRIEF-01",
    customerId: "CUS-1024",
    status: "In Production",
    createdAt: "2025-07-30",
    shipBy: "2025-08-06",
    waterSavedL: 32,
    returnsAvoidedProb: 0.35,
  },
  {
    id: "ORD-9034",
    skuId: "HUH-THONG-01",
    customerId: "CUS-1025",
    status: "Shipped",
    createdAt: "2025-08-10",
    shipBy: "2025-08-15",
    waterSavedL: 31,
    returnsAvoidedProb: 0.4,
  },
  {
    id: "ORD-9040",
    skuId: "HUH-BOXER-01",
    customerId: "CUS-1026",
    status: "Queued",
    createdAt: "2025-08-15",
    shipBy: "2025-08-22",
    waterSavedL: 29,
    returnsAvoidedProb: 0.5,
  },
];

// Helper function
function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  return {
    copied,
    async copy(text: string) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      } catch {}
    },
  };
}

// UI Components
const Stat = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-xl font-semibold">{value}</span>
    {sub && <span className="text-xs text-gray-500">{sub}</span>}
  </div>
);

const DataTable = ({
  columns,
  data,
  onRowClick,
}: {
  columns: Array<{
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  data: any[];
  onRowClick?: (row: any) => void;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500 border-b">
          {columns.map((c) => (
            <th key={c.key} className="font-medium py-2 pr-4">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className={`border-b last:border-b-0 hover:bg-gray-50 ${
              onRowClick ? "cursor-pointer" : ""
            }`}
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map((c) => (
              <td key={c.key} className="py-3 pr-4">
                {c.render ? c.render(row[c.key], row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Page Components
function SkusPage() {
  const cols = [
    { key: "id", label: "SKU" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    {
      key: "status",
      label: "Status",
      render: (v: string) => (
        <Badge
          className={
            v === "Active"
              ? "bg-green-100 text-green-800"
              : v === "Pilot"
              ? "text-white"
              : "bg-gray-100 text-gray-800"
          }
          style={v === "Pilot" ? { backgroundColor: "#7c0347" } : {}}
        >
          {v}
        </Badge>
      ),
    },
    { key: "totalOrders", label: "Orders" },
    {
      key: "avgLeadTimeDays",
      label: "Avg Lead Time (d)",
      render: (v: number) => v?.toFixed?.(1),
    },
    { key: "returnRate", label: "Return Rate", render: (v: number) => `${v}%` },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4" />
            <h3 className="text-sm font-semibold tracking-tight">
              Made-to-Measure SKUs
            </h3>
          </div>
          <DataTable columns={cols} data={MOCK_SKUS} />
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <Stat
              label="Active SKUs"
              value={MOCK_SKUS.filter((s) => s.status !== "In Dev").length}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Stat
              label="Total Orders"
              value={MOCK_SKUS.reduce((a, b) => a + b.totalOrders, 0)}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Stat
              label="Avg Lead Time"
              value={`${(
                MOCK_SKUS.filter((s) => s.avgLeadTimeDays).reduce(
                  (a, b) => a + b.avgLeadTimeDays,
                  0
                ) / 2
              ).toFixed(1)} d`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CustomersPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<any>(null);

  const filtered = useMemo(() => {
    if (!query) return MOCK_CUSTOMERS;
    const q = query.toLowerCase();
    return MOCK_CUSTOMERS.filter((c) =>
      [c.name, c.email, c.doublId, c.id].some((x) =>
        x.toLowerCase().includes(q)
      )
    );
  }, [query]);

  const cols = [
    { key: "name", label: "Customer" },
    { key: "email", label: "Email" },
    { key: "doublId", label: "DOUBL ID" },
    { key: "lastOrderId", label: "Last Order" },
    { key: "lastOrderDate", label: "Last Active" },
  ];

  const customerDetail = selected ? (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-end z-20"
      onClick={() => setSelected(null)}
    >
      <div
        className="w-full max-w-xl h-full bg-white shadow-xl border-l p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4" />
          <h3 className="font-semibold">{selected.name}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <Stat label="Customer ID" value={selected.id} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Stat label="DOUBL ID" value={selected.doublId} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Stat label="Email" value={selected.email} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Stat label="Created" value={selected.createdAt} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Customer Type</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold">
                    {selected.id === "CUS-1024" ? "New" : "Existing"}
                  </span>
                  {/* <Badge
                    className={
                      selected.id === "CUS-1024"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {selected.id === "CUS-1024"
                      ? "First Purchase"
                      : "Repeat Customer"}
                  </Badge> */}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Stat
                label="Total Orders"
                value={
                  selected.id === "CUS-1024"
                    ? "1"
                    : selected.id === "CUS-1025"
                    ? "3"
                    : "2"
                }
              />
            </CardContent>
          </Card>
        </div>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold tracking-tight">
                Measurements
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {Object.entries(
                MOCK_MEASUREMENTS[
                  selected.id as keyof typeof MOCK_MEASUREMENTS
                ] || {}
              ).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span className="capitalize text-gray-500">
                    {k.replace("_", " ")}
                  </span>
                  <span className="font-medium">
                    {v}
                    {k.includes("mm") ? " mm" : " cm"}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold tracking-tight">
                Patterns & Assets
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Button size="sm" variant="outline" asChild>
                <a
                  href={
                    (
                      MOCK_PATTERNS[
                        selected.id as keyof typeof MOCK_PATTERNS
                      ] || {}
                    ).dxfUrl
                  }
                >
                  <Download className="w-4 h-4 mr-1" /> Download .DXF
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a
                  href={
                    (
                      MOCK_PATTERNS[
                        selected.id as keyof typeof MOCK_PATTERNS
                      ] || {}
                    ).pdfUrl
                  }
                >
                  <Download className="w-4 h-4 mr-1" /> Download .PDF
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a
                  href={
                    (
                      MOCK_PATTERNS[
                        selected.id as keyof typeof MOCK_PATTERNS
                      ] || {}
                    ).objUrl
                  }
                >
                  <Download className="w-4 h-4 mr-1" /> Download .OBJ
                </a>
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              {
                (MOCK_PATTERNS[selected.id as keyof typeof MOCK_PATTERNS] || {})
                  .notes
              }
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-tight">
                Orders
              </span>
            </div>
            <DataTable
              columns={[
                { key: "id", label: "Order" },
                { key: "skuId", label: "SKU" },
                { key: "status", label: "Status" },
                { key: "createdAt", label: "Created" },
                { key: "shipBy", label: "Ship By" },
              ]}
              data={MOCK_ORDERS.filter((o) => o.customerId === selected.id)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  ) : null;

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, DOUBL ID, or Customer ID"
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4" />
            <h3 className="text-sm font-semibold tracking-tight">Customers</h3>
          </div>
          <DataTable
            columns={cols}
            data={filtered}
            onRowClick={(row) => setSelected(row)}
          />
        </CardContent>
      </Card>
      {customerDetail}
    </div>
  );
}

function OrdersPage() {
  const cols = [
    { key: "id", label: "Order" },
    { key: "skuId", label: "SKU" },
    { key: "customerId", label: "Customer" },
    {
      key: "status",
      label: "Status",
      render: (v: string) => (
        <Badge
          className={
            v === "Shipped"
              ? "bg-green-100 text-green-800"
              : v === "In Production"
              ? "text-white"
              : "bg-gray-100 text-gray-800"
          }
          style={v === "In Production" ? { backgroundColor: "#7c0347" } : {}}
        >
          {v}
        </Badge>
      ),
    },
    { key: "createdAt", label: "Created" },
    { key: "shipBy", label: "Ship By" },
  ];

  const totalWater = MOCK_ORDERS.reduce((a, b) => a + (b.waterSavedL || 0), 0);
  const returnsAvoided = MOCK_ORDERS.reduce(
    (a, b) => a + (b.returnsAvoidedProb || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <Stat
              label="Open Orders"
              value={MOCK_ORDERS.filter((o) => o.status !== "Shipped").length}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Stat
              label="Water Saved (est.)"
              value={`${totalWater} L`}
              sub="vs. conventional dyeing"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Stat
              label="Returns Avoided (est.)"
              value={`${(returnsAvoided * 100).toFixed(0)} pts`}
              sub="modelled probability"
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-4 h-4" />
            <h3 className="text-sm font-semibold tracking-tight">Orders</h3>
          </div>
          <DataTable columns={cols} data={MOCK_ORDERS} />
        </CardContent>
      </Card>
    </div>
  );
}

function ApiKeysPage() {
  const { copied, copy } = useCopyToClipboard();
  const [key] = useState("sk_live_********-DOUBL-EXAMPLE-KEY");

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <KeyRound className="w-4 h-4" />
            <h3 className="text-sm font-semibold tracking-tight">API Access</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Use this key on your backend to authenticate requests to DOUBL
            (server-to-server). Rotate keys regularly and scope them per
            environment.
          </p>
          <div className="flex items-center gap-2 mb-4">
            <code className="px-3 py-2 rounded-xl bg-gray-50 border text-sm flex-1">
              {key}
            </code>
            <Button variant="outline" onClick={() => copy(key)} size="sm">
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Example Endpoints</h4>
            <ul className="text-sm list-disc pl-5 space-y-1 text-gray-700">
              <li>
                GET <code>/api/v1/brands/:brandId/skus</code> — List
                made-to-measure SKUs
              </li>
              <li>
                GET <code>/api/v1/brands/:brandId/customers?query=</code> —
                Search customers
              </li>
              <li>
                GET <code>/api/v1/customers/:id/measurements</code> — Retrieve
                normalized measurements
              </li>
              <li>
                GET <code>/api/v1/customers/:id/patterns</code> — Get pattern
                asset URLs (.DXF, .PDF, .OBJ)
              </li>
              <li>
                GET <code>/api/v1/orders?brandId=</code> — List orders with
                status
              </li>
              <li>
                POST <code>/api/v1/webhooks/fulfillment</code> — Receive status
                updates from your MES/production
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4" />
            <h3 className="text-sm font-semibold tracking-tight">
              Security & Privacy
            </h3>
          </div>
          <ul className="text-sm list-disc pl-5 space-y-1 text-gray-700">
            <li>
              Role-based access (Brand Admin, Ops, CX). PII minimization by
              default.
            </li>
            <li>
              Personally identifiable details masked at UI-level; full export
              gated by permissions.
            </li>
            <li>Audit logs for all data access and pattern exports.</li>
            <li>Optional SSO (SAML/OIDC) for enterprise partners.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function ReportsPage() {
  // Mock data for reports
  const orders = [
    {
      date: "2025-06-01",
      sku: "HUH-BRIEF-01",
      orders: 42,
      returns: 0,
      sales: 4200,
    },
    {
      date: "2025-06-08",
      sku: "HUH-THONG-01",
      orders: 65,
      returns: 0,
      sales: 6500,
    },
    {
      date: "2025-06-15",
      sku: "HUH-BOXER-01",
      orders: 57,
      returns: 1,
      sales: 5700,
    },
    {
      date: "2025-06-22",
      sku: "HUH-BRIEF-01",
      orders: 71,
      returns: 0,
      sales: 7100,
    },
    {
      date: "2025-06-29",
      sku: "HUH-BRA-01",
      orders: 88,
      returns: 0,
      sales: 8800,
    },
    {
      date: "2025-07-06",
      sku: "HUH-THONG-01",
      orders: 93,
      returns: 0,
      sales: 9300,
    },
    {
      date: "2025-07-13",
      sku: "HUH-BRIEF-01",
      orders: 104,
      returns: 0,
      sales: 10400,
    },
  ];

  const customersCohorts = [
    { week: "Jun 1", new: 28, existing: 14 },
    { week: "Jun 8", new: 36, existing: 29 },
    { week: "Jun 15", new: 30, existing: 27 },
    { week: "Jun 22", new: 40, existing: 31 },
    { week: "Jun 29", new: 45, existing: 43 },
    { week: "Jul 6", new: 48, existing: 45 },
    { week: "Jul 13", new: 52, existing: 52 },
  ];

  const bodyMeasurements = Array.from({ length: 200 }).map((_, i) => {
    const under = 60 + Math.random() * 40;
    const bust = under + 4 + Math.random() * 25;
    return {
      id: i + 1,
      underbust: Number(under.toFixed(1)),
      bust: Number(bust.toFixed(1)),
    };
  });

  const BASELINE_RETURN_RATE = 0.3;

  const returnsMeta = useMemo(() => {
    const totalOrders = orders.reduce((a, b) => a + b.orders, 0);
    const baselineReturns = totalOrders * BASELINE_RETURN_RATE;
    const actualReturns = orders.reduce((a, b) => a + b.returns, 0);
    const avoided = Math.max(baselineReturns - actualReturns, 0);
    const avoidedPct =
      baselineReturns === 0 ? 0 : (avoided / baselineReturns) * 100;
    return { totalOrders, baselineReturns, actualReturns, avoided, avoidedPct };
  }, []);

  const downloadCSV = (rows: any[], filename: string) => {
    const headers = Object.keys(rows[0] || {});
    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        headers
          .map((h) => {
            const value = r[h];
            // Handle values that might contain commas or quotes
            if (
              typeof value === "string" &&
              (value.includes(",") || value.includes('"'))
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",")
      ),
    ].join("\n"); // Changed from \\n to \n
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const COLORS = ["#0f766e", "#334155", "#7c3aed", "#f59e0b"];

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-tight">
                Returns Avoided
              </span>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-semibold">
                {returnsMeta.avoided.toFixed(0)}
              </div>
              <div className="text-sm text-gray-500">
                vs. baseline {Math.round(BASELINE_RETURN_RATE * 100)}% (actual{" "}
                {returnsMeta.actualReturns})
              </div>
              <div className="text-sm">
                {returnsMeta.avoidedPct.toFixed(1)}% fewer returns
              </div>

              {/* Assumptions & Method */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-xs font-semibold text-gray-900 mb-2">
                  Returns Avoided — Assumptions & Method
                </h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>
                    • Baseline return rate is configurable per partner (default
                    30%).
                  </li>
                  <li>
                    • Returns avoided = (Orders × Baseline) − Actual returns.
                  </li>
                  <li>
                    • For made-to-measure, we expect near-zero returns; use this
                    metric to quantify the margin impact versus size-based
                    workflows.
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadCSV(orders, "returns_report.csv")}
              >
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-tight">
                New vs Existing Customers
              </span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customersCohorts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="new" stackId="a" fill={COLORS[0]} name="New" />
                  <Bar
                    dataKey="existing"
                    stackId="a"
                    fill={COLORS[1]}
                    name="Existing"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-tight">
                Orders (Weekly)
              </span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke={COLORS[2]} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row - Sales by SKU */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-tight">
              Sales by SKU
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sku" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill={COLORS[2]} name="Sales ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Body Measurements */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-tight">
              Customer Body Measurements (Bust vs Underbust)
            </span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="underbust"
                  name="Underbust (cm)"
                />
                <YAxis type="number" dataKey="bust" name="Bust (cm)" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter
                  data={bodyMeasurements}
                  fill={COLORS[3]}
                  name="Customers"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            This wider distribution highlights fit opportunities across
            bust/underbust ranges beyond current retail sizing.
          </p>
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                downloadCSV(bodyMeasurements, "body_measurements.csv")
              }
            >
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Navigation
const NAV = [
  { key: "skus", label: "SKUs", icon: Package, component: SkusPage },
  {
    key: "customers",
    label: "Customers",
    icon: Users,
    component: CustomersPage,
  },
  { key: "orders", label: "Orders", icon: ShoppingCart, component: OrdersPage },
  { key: "reports", label: "Reports", icon: Database, component: ReportsPage },
  {
    key: "apikeys",
    label: "API & Settings",
    icon: KeyRound,
    component: ApiKeysPage,
  },
];

export default function DoublB2BPortal() {
  const router = useRouter();
  const [active, setActive] = useState("skus");
  const [brandId, setBrandId] = useState(MOCK_BRANDS[0].id);

  const ActiveComp =
    NAV.find((n) => n.key === active)?.component || (() => null);
  const brandName =
    MOCK_BRANDS.find((b) => b.id === brandId)?.name || "Partner";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-gray-700 hover:text-gray-900 mr-2"
            >
              ← Back to Home
            </Button>
            <div
              className="w-8 h-8 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#800020" }}
            >
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div>
              <div className="text-sm text-gray-500 leading-none">
                DOUBL B2B
              </div>
              <div className="font-semibold leading-none">Partner Portal</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={brandId} onValueChange={setBrandId}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MOCK_BRANDS.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-[220px_1fr] gap-6">
        <nav className="md:h-[calc(100vh-120px)] md:sticky md:top-[88px]">
          <Card>
            <CardContent className="p-2">
              {NAV.map((n) => (
                <Button
                  key={n.key}
                  onClick={() => setActive(n.key)}
                  variant={active === n.key ? "default" : "ghost"}
                  className={`w-full justify-start mb-1 ${
                    active === n.key
                      ? "text-white hover:text-gray-100"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={active === n.key ? { backgroundColor: "#800020" } : {}}
                  size="sm"
                >
                  <n.icon className="w-4 h-4 mr-2" />
                  {n.label}
                  {active === n.key && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Button>
              ))}
            </CardContent>
          </Card>
        </nav>

        <main>
          <div className="mb-6 grid md:grid-cols-3 gap-4">
            <Card className="border-l-4" style={{ borderLeftColor: "#800020" }}>
              <CardContent className="p-4">
                <Stat label="Brand" value={brandName} sub="Connected" />
              </CardContent>
            </Card>
            <Card className="border-l-4" style={{ borderLeftColor: "#7c0347" }}>
              <CardContent className="p-4">
                <Stat label="Active Customers" value={MOCK_CUSTOMERS.length} />
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-gray-400">
              <CardContent className="p-4">
                <Stat label="MTM SKUs" value={MOCK_SKUS.length} />
              </CardContent>
            </Card>
          </div>
          <ActiveComp />
        </main>
      </div>

      <footer className="text-center text-xs text-gray-500 py-6">
        © {new Date().getFullYear()} DOUBL — Size-free infrastructure for
        retail.
      </footer>
    </div>
  );
}
