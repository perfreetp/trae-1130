
export type DeviceType = 'access_control' | 'gate' | 'elevator_screen' | 'water_pump' | 'lighting' | 'monitor';

export type DeviceStatus = 'normal' | 'warning' | 'fault' | 'maintenance';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  typeName: string;
  location: string;
  building: string;
  status: DeviceStatus;
  installDate: string;
  lifespan: number;
  manufacturer: string;
  model: string;
  qrCode: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  description: string;
  position: { x: number; y: number };
}

export type WorkOrderStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'closed';
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  deviceId: string;
  deviceName: string;
  reporter: string;
  reporterPhone: string;
  assigneeId: string | null;
  assigneeName: string | null;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  createTime: string;
  assignTime: string | null;
  checkInTime: string | null;
  completeTime: string | null;
  photos: string[];
  remark: string;
  cost: number;
}

export type UserRole = 'admin' | 'supervisor' | 'engineer' | 'manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  avatar: string;
}

export interface InspectionTask {
  id: string;
  title: string;
  route: string;
  devices: string[];
  assigneeId: string;
  assigneeName: string;
  scheduleDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  items: InspectionItem[];
}

export interface InspectionItem {
  id: string;
  deviceId: string;
  deviceName: string;
  checkItem: string;
  result: 'normal' | 'abnormal' | null;
  remark: string;
}

export interface MaintenancePlan {
  id: string;
  deviceId: string;
  deviceName: string;
  type: string;
  cycle: number;
  cycleUnit: 'day' | 'week' | 'month' | 'year';
  lastDate: string;
  nextDate: string;
  status: 'upcoming' | 'overdue' | 'completed';
}

export interface SparePart {
  id: string;
  name: string;
  category: string;
  supplierId: string;
  supplierName: string;
  stock: number;
  minStock: number;
  unit: string;
  price: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  address: string;
  rating: number;
  serviceCount: number;
}

export interface Notice {
  id: string;
  title: string;
  type: 'shutdown' | 'notification' | 'satisfaction';
  content: string;
  publishTime: string;
  publisher: string;
  targetAudience: string;
  status: 'draft' | 'published' | 'expired';
}

export interface ExpenseRecord {
  id: string;
  workOrderId: string;
  workOrderTitle: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  allocation: {
    building: string;
    amount: number;
  }[];
}

export interface SatisfactionSurvey {
  id: string;
  workOrderId: string;
  workOrderTitle: string;
  score: number;
  comment: string;
  submitTime: string;
  reporter: string;
}

export interface DashboardStats {
  totalDevices: number;
  normalDevices: number;
  faultDevices: number;
  pendingWorkOrders: number;
  todayWorkOrders: number;
  completedToday: number;
  pendingInspections: number;
  monthlyCost: number;
}

