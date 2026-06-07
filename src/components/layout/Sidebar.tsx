
import React from 'react';
import {
  LayoutDashboard,
  Server,
  ClipboardList,
  ClipboardCheck,
  Bell,
  Wallet,
  BarChart3,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
  { id: 'devices', label: '设备档案', icon: Server },
  { id: 'workorders', label: '工单处理', icon: ClipboardList },
  { id: 'inspection', label: '巡检保养', icon: ClipboardCheck },
  { id: 'notices', label: '公告通知', icon: Bell },
  { id: 'expenses', label: '费用备件', icon: Wallet },
  { id: 'analytics', label: '数据分析', icon: BarChart3 },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { currentPage, setCurrentPage } = useAppStore();

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-40 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Server size={18} />
            </div>
            <span className="font-semibold text-lg">设备运维</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mx-auto">
            <Server size={18} />
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                'sidebar-link w-full',
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-2 border-t border-slate-800">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

