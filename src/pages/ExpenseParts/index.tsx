
import React, { useState } from 'react';
import {
  Wallet,
  Plus,
  Search,
  Filter,
  DollarSign,
  Package,
  Building,
  Star,
  Phone,
  MapPin,
  X,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  User
} from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';

const ExpenseParts: React.FC = () => {
  const { spareParts, suppliers, expenseRecords } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'expense' | 'parts' | 'suppliers'>('expense');

  const filteredParts = spareParts.filter((part) =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    part.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={s <= Math.floor(rating) ? 'text-warning-500 fill-warning-500' : 'text-slate-300'}
          />
        ))}
        <span className="text-sm text-slate-600 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success-100 text-success-700';
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'rejected': return 'bg-danger-100 text-danger-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return '已审批';
      case 'pending': return '待审批';
      case 'rejected': return '已拒绝';
      default: return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">费用备件</h1>
          <p className="text-slate-500 mt-1">管理维修费用、备品备件和供应商</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary">
            <DollarSign size={16} className="mr-2" />
            费用登记
          </button>
          <button className="btn btn-primary">
            <Plus size={18} className="mr-2" />
            新增备件
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">本月维修费用</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">¥2,850</p>
              <p className="text-xs text-success-600 mt-1 flex items-center">
                <TrendingUp size={12} className="mr-1" />
                +12.5% 较上月
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">备件种类</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{spareParts.length}</p>
              <p className="text-xs text-slate-500 mt-1">类备品备件</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success-100 flex items-center justify-center text-success-600">
              <Package size={24} />
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">合作供应商</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{suppliers.length}</p>
              <p className="text-xs text-slate-500 mt-1">家供应商</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center text-secondary-600">
              <Building size={24} />
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">库存预警</p>
              <p className="text-2xl font-bold text-danger-600 mt-2">
                {spareParts.filter(p => p.stock <= p.minStock).length}
              </p>
              <p className="text-xs text-danger-600 mt-1 flex items-center">
                <AlertTriangle size={12} className="mr-1" />
                低于安全库存
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-danger-100 flex items-center justify-center text-danger-600">
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-1 inline-flex">
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'expense' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:text-slate-900'
          )}
          onClick={() => setActiveTab('expense')}
        >
          <div className="flex items-center gap-2">
            <Wallet size={16} />
            费用分摊
          </div>
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'parts' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:text-slate-900'
          )}
          onClick={() => setActiveTab('parts')}
        >
          <div className="flex items-center gap-2">
            <Package size={16} />
            备品备件
          </div>
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'suppliers' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:text-slate-900'
          )}
          onClick={() => setActiveTab('suppliers')}
        >
          <div className="flex items-center gap-2">
            <Building size={16} />
            供应商
          </div>
        </button>
      </div>

      {activeTab === 'expense' ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="table-header">工单标题</th>
                  <th className="table-header">费用类别</th>
                  <th className="table-header">金额</th>
                  <th className="table-header">分摊明细</th>
                  <th className="table-header">日期</th>
                  <th className="table-header">状态</th>
                  <th className="table-header">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {expenseRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                    <td className="table-cell font-medium text-slate-900">{record.workOrderTitle}</td>
                    <td className="table-cell text-slate-600">{record.category}</td>
                    <td className="table-cell font-semibold text-slate-900">¥{record.amount.toLocaleString()}</td>
                    <td className="table-cell">
                      <div className="flex flex-wrap gap-1">
                        {record.allocation.map((a, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {a.building}: ¥{a.amount}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="table-cell text-slate-600">{record.date}</td>
                    <td className="table-cell">
                      <span className={cn('badge', getStatusColor(record.status))}>
                        {getStatusLabel(record.status)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        查看详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'parts' ? (
        <>
          <div className="card p-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="搜索备件名称、类别..."
                className="input pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParts.map((part) => (
              <div key={part.id} className="card card-hover p-5">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                    <Package size={22} />
                  </div>
                  {part.stock <= part.minStock && (
                    <span className="badge bg-danger-100 text-danger-700">库存预警</span>
                  )}
                </div>
                <h4 className="font-semibold text-slate-900 mt-4">{part.name}</h4>
                <p className="text-sm text-slate-500 mt-1">{part.category}</p>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500">库存数量</p>
                    <p className={cn(
                      'font-semibold mt-1',
                      part.stock <= part.minStock ? 'text-danger-600' : 'text-slate-900'
                    )}>
                      {part.stock} {part.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">单价</p>
                    <p className="font-semibold text-slate-900 mt-1">¥{part.price}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  供应商：{part.supplierName}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="card card-hover p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xl">
                    {supplier.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">{supplier.name}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      {renderStars(supplier.rating)}
                      <span className="text-sm text-slate-500">服务 {supplier.serviceCount} 次</span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
                      <span className="flex items-center">
                        <User size={14} className="mr-1.5 text-slate-400" />
                        联系人：{supplier.contact}
                      </span>
                      <span className="flex items-center">
                        <Phone size={14} className="mr-1.5 text-slate-400" />
                        {supplier.phone}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1.5 text-slate-400" />
                        {supplier.address}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-secondary">
                  查看详情
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseParts;

