
import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  DollarSign,
  Server,
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import {
  monthlyWorkOrderData,
  deviceTypeDistribution,
  faultTrendData
} from '@/mock/data';

const Analytics: React.FC = () => {
  const { devices, workOrders, dashboardStats } = useAppStore();
  const [timeRange, setTimeRange] = useState('6month');

  const calculateLifeRemaining = (installDate: string, lifespan: number) => {
    const install = new Date(installDate);
    const now = new Date();
    const usedYears = (now.getTime() - install.getTime()) / (1000 * 60 * 60 * 24 * 365);
    const remaining = Math.max(0, lifespan - usedYears);
    const percentage = (remaining / lifespan) * 100;
    return { remaining: remaining.toFixed(1), percentage: Math.round(percentage) };
  };

  const getLifeStatusColor = (percentage: number) => {
    if (percentage > 60) return 'bg-success-500';
    if (percentage > 30) return 'bg-warning-500';
    return 'bg-danger-500';
  };

  const workOrderCompletionRate = workOrders.length > 0
    ? Math.round((workOrders.filter(wo => wo.status === 'completed').length / workOrders.length) * 100)
    : 0;

  const avgCostPerWorkOrder = 1350 / workOrders.filter(wo => wo.cost > 0).length || 0;

  const monthlyCostData = [
    { month: '1月', cost: 2400 },
    { month: '2月', cost: 1800 },
    { month: '3月', cost: 3200 },
    { month: '4月', cost: 2600 },
    { month: '5月', cost: 3100 },
    { month: '6月', cost: 1350 },
  ];

  const deviceHealthData = devices.map((d) => {
    const life = calculateLifeRemaining(d.installDate, d.lifespan);
    return {
      name: d.name.length > 8 ? d.name.slice(0, 8) + '...' : d.name,
      health: life.percentage,
      fullName: d.name
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">数据分析</h1>
          <p className="text-slate-500 mt-1">设备寿命评估和运营数据分析</p>
        </div>
        <select
          className="input py-2 w-40"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="1month">最近1个月</option>
          <option value="3month">最近3个月</option>
          <option value="6month">最近6个月</option>
          <option value="1year">最近12个月</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">工单完成率</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{workOrderCompletionRate}%</p>
              <p className="text-xs text-success-600 mt-1 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                +5.2% 较上月
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-success-100 flex items-center justify-center text-success-600">
              <CheckCircle size={28} />
            </div>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-success-500 h-2 rounded-full"
              style={{ width: `${workOrderCompletionRate}%` }}
            ></div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">平均响应时间</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">2.4<span className="text-lg">小时</span></p>
              <p className="text-xs text-success-600 mt-1 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                -0.8h 较上月
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600">
              <Clock size={28} />
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">平均维修成本</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">¥{Math.round(avgCostPerWorkOrder)}</p>
              <p className="text-xs text-danger-600 mt-1 flex items-center">
                <TrendingUp size={12} className="mr-1 rotate-180" />
                +8.3% 较上月
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-warning-100 flex items-center justify-center text-warning-600">
              <DollarSign size={28} />
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">设备在线率</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">87.5%</p>
              <p className="text-xs text-warning-600 mt-1 flex items-center">
                <AlertTriangle size={12} className="mr-1" />
                1台设备故障
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-secondary-100 flex items-center justify-center text-secondary-600">
              <Server size={28} />
            </div>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-secondary-500 h-2 rounded-full"
              style={{ width: '87.5%' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">工单趋势分析</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyWorkOrderData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="count" name="总工单" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2} />
                <Area type="monotone" dataKey="completed" name="已完成" stroke="#10b981" fillOpacity={1} fill="url(#colorCompleted)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">维修费用趋势</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value) => [`¥${value}`, '费用']}
                />
                <Bar dataKey="cost" name="维修费用" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">故障类型分布</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {deviceTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {deviceTypeDistribution.map((item) => (
              <div key={item.name} className="flex items-center text-xs">
                <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">设备寿命评估</h3>
          <div className="space-y-4">
            {devices.slice(0, 5).map((device) => {
              const life = calculateLifeRemaining(device.installDate, device.lifespan);
              return (
                <div key={device.id} className="flex items-center gap-4">
                  <div className="w-40 shrink-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{device.name}</p>
                    <p className="text-xs text-slate-500">剩余 {life.remaining} 年</p>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div
                        className={cn('h-3 rounded-full transition-all', getLifeStatusColor(life.percentage))}
                        style={{ width: `${life.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 w-12 text-right">
                    {life.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-semibold text-slate-900 mb-4">本周故障趋势</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={faultTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
              <Line type="monotone" dataKey="access_control" name="门禁" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="gate" name="道闸" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="elevator_screen" name="电梯屏" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="water_pump" name="水泵" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="lighting" name="照明" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="monitor" name="监控" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

