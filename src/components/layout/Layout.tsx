
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAppStore } from '@/store';
import Dashboard from '@/pages/Dashboard';
import DeviceList from '@/pages/Devices';
import WorkOrderList from '@/pages/WorkOrders';
import Inspection from '@/pages/Inspection';
import NoticeList from '@/pages/Notices';
import ExpenseParts from '@/pages/ExpenseParts';
import Analytics from '@/pages/Analytics';

const Layout: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, currentPage } = useAppStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'devices':
        return <DeviceList />;
      case 'workorders':
        return <WorkOrderList />;
      case 'inspection':
        return <Inspection />;
      case 'notices':
        return <NoticeList />;
      case 'expenses':
        return <ExpenseParts />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? '4rem' : '16rem' }}
      >
        <Header />
        <main className="p-6 animate-fade-in">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Layout;

