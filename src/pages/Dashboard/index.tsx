
import React from 'react';
import {
  Server,
  AlertTriangle,
  ClipboardList,
  ClipboardCheck,
  DollarSign,
  Plus,
  ArrowUpRight,
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { monthlyWorkOrderData, deviceTypeDistribution, faultTrendData } from '@/mock/data';

const STAT_COLORS = [
  { bg: 'bg-primary-50', text: 'text-primary-600', icon: 'bg-primary-500' },
  { bg: 'bg-success-50', text: 'text-success-600', icon: 'bg-success-500' },
  { bg: 'bg-danger-50', text: 'text-danger-600', icon: 'bg-danger-500' },
  { bg: 'bg-warning-50', text: 'text-warning-600', icon: 'bg-warning-500' },
  { bg: 'bg-secondary-50', text: 'text-secondary-600', icon: 'bg-secondary-500' },
  { bg: 'bg-urgent-50', text: 'text-urgent-600', icon: 'bg-urgent-500' },
  { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'bg-purple-500' },
  { bg: 'bg-slate-50', text: 'text-slate-600', icon: 'bg-slate-500' },
];

const quickActions = [
  { label: '新增报修', icon: Plus, color: 'bg-primary-500' },
  { label: '派工处理', icon: ClipboardList, color: 'bg-success-500' },
  { label: '设备巡检', icon: ClipboardCheck, color: 'bg-secondary-500' },
  { label: '发布公告', icon: AlertTriangle, color: 'bg-warning-500' },
];

const Dashboard: React.FC = () => {
  const { dashboardStats, workOrders, setCurrentPage } = useAppStore();

  const stats = [
    { label: '设备总数', value: dashboardStats.totalDevices, icon: Server, change: '+2', trend: 'up' },
    { label: '正常运行', value: dashboardStats.normalDevices, icon: CheckCircle, change: '+1', trend: 'up' },
    { label: '故障设备', value: dashboardStats.faultDevices, icon: AlertTriangle, change: '-1', trend: 'down' },
    { label: '待处理工单', value: dashboardStats.pendingWorkOrders, icon: Clock, change: '+3', trend: 'down' },
    { label: '今日工单', value: dashboardStats.todayWorkOrders, icon: ClipboardList, change: '+5', trend: 'up' },
    { label: '今日完成', value: dashboardStats.completedToday, icon: CheckCircle, change: '+1', trend: 'up' },
    { label: '待巡检', value: dashboardStats.pendingInspections, icon: ClipboardCheck, change: '0', trend: 'same' },
    { label: '本月费用', value: `¥${dashboardStats.monthlyCost}`, icon: DollarSign, change: '+12%', trend: 'up' },
  ];

  const pendingWorkOrders = workOrders.filter(wo => wo.status === 'pending' || wo.status === 'assigned').slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-urgent-100 text-urgent-700';
      case 'high': return 'bg-danger-100 text-danger-700';
      case 'medium': return 'bg-warning-100 text-warning-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return '紧急';
      case 'high': return '高';
      case 'medium': return '中';
      default: return '低';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'assigned': return 'bg-primary-100 text-primary-700';
      case 'in_progress': return 'bg-secondary-100 text-secondary-700';
      case 'completed': return 'bg-success-100 text-success-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return '待派工';
      case 'assigned': return '已派工';
      case 'in_progress': return '处理中';
      case 'completed': return '已完成';
      default: return '已关闭';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">工作台</h1>
          <p className="text-slate-500 mt-1">欢迎回来，张主管！今天是 2026年6月7日 星期日</p>
        </div>
        <button className="btn btn-primary" onClick={() => setCurrentPage('workorders')}>
          <Plus size={18} className="mr-2" />
          新建工单
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.slice(0, 4).map((stat, index) => {
          const Icon = stat.icon;
          const colors = STAT_COLORS[index];
          return (
            <div key={stat.label} className="card card-hover p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2 text-xs">
                    <span className={cn(
                      'flex items-center',
                      stat.trend === 'up' ? 'text-success-600' : stat.trend === 'down' ? 'text-danger-600' : 'text-slate-500'
                    )}>
                      <TrendingUp size={12} className={cn('mr-1', stat.trend === 'down' && 'rotate-180')} />
                      {stat.change}
                    </span>
                    <span className="text-slate-400 ml-1">较昨日</span>
                  </div>
                </div>
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white', colors.icon)}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.slice(4).map((stat, index) => {
          const Icon = stat.icon;
          const colors = STAT_COLORS[index + 4];
          return (
            <div key={stat.label} className="card card-hover p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2 text-xs">
                    <span className={cn(
                      'flex items-center',
                      stat.trend === 'up' ? 'text-success-600' : stat.trend === 'down' ? 'text-danger-600' : 'text-slate-500'
                    )}>
                      <TrendingUp size={12} className={cn('mr-1', stat.trend === 'down' && 'rotate-180')} />
                      {stat.change}
                    </span>
                    <span className="text-slate-400 ml-1">较昨日</span>
                  </div>
                </div>
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white', colors.icon)}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">工单趋势</h3>
            <select className="input py-1.5 text-sm w-32">
              <option>最近6个月</option>
              <option>最近12个月</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyWorkOrderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="count" name="总工单" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="已完成" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">设备类型分布</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">待处理工单</h3>
            <button
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
              onClick={() => setCurrentPage('workorders')}
            >
              查看全部 <ArrowUpRight size={14} className="ml-1" />
            </button>
          </div>
          <div className="space-y-3">
            {pendingWorkOrders.map((wo) => (
              <div
                key={wo.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => setCurrentPage('workorders')}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                    <ClipboardList size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{wo.title}</p>
                    <p className="text-xs text-slate-500">{wo.deviceName} · {wo.reporter}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={cn('badge', getPriorityColor(wo.priority))}>
                    {getPriorityLabel(wo.priority)}
                  </span>
                  <span className={cn('badge', getStatusColor(wo.status))}>
                    {getStatusLabel(wo.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">快捷操作</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                  onClick={() => {
                    if (action.label === '新增报修' || action.label === '派工处理') {
                      setCurrentPage('workorders');
                    } else if (action.label === '设备巡检') {
                      setCurrentPage('inspection');
                    } else if (action.label === '发布公告') {
                      setCurrentPage('notices');
                    }
                  }}
                >
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform', action.color)}>
                    <Icon size={22} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{action.label}</span>
                </button>
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

export default Dashboard;

