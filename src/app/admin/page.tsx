'use client';

import {
  ShoppingCartIcon,
  UsersIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { getProducts } from '@/data/products';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface Product {
  id: string;
  name: string;
  slug: string;
  price_start: string;
  price_end: string;
  category: string;
  subcategory?: string;
  description: string;
  url_tiktok?: string;
  url_shopee?: string;
  url_tokopedia?: string;
  visit_count?: number;
  image_file: {
    id: string;
    product_id: string;
    filename: string;
    created_at: string;
  }[];
}

interface VisitData {
  date: string;
  visits: number;
}

interface DashboardStats {
  totalProducts: number;
  totalVisits: number;
  averageVisitsPerProduct: number;
  mostVisitedProducts: Product[];
  weeklyVisits: VisitData[];
  dailyVisits: VisitData[];
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  trendType 
}: { 
  title: string; 
  value: string; 
  icon: any; 
  trend?: string; 
  trendValue?: string; 
  trendType?: 'up' | 'down' | 'neutral' 
}) => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:shadow-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        {trend && trendValue && (
          <div className="mt-2 flex items-center">
            {trendType === 'up' ? (
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
            ) : trendType === 'down' ? (
              <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
            ) : null}
            <span className={`ml-1 text-sm font-medium ${
              trendType === 'up' ? 'text-green-600' : 
              trendType === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
      <div className="rounded-full bg-indigo-100 p-3">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-50 opacity-50"></div>
  </div>
);

const ChartCard = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode 
}) => (
  <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg">
    <h2 className="mb-6 text-lg font-semibold text-gray-900">{title}</h2>
    {children}
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalVisits: 0,
    averageVisitsPerProduct: 0,
    mostVisitedProducts: [],
    weeklyVisits: [],
    dailyVisits: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch products and visit statistics in parallel
        const [productsResponse, visitStatsResponse] = await Promise.all([
          getProducts(1, 100),
          fetch('/api/admin/stats').then(res => res.json())
        ]);

        if (!productsResponse.items || !visitStatsResponse.status) {
          throw new Error('Failed to fetch dashboard data');
        }

        const products = productsResponse.items;
        const visitStats = visitStatsResponse.data;
        
        const totalVisits = products.reduce((sum, product) => sum + (product.visit_count || 0), 0);
        const mostVisited = [...products]
          .sort((a, b) => (b.visit_count || 0) - (a.visit_count || 0))
          .slice(0, 5);

        setStats({
          totalProducts: products.length,
          totalVisits,
          averageVisitsPerProduct: products.length ? Math.round(totalVisits / products.length) : 0,
          mostVisitedProducts: mostVisited,
          weeklyVisits: visitStats.weeklyVisits,
          dailyVisits: visitStats.dailyVisits
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const dashboardStats = [
    {
      name: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: ShoppingCartIcon,
    },
    {
      name: 'Total Visits',
      value: stats.totalVisits.toLocaleString(),
      icon: UsersIcon,
    },
    {
      name: 'Avg. Visits/Product',
      value: stats.averageVisitsPerProduct.toLocaleString(),
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your store&apos;s performance
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-500">Loading dashboard data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardStats.map((stat) => (
              <StatCard
                key={stat.name}
                title={stat.name}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartCard title="Weekly Visits (Last 7 Weeks)">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={stats.weeklyVisits}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280' }}
                    />
                    <YAxis 
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      fill="url(#colorVisits)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Daily Visits (Current Month)">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.dailyVisits}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280' }}
                    />
                    <YAxis 
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Bar 
                      dataKey="visits" 
                      fill="#4F46E5"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Most Visited Products */}
          <div className="rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">Most Visited Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Visits
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.mostVisitedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                          {product.visit_count?.toLocaleString() || 0} visits
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 