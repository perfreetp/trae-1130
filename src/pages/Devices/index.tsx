
import React, { useState } from 'react';
import {
  Server,
  Search,
  Filter,
  QrCode,
  MapPin,
  Clock,
  Calendar,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Settings,
  X,
  Eye
} from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import type { Device, DeviceStatus } from '@/types';
import { QRCodeSVG } from 'qrcode.react';

const deviceTypeOptions = [
  { value: 'all', label: '全部类型' },
  { value: 'access_control', label: '门禁系统' },
  { value: 'gate', label: '道闸系统' },
  { value: 'elevator_screen', label: '电梯外呼屏' },
  { value: 'water_pump', label: '水泵设备' },
  { value: 'lighting', label: '照明系统' },
  { value: 'monitor', label: '监控设备' },
];

const statusOptions = [
  { value: 'all', label: '全部状态' },
  { value: 'normal', label: '正常运行' },
  { value: 'warning', label: '预警' },
  { value: 'fault', label: '故障' },
  { value: 'maintenance', label: '维护中' },
];

const DeviceList: React.FC = () => {
  const { devices, setSelectedDevice } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDeviceLocal, setSelectedDeviceLocal] = useState<Device | null>(null);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || device.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: DeviceStatus) => {
    switch (status) {
      case 'normal': return 'bg-success-100 text-success-700';
      case 'warning': return 'bg-warning-100 text-warning-700';
      case 'fault': return 'bg-danger-100 text-danger-700';
      case 'maintenance': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: DeviceStatus) => {
    switch (status) {
      case 'normal': return '正常运行';
      case 'warning': return '预警';
      case 'fault': return '故障';
      case 'maintenance': return '维护中';
      default: return '未知';
    }
  };

  const getStatusDotColor = (status: DeviceStatus) => {
    switch (status) {
      case 'normal': return 'bg-success-500';
      case 'warning': return 'bg-warning-500';
      case 'fault': return 'bg-danger-500';
      case 'maintenance': return 'bg-secondary-500';
      default: return 'bg-slate-500';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'access_control': return <Server size={20} />;
      case 'gate': return <Settings size={20} />;
      case 'elevator_screen': return <Eye size={20} />;
      case 'water_pump': return <Wrench size={20} />;
      case 'lighting': return <Server size={20} />;
      case 'monitor': return <Eye size={20} />;
      default: return <Server size={20} />;
    }
  };

  const openDetail = (device: Device) => {
    setSelectedDeviceLocal(device);
    setSelectedDevice(device);
    setShowDetail(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">设备档案</h1>
          <p className="text-slate-500 mt-1">管理小区内所有公共设施设备</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              )}
              onClick={() => setViewMode('list')}
            >
              列表视图
            </button>
            <button
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              )}
              onClick={() => setViewMode('map')}
            >
              分布图
            </button>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="搜索设备名称、位置..."
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {deviceTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                className="input py-2 text-sm w-36"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="table-header">设备信息</th>
                  <th className="table-header">类型</th>
                  <th className="table-header">位置</th>
                  <th className="table-header">状态</th>
                  <th className="table-header">安装日期</th>
                  <th className="table-header">下次保养</th>
                  <th className="table-header">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-slate-50 transition-colors">
                    <td className="table-cell">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{device.name}</p>
                          <p className="text-xs text-slate-500">{device.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-slate-600">{device.typeName}</td>
                    <td className="table-cell">
                      <div className="flex items-center text-slate-600">
                        <MapPin size={14} className="mr-1.5 text-slate-400" />
                        {device.location}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={cn('badge', getStatusColor(device.status))}>
                        <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', getStatusDotColor(device.status))}></span>
                        {getStatusLabel(device.status)}
                      </span>
                    </td>
                    <td className="table-cell text-slate-600">{device.installDate}</td>
                    <td className="table-cell">
                      <div className="flex items-center text-slate-600">
                        <Calendar size={14} className="mr-1.5 text-slate-400" />
                        {device.nextMaintenanceDate}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                          onClick={() => openDetail(device)}
                          title="查看详情"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                          title="查看二维码"
                        >
                          <QrCode size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredDevices.length === 0 && (
            <div className="p-12 text-center">
              <Server className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-4 text-slate-500">暂无匹配的设备</p>
            </div>
          )}
        </div>
      ) : (
        <div className="card p-6">
          <h3 className="font-semibold text-slate-900 mb-4">小区设备分布图</h3>
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl h-96 overflow-hidden">
            <div className="absolute inset-0 p-8">
              <div className="relative w-full h-full">
                <div className="absolute top-4 left-4 w-24 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center border-2 border-primary-200">
                  <span className="text-xs font-medium text-slate-600">1号楼</span>
                </div>
                <div className="absolute top-4 left-36 w-24 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center border-2 border-primary-200">
                  <span className="text-xs font-medium text-slate-600">2号楼</span>
                </div>
                <div className="absolute top-28 left-4 w-24 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center border-2 border-primary-200">
                  <span className="text-xs font-medium text-slate-600">3号楼</span>
                </div>
                <div className="absolute top-28 left-36 w-32 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center border-2 border-slate-300">
                  <span className="text-xs font-medium text-slate-600">物业服务中心</span>
                </div>
                <div className="absolute bottom-4 left-4 right-20 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center border-2 border-slate-300">
                  <span className="text-xs font-medium text-slate-600">地下室 / 设备房</span>
                </div>
                <div className="absolute top-16 right-4 w-16 h-20 bg-green-100 rounded-lg flex items-center justify-center border-2 border-green-300">
                  <span className="text-xs font-medium text-green-700">东门</span>
                </div>
                <div className="absolute top-28 right-4 w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center border-2 border-green-300">
                  <span className="text-xs font-medium text-green-700">西门</span>
                </div>

                {filteredDevices.map((device) => (
                  <button
                    key={device.id}
                    className={cn(
                      'absolute w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer',
                      device.status === 'normal' ? 'bg-success-500' :
                      device.status === 'warning' ? 'bg-warning-500' :
                      device.status === 'fault' ? 'bg-danger-500 animate-pulse' : 'bg-secondary-500'
                    )}
                    style={{ left: `${device.position.x}%`, top: `${device.position.y}%` }}
                    onClick={() => openDetail(device)}
                    title={device.name}
                  >
                    <span className="text-xs font-bold">{device.id.slice(-3)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <p className="text-xs font-medium text-slate-700 mb-2">图例</p>
              <div className="space-y-1.5">
                <div className="flex items-center text-xs">
                  <span className="w-3 h-3 rounded-full bg-success-500 mr-2"></span>
                  <span className="text-slate-600">正常运行</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-3 h-3 rounded-full bg-warning-500 mr-2"></span>
                  <span className="text-slate-600">预警</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-3 h-3 rounded-full bg-danger-500 mr-2"></span>
                  <span className="text-slate-600">故障</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-3 h-3 rounded-full bg-secondary-500 mr-2"></span>
                  <span className="text-slate-600">维护中</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetail && selectedDeviceLocal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">设备详情</h3>
              <button
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                onClick={() => setShowDetail(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white">
                    {getDeviceIcon(selectedDeviceLocal.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-xl font-bold text-slate-900">{selectedDeviceLocal.name}</h4>
                    <span className={cn('badge', getStatusColor(selectedDeviceLocal.status))}>
                      {getStatusLabel(selectedDeviceLocal.status)}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">设备编号：{selectedDeviceLocal.id}</p>
                  <p className="text-slate-500">{selectedDeviceLocal.typeName} · {selectedDeviceLocal.location}</p>
                </div>
                <div className="shrink-0 bg-slate-50 p-4 rounded-xl">
                  <QRCodeSVG value={selectedDeviceLocal.qrCode} size={100} level="M" />
                  <p className="text-xs text-slate-500 text-center mt-2">资产二维码</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">生产厂家</p>
                  <p className="font-medium text-slate-900 mt-1">{selectedDeviceLocal.manufacturer}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">设备型号</p>
                  <p className="font-medium text-slate-900 mt-1">{selectedDeviceLocal.model}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">安装日期</p>
                  <p className="font-medium text-slate-900 mt-1">{selectedDeviceLocal.installDate}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500">设计寿命</p>
                  <p className="font-medium text-slate-900 mt-1">{selectedDeviceLocal.lifespan} 年</p>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-semibold text-slate-900 mb-3">设备描述</h5>
                <p className="text-slate-600 bg-slate-50 rounded-xl p-4">{selectedDeviceLocal.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">上次保养</p>
                    <Clock size={16} className="text-slate-400" />
                  </div>
                  <p className="text-lg font-semibold text-slate-900 mt-2">{selectedDeviceLocal.lastMaintenanceDate}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">下次保养</p>
                    <Calendar size={16} className="text-slate-400" />
                  </div>
                  <p className="text-lg font-semibold text-slate-900 mt-2">{selectedDeviceLocal.nextMaintenanceDate}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
                <button className="btn btn-secondary" onClick={() => setShowDetail(false)}>
                  关闭
                </button>
                <button className="btn btn-primary">
                  <Wrench size={16} className="mr-2" />
                  创建工单
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceList;

