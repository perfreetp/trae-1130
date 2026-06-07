
import React, { useState } from 'react';
import {
  ClipboardList,
  Plus,
  Search,
  Filter,
  User,
  Clock,
  MapPin,
  Camera,
  CheckCircle,
  AlertTriangle,
  X,
  UserPlus,
  CheckSquare,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import type { WorkOrder, WorkOrderStatus, WorkOrderPriority } from '@/types';

const statusOptions: { value: 'all' | WorkOrderStatus; label: string }[] = [
  { value: 'all', label: '全部状态' },
  { value: 'pending', label: '待派工' },
  { value: 'assigned', label: '已派工' },
  { value: 'in_progress', label: '处理中' },
  { value: 'completed', label: '已完成' },
  { value: 'closed', label: '已关闭' },
];

const priorityOptions: { value: 'all' | WorkOrderPriority; label: string }[] = [
  { value: 'all', label: '全部优先级' },
  { value: 'urgent', label: '紧急' },
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
];

const WorkOrderList: React.FC = () => {
  const { workOrders, users, devices, assignWorkOrder, updateWorkOrderStatus, addWorkOrder } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | WorkOrderStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | WorkOrderPriority>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [newWO, setNewWO] = useState({
    title: '',
    description: '',
    deviceId: '',
    reporter: '',
    reporterPhone: '',
    priority: 'medium' as WorkOrderPriority
  });

  const filteredWO = workOrders.filter((wo) => {
    const matchesSearch = wo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.reporter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wo.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || wo.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: WorkOrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'assigned': return 'bg-primary-100 text-primary-700';
      case 'in_progress': return 'bg-secondary-100 text-secondary-700';
      case 'completed': return 'bg-success-100 text-success-700';
      case 'closed': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: WorkOrderStatus) => {
    switch (status) {
      case 'pending': return '待派工';
      case 'assigned': return '已派工';
      case 'in_progress': return '处理中';
      case 'completed': return '已完成';
      case 'closed': return '已关闭';
      default: return '未知';
    }
  };

  const getPriorityColor = (priority: WorkOrderPriority) => {
    switch (priority) {
      case 'urgent': return 'bg-urgent-100 text-urgent-700';
      case 'high': return 'bg-danger-100 text-danger-700';
      case 'medium': return 'bg-warning-100 text-warning-700';
      case 'low': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityLabel = (priority: WorkOrderPriority) => {
    switch (priority) {
      case 'urgent': return '紧急';
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '未知';
    }
  };

  const getStepIndex = (status: WorkOrderStatus) => {
    const steps: WorkOrderStatus[] = ['pending', 'assigned', 'in_progress', 'completed', 'closed'];
    return steps.indexOf(status);
  };

  const handleCreateWO = () => {
    if (!newWO.title || !newWO.deviceId) return;
    const device = devices.find(d => d.id === newWO.deviceId);
    addWorkOrder({
      ...newWO,
      deviceName: device?.name || '',
      assigneeId: null,
      assigneeName: null,
      status: 'pending',
      assignTime: null,
      checkInTime: null,
      completeTime: null,
      photos: [],
      remark: '',
      cost: 0
    });
    setShowCreateModal(false);
    setNewWO({ title: '', description: '', deviceId: '', reporter: '', reporterPhone: '', priority: 'medium' });
  };

  const handleAssign = (woId: string, userId: string) => {
    assignWorkOrder(woId, userId);
    setShowAssignModal(false);
    setSelectedWO(null);
  };

  const handleCheckIn = (woId: string) => {
    updateWorkOrderStatus(woId, 'in_progress');
    setShowDetail(false);
  };

  const handleComplete = (woId: string) => {
    updateWorkOrderStatus(woId, 'completed');
    setShowDetail(false);
  };

  const engineerUsers = users.filter(u => u.role === 'engineer' || u.role === 'supervisor');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">工单处理</h1>
          <p className="text-slate-500 mt-1">管理设备报修、派工和维修流程</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} className="mr-2" />
          新建报修
        </button>
      </div>

      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="搜索工单标题、设备、报修人..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-500" />
              <select
                className="input py-2 text-sm w-36"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                className="input py-2 text-sm w-36"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as any)}
              >
                {priorityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredWO.map((wo) => (
          <div
            key={wo.id}
            className="card card-hover p-5 cursor-pointer"
            onClick={() => { setSelectedWO(wo); setShowDetail(true); }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  wo.status === 'completed' ? 'bg-success-100 text-success-600' :
                  wo.status === 'in_progress' ? 'bg-secondary-100 text-secondary-600' :
                  'bg-primary-100 text-primary-600'
                )}>
                  <ClipboardList size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{wo.title}</h3>
                    <span className={cn('badge', getPriorityColor(wo.priority))}>
                      {getPriorityLabel(wo.priority)}
                    </span>
                    <span className={cn('badge', getStatusColor(wo.status))}>
                      {getStatusLabel(wo.status)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{wo.id}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <span className="flex items-center">
                      <MapPin size={14} className="mr-1.5 text-slate-400" />
                      {wo.deviceName}
                    </span>
                    <span className="flex items-center">
                      <User size={14} className="mr-1.5 text-slate-400" />
                      {wo.reporter}
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1.5 text-slate-400" />
                      {wo.createTime}
                    </span>
                    {wo.assigneeName && (
                      <span className="flex items-center">
                        <UserPlus size={14} className="mr-1.5 text-slate-400" />
                        {wo.assigneeName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center">
                {['待派工', '已派工', '处理中', '已完成'].map((step, idx) => {
                  const isActive = idx <= getStepIndex(wo.status);
                  const isCurrent = idx === getStepIndex(wo.status);
                  return (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                          isActive
                            ? isCurrent
                              ? 'bg-primary-600 text-white'
                              : 'bg-success-100 text-success-700'
                            : 'bg-slate-100 text-slate-400'
                        )}>
                          {isActive && !isCurrent ? <CheckCircle size={16} /> : idx + 1}
                        </div>
                        <span className={cn(
                          'text-xs mt-1.5',
                          isCurrent ? 'text-primary-600 font-medium' : 'text-slate-500'
                        )}>
                          {step}
                        </span>
                      </div>
                      {idx < 3 && (
                        <div className={cn(
                          'h-0.5 flex-1 mx-2 mt-4',
                          isActive && idx < getStepIndex(wo.status) ? 'bg-success-400' : 'bg-slate-200'
                        )}></div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {filteredWO.length === 0 && (
          <div className="card p-12 text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-slate-500">暂无匹配的工单</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg animate-slide-up">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">新建报修工单</h3>
              <button
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="label">工单标题 *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="请输入工单标题"
                  value={newWO.title}
                  onChange={(e) => setNewWO({ ...newWO, title: e.target.value })}
                />
              </div>
              <div>
                <label className="label">关联设备 *</label>
                <select
                  className="input"
                  value={newWO.deviceId}
                  onChange={(e) => setNewWO({ ...newWO, deviceId: e.target.value })}
                >
                  <option value="">请选择设备</option>
                  {devices.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} - {d.location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">问题描述</label>
                <textarea
                  className="input min-h-[100px] resize-none"
                  placeholder="请详细描述问题情况"
                  value={newWO.description}
                  onChange={(e) => setNewWO({ ...newWO, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">报修人</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="报修人姓名"
                    value={newWO.reporter}
                    onChange={(e) => setNewWO({ ...newWO, reporter: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">联系电话</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="联系电话"
                    value={newWO.reporterPhone}
                    onChange={(e) => setNewWO({ ...newWO, reporterPhone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="label">优先级</label>
                <select
                  className="input"
                  value={newWO.priority}
                  onChange={(e) => setNewWO({ ...newWO, priority: e.target.value as WorkOrderPriority })}
                >
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                  <option value="urgent">紧急</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>取消</button>
              <button className="btn btn-primary" onClick={handleCreateWO}>创建工单</button>
            </div>
          </div>
        </div>
      )}

      {showDetail && selectedWO && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">工单详情</h3>
              <button
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full"
                onClick={() => setShowDetail(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{selectedWO.title}</h4>
                  <p className="text-slate-500 mt-1">{selectedWO.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('badge', getPriorityColor(selectedWO.priority))}>
                    {getPriorityLabel(selectedWO.priority)}
                  </span>
                  <span className={cn('badge', getStatusColor(selectedWO.status))}>
                    {getStatusLabel(selectedWO.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">关联设备</p>
                  <p className="font-medium text-slate-900 mt-1">{selectedWO.deviceName}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">报修人</p>
                  <p className="font-medium text-slate-900 mt-1">{selectedWO.reporter}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">联系电话</p>
                  <p className="font-medium text-slate-900 mt-1">{selectedWO.reporterPhone}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">指派人员</p>
                  <p className="font-medium text-slate-900 mt-1">{selectedWO.assigneeName || '未指派'}</p>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-semibold text-slate-900 mb-3">问题描述</h5>
                <p className="text-slate-600 bg-slate-50 rounded-xl p-4">{selectedWO.description || '无'}</p>
              </div>

              <div className="mt-6">
                <h5 className="font-semibold text-slate-900 mb-3">维修照片</h5>
                {selectedWO.photos.length > 0 ? (
                  <div className="grid grid-cols-4 gap-3">
                    {selectedWO.photos.map((photo, idx) => (
                      <div key={idx} className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                        <Camera size={24} className="text-slate-400" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 bg-slate-50 rounded-xl p-4 text-center">暂无照片</p>
                )}
              </div>

              <div className="mt-6">
                <h5 className="font-semibold text-slate-900 mb-3">处理进度</h5>
                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-success-500 mt-2 mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">工单创建</p>
                      <p className="text-xs text-slate-500">{selectedWO.createTime}</p>
                    </div>
                  </div>
                  {selectedWO.assignTime && (
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-success-500 mt-2 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">已派工给 {selectedWO.assigneeName}</p>
                        <p className="text-xs text-slate-500">{selectedWO.assignTime}</p>
                      </div>
                    </div>
                  )}
                  {selectedWO.checkInTime && (
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-success-500 mt-2 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">工程师已到场签到</p>
                        <p className="text-xs text-slate-500">{selectedWO.checkInTime}</p>
                      </div>
                    </div>
                  )}
                  {selectedWO.completeTime && (
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-success-500 mt-2 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">维修完成</p>
                        <p className="text-xs text-slate-500">{selectedWO.completeTime}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedWO.remark && (
                <div className="mt-6">
                  <h5 className="font-semibold text-slate-900 mb-3">维修备注</h5>
                  <p className="text-slate-600 bg-slate-50 rounded-xl p-4">{selectedWO.remark}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
                <button className="btn btn-secondary" onClick={() => setShowDetail(false)}>关闭</button>
                {selectedWO.status === 'pending' && (
                  <button className="btn btn-primary" onClick={() => { setShowAssignModal(true); }}>
                    <UserPlus size={16} className="mr-2" />
                    派工
                  </button>
                )}
                {selectedWO.status === 'assigned' && (
                  <button className="btn btn-primary" onClick={() => handleCheckIn(selectedWO.id)}>
                    <CheckSquare size={16} className="mr-2" />
                    到场签到
                  </button>
                )}
                {selectedWO.status === 'in_progress' && (
                  <button className="btn btn-success" onClick={() => handleComplete(selectedWO.id)}>
                    <CheckCircle size={16} className="mr-2" />
                    完工确认
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAssignModal && selectedWO && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md animate-slide-up">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">指派工程师</h3>
              <button
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full"
                onClick={() => setShowAssignModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-4">为工单「{selectedWO.title}」指派维修工程师</p>
              <div className="space-y-2">
                {engineerUsers.map((user) => (
                  <button
                    key={user.id}
                    className="w-full flex items-center p-3 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                    onClick={() => handleAssign(selectedWO.id, user.id)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-medium mr-3">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.role === 'supervisor' ? '工程主管' : '维修工程师'}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrderList;

