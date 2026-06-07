
import { create } from 'zustand';
import type {
  Device,
  WorkOrder,
  User,
  InspectionTask,
  MaintenancePlan,
  SparePart,
  Supplier,
  Notice,
  ExpenseRecord,
  SatisfactionSurvey,
  DashboardStats
} from '@/types';
import {
  mockDevices,
  mockWorkOrders,
  mockUsers,
  mockInspectionTasks,
  mockMaintenancePlans,
  mockSpareParts,
  mockSuppliers,
  mockNotices,
  mockExpenseRecords,
  mockSatisfactionSurveys,
  mockDashboardStats
} from '@/mock/data';

interface AppState {
  devices: Device[];
  workOrders: WorkOrder[];
  users: User[];
  inspectionTasks: InspectionTask[];
  maintenancePlans: MaintenancePlan[];
  spareParts: SparePart[];
  suppliers: Supplier[];
  notices: Notice[];
  expenseRecords: ExpenseRecord[];
  satisfactionSurveys: SatisfactionSurvey[];
  dashboardStats: DashboardStats;
  selectedDevice: Device | null;
  selectedWorkOrder: WorkOrder | null;
  sidebarCollapsed: boolean;
  currentPage: string;
  
  setSelectedDevice: (device: Device | null) => void;
  setSelectedWorkOrder: (workOrder: WorkOrder | null) => void;
  toggleSidebar: () => void;
  setCurrentPage: (page: string) => void;
  updateWorkOrderStatus: (id: string, status: WorkOrder['status']) => void;
  assignWorkOrder: (workOrderId: string, userId: string) => void;
  addWorkOrder: (workOrder: Omit<WorkOrder, 'id' | 'createTime'>) => void;
  checkInWorkOrder: (id: string) => void;
  completeWorkOrder: (id: string, remark?: string) => void;
  addWorkOrderPhoto: (id: string, photoUrl: string) => void;
  updateInspectionItem: (taskId: string, itemId: string, result: 'normal' | 'abnormal', remark: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  devices: mockDevices,
  workOrders: mockWorkOrders,
  users: mockUsers,
  inspectionTasks: mockInspectionTasks,
  maintenancePlans: mockMaintenancePlans,
  spareParts: mockSpareParts,
  suppliers: mockSuppliers,
  notices: mockNotices,
  expenseRecords: mockExpenseRecords,
  satisfactionSurveys: mockSatisfactionSurveys,
  dashboardStats: mockDashboardStats,
  selectedDevice: null,
  selectedWorkOrder: null,
  sidebarCollapsed: false,
  currentPage: 'dashboard',

  setSelectedDevice: (device) => set({ selectedDevice: device }),
  setSelectedWorkOrder: (workOrder) => set({ selectedWorkOrder: workOrder }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setCurrentPage: (page) => set({ currentPage: page }),

  updateWorkOrderStatus: (id, status) =>
    set((state) => ({
      workOrders: state.workOrders.map((wo) =>
        wo.id === id
          ? {
              ...wo,
              status,
              completeTime: status === 'completed' ? new Date().toLocaleString('zh-CN') : wo.completeTime
            }
          : wo
      )
    })),

  checkInWorkOrder: (id) =>
    set((state) => ({
      workOrders: state.workOrders.map((wo) =>
        wo.id === id
          ? {
              ...wo,
              status: 'in_progress',
              checkInTime: new Date().toLocaleString('zh-CN')
            }
          : wo
      )
    })),

  completeWorkOrder: (id, remark) =>
    set((state) => ({
      workOrders: state.workOrders.map((wo) =>
        wo.id === id
          ? {
              ...wo,
              status: 'completed',
              completeTime: new Date().toLocaleString('zh-CN'),
              remark: remark || wo.remark
            }
          : wo
      )
    })),

  addWorkOrderPhoto: (id, photoUrl) =>
    set((state) => ({
      workOrders: state.workOrders.map((wo) =>
        wo.id === id
          ? {
              ...wo,
              photos: [...wo.photos, photoUrl]
            }
          : wo
      )
    })),

  assignWorkOrder: (workOrderId, userId) =>
    set((state) => {
      const user = state.users.find((u) => u.id === userId);
      return {
        workOrders: state.workOrders.map((wo) =>
          wo.id === workOrderId
            ? {
                ...wo,
                assigneeId: userId,
                assigneeName: user?.name || null,
                status: 'assigned',
                assignTime: new Date().toISOString()
              }
            : wo
        )
      };
    }),

  addWorkOrder: (workOrder) =>
    set((state) => {
      const newWorkOrder: WorkOrder = {
        ...workOrder,
        id: `WO${Date.now()}`,
        createTime: new Date().toISOString()
      };
      return {
        workOrders: [newWorkOrder, ...state.workOrders],
        dashboardStats: {
          ...state.dashboardStats,
          pendingWorkOrders: state.dashboardStats.pendingWorkOrders + 1,
          todayWorkOrders: state.dashboardStats.todayWorkOrders + 1
        }
      };
    }),

  updateInspectionItem: (taskId, itemId, result, remark) =>
    set((state) => ({
      inspectionTasks: state.inspectionTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              items: task.items.map((item) =>
                item.id === itemId ? { ...item, result, remark } : item
              )
            }
          : task
      )
    }))
}));

