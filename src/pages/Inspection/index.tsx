
import React, { useState } from 'react';
import {
  ClipboardCheck,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  ChevronRight,
  MapPin,
  User,
  CheckSquare
} from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import type { InspectionTask, InspectionItem } from '@/types';

const Inspection: React.FC = () => {
  const { inspectionTasks, maintenancePlans, updateInspectionItem } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'inspection' | 'maintenance'>('inspection');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState<InspectionTask | null>(null);

  const filteredTasks = inspectionTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success-100 text-success-700';
      case 'in_progress': return 'bg-secondary-100 text-secondary-700';
      case 'overdue': return 'bg-danger-100 text-danger-700';
      default: return 'bg-warning-100 text-warning-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in_progress': return '进行中';
      case 'overdue': return '已逾期';
      case 'upcoming': return '即将到期';
      default: return '待执行';
    }
  };

  const handleItemResult = (taskId: string, itemId: string, result: 'normal' | 'abnormal', remark: string = '') => {
    updateInspectionItem(taskId, itemId, result, remark);
    if (selectedTask) {
      const updated = inspectionTasks.find(t => t.id === taskId);
      if (updated) setSelectedTask(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">巡检保养</h1>
          <p className="text-slate-500 mt-1">管理设备巡检任务和保养计划</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} className="mr-2" />
          新建巡检
        </button>
      </div>

      <div className="card p-1 inline-flex">
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'inspection' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:text-slate-900'
          )}
          onClick={() => setActiveTab('inspection')}
        >
          巡检任务
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'maintenance' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:text-slate-900'
          )}
          onClick={() => setActiveTab('maintenance')}
        >
          保养计划
        </button>
      </div>

      {activeTab === 'inspection' ? (
        <>
          <div className="card p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="搜索巡检任务..."
                  className="input pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-slate-500" />
                <select className="input py-2 text-sm w-36">
                  <option value="all">全部状态</option>
                  <option value="pending">待执行</option>
                  <option value="in_progress">进行中</option>
                  <option value="completed">已完成</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="card card-hover p-5 cursor-pointer"
                onClick={() => { setSelectedTask(task); setShowDetail(true); }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      task.status === 'completed' ? 'bg-success-100 text-success-600' :
                      task.status === 'in_progress' ? 'bg-secondary-100 text-secondary-600' :
                      'bg-primary-100 text-primary-600'
                    )}>
                      <ClipboardCheck size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{task.title}</h3>
                        <span className={cn('badge', getStatusColor(task.status))}>
                          {getStatusLabel(task.status)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{task.id}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                        <span className="flex items-center">
                          <MapPin size={14} className="mr-1.5 text-slate-400" />
                          巡检路线：{task.route}
                        </span>
                        <span className="flex items-center">
                          <User size={14} className="mr-1.5 text-slate-400" />
                          {task.assigneeName}
                        </span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1.5 text-slate-400" />
                          {task.scheduleDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">检查项进度</span>
                    <span className="text-sm font-medium text-slate-900">
                      {task.items.filter(i => i.result !== null).length} / {task.items.length}
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${(task.items.filter(i => i.result !== null).length / task.items.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="table-header">设备名称</th>
                  <th className="table-header">保养类型</th>
                  <th className="table-header">保养周期</th>
                  <th className="table-header">上次保养</th>
                  <th className="table-header">下次保养</th>
                  <th className="table-header">状态</th>
                  <th className="table-header">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {maintenancePlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                    <td className="table-cell font-medium text-slate-900">{plan.deviceName}</td>
                    <td className="table-cell text-slate-600">{plan.type}</td>
                    <td className="table-cell text-slate-600">
                      每 {plan.cycle} {plan.cycleUnit === 'month' ? '个月' : plan.cycleUnit === 'year' ? '年' : plan.cycleUnit === 'week' ? '周' : '天'}
                    </td>
                    <td className="table-cell text-slate-600">{plan.lastDate}</td>
                    <td className="table-cell text-slate-600">{plan.nextDate}</td>
                    <td className="table-cell">
                      <span className={cn('badge', getStatusColor(plan.status))}>
                        {getStatusLabel(plan.status)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        执行保养
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showDetail && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{selectedTask.title}</h3>
                <p className="text-sm text-slate-500">巡检路线：{selectedTask.route}</p>
              </div>
              <button
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full"
                onClick={() => setShowDetail(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">负责人：{selectedTask.assigneeName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">计划日期：{selectedTask.scheduleDate}</span>
                </div>
                <span className={cn('badge', getStatusColor(selectedTask.status))}>
                  {getStatusLabel(selectedTask.status)}
                </span>
              </div>

              <h4 className="font-semibold text-slate-900 mb-4">检查项清单</h4>
              <div className="space-y-3">
                {selectedTask.items.map((item, idx) => (
                  <div key={item.id} className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center mt-0.5 shrink-0',
                          item.result === 'normal' ? 'bg-success-500 text-white' :
                          item.result === 'abnormal' ? 'bg-danger-500 text-white' :
                          'bg-white border-2 border-slate-300'
                        )}>
                          {item.result && <CheckCircle size={14} />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            <span className="text-slate-400 mr-2">{idx + 1}.</span>
                            {item.checkItem}
                          </p>
                          <p className="text-sm text-slate-500">{item.deviceName}</p>
                          {item.remark && (
                            <p className="text-sm text-slate-600 mt-1 bg-white rounded-lg p-2">
                              备注：{item.remark}
                            </p>
                          )}
                        </div>
                      </div>
                      {selectedTask.status !== 'completed' && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            className={cn(
                              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                              item.result === 'normal'
                                ? 'bg-success-500 text-white'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-success-50 hover:border-success-300'
                            )}
                            onClick={() => handleItemResult(selectedTask.id, item.id, 'normal')}
                          >
                            正常
                          </button>
                          <button
                            className={cn(
                              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                              item.result === 'abnormal'
                                ? 'bg-danger-500 text-white'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-danger-50 hover:border-danger-300'
                            )}
                            onClick={() => handleItemResult(selectedTask.id, item.id, 'abnormal')}
                          >
                            异常
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
                <button className="btn btn-secondary" onClick={() => setShowDetail(false)}>关闭</button>
                {selectedTask.status !== 'completed' && (
                  <button className="btn btn-success">
                    <CheckSquare size={16} className="mr-2" />
                    完成巡检
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspection;

