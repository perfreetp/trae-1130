
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

export const mockDevices: Device[] = [
  {
    id: 'D001',
    name: '1号楼单元门门禁',
    type: 'access_control',
    typeName: '门禁系统',
    location: '1号楼单元门',
    building: '1号楼',
    status: 'normal',
    installDate: '2022-03-15',
    lifespan: 8,
    manufacturer: '海康威视',
    model: 'DS-K1T671M',
    qrCode: 'D001-AC-20220315',
    lastMaintenanceDate: '2026-02-10',
    nextMaintenanceDate: '2026-05-10',
    description: '1号楼单元入口人脸识别门禁系统',
    position: { x: 15, y: 25 }
  },
  {
    id: 'D002',
    name: '小区东门道闸',
    type: 'gate',
    typeName: '道闸系统',
    location: '小区东门',
    building: '公共区域',
    status: 'normal',
    installDate: '2021-11-20',
    lifespan: 10,
    manufacturer: '捷顺科技',
    model: 'JSKT603',
    qrCode: 'D002-GT-20211120',
    lastMaintenanceDate: '2026-01-15',
    nextMaintenanceDate: '2026-04-15',
    description: '东门车辆出入口智能道闸',
    position: { x: 80, y: 45 }
  },
  {
    id: 'D003',
    name: '2号楼电梯外呼屏',
    type: 'elevator_screen',
    typeName: '电梯外呼屏',
    location: '2号楼1层大堂',
    building: '2号楼',
    status: 'warning',
    installDate: '2022-06-08',
    lifespan: 7,
    manufacturer: '三菱电机',
    model: 'MELD-600',
    qrCode: 'D003-ES-20220608',
    lastMaintenanceDate: '2026-03-01',
    nextMaintenanceDate: '2026-06-01',
    description: '2号楼电梯触控式外呼显示屏',
    position: { x: 35, y: 55 }
  },
  {
    id: 'D004',
    name: '地下室供水泵A',
    type: 'water_pump',
    typeName: '水泵设备',
    location: '地下室水泵房',
    building: '地下室',
    status: 'fault',
    installDate: '2020-08-12',
    lifespan: 15,
    manufacturer: '格兰富',
    model: 'CRN32-4',
    qrCode: 'D004-WP-20200812',
    lastMaintenanceDate: '2026-02-20',
    nextMaintenanceDate: '2026-05-20',
    description: '地下室主供水泵，供生活用水',
    position: { x: 50, y: 80 }
  },
  {
    id: 'D005',
    name: '园区主干道照明',
    type: 'lighting',
    typeName: '照明系统',
    location: '园区主干道',
    building: '公共区域',
    status: 'normal',
    installDate: '2021-05-10',
    lifespan: 5,
    manufacturer: '飞利浦',
    model: 'BRP130',
    qrCode: 'D005-LT-20210510',
    lastMaintenanceDate: '2026-03-10',
    nextMaintenanceDate: '2026-06-10',
    description: '园区主干道LED路灯，共32盏',
    position: { x: 60, y: 30 }
  },
  {
    id: 'D006',
    name: '监控中心主显示屏',
    type: 'monitor',
    typeName: '监控设备',
    location: '监控中心',
    building: '物业服务中心',
    status: 'maintenance',
    installDate: '2022-09-01',
    lifespan: 6,
    manufacturer: '海康威视',
    model: 'DS-D5055U',
    qrCode: 'D006-MN-20220901',
    lastMaintenanceDate: '2026-04-01',
    nextMaintenanceDate: '2026-07-01',
    description: '监控中心55寸4K监视器',
    position: { x: 45, y: 15 }
  },
  {
    id: 'D007',
    name: '3号楼单元门门禁',
    type: 'access_control',
    typeName: '门禁系统',
    location: '3号楼单元门',
    building: '3号楼',
    status: 'normal',
    installDate: '2022-04-20',
    lifespan: 8,
    manufacturer: '海康威视',
    model: 'DS-K1T671M',
    qrCode: 'D007-AC-20220420',
    lastMaintenanceDate: '2026-02-25',
    nextMaintenanceDate: '2026-05-25',
    description: '3号楼单元入口人脸识别门禁系统',
    position: { x: 25, y: 65 }
  },
  {
    id: 'D008',
    name: '小区西门道闸',
    type: 'gate',
    typeName: '道闸系统',
    location: '小区西门',
    building: '公共区域',
    status: 'normal',
    installDate: '2021-12-05',
    lifespan: 10,
    manufacturer: '捷顺科技',
    model: 'JSKT603',
    qrCode: 'D008-GT-20211205',
    lastMaintenanceDate: '2026-01-20',
    nextMaintenanceDate: '2026-04-20',
    description: '西门人行通道闸',
    position: { x: 10, y: 50 }
  }
];

export const mockWorkOrders: WorkOrder[] = [
  {
    id: 'WO20260601001',
    title: '地下室水泵异响维修',
    description: '地下室供水泵A运行时有异常噪音，需要检查维修',
    deviceId: 'D004',
    deviceName: '地下室供水泵A',
    reporter: '张业主',
    reporterPhone: '138****1234',
    assigneeId: 'U002',
    assigneeName: '李师傅',
    status: 'in_progress',
    priority: 'high',
    createTime: '2026-06-05 09:30:00',
    assignTime: '2026-06-05 09:45:00',
    checkInTime: '2026-06-05 10:15:00',
    completeTime: null,
    photos: [],
    remark: '已到场检查，需要更换轴承',
    cost: 0
  },
  {
    id: 'WO20260601002',
    title: '2号楼电梯外呼屏失灵',
    description: '2号楼1层电梯外呼屏触控不灵敏，部分按钮无反应',
    deviceId: 'D003',
    deviceName: '2号楼电梯外呼屏',
    reporter: '王女士',
    reporterPhone: '139****5678',
    assigneeId: null,
    assigneeName: null,
    status: 'pending',
    priority: 'medium',
    createTime: '2026-06-06 14:20:00',
    assignTime: null,
    checkInTime: null,
    completeTime: null,
    photos: [],
    remark: '',
    cost: 0
  },
  {
    id: 'WO20260601003',
    title: '东门道闸遥控器失效',
    description: '小区东门道闸遥控器无法正常开启，需要更换电池或维修',
    deviceId: 'D002',
    deviceName: '小区东门道闸',
    reporter: '保安李队',
    reporterPhone: '137****9012',
    assigneeId: 'U003',
    assigneeName: '王师傅',
    status: 'assigned',
    priority: 'medium',
    createTime: '2026-06-06 08:15:00',
    assignTime: '2026-06-06 08:30:00',
    checkInTime: null,
    completeTime: null,
    photos: [],
    remark: '',
    cost: 0
  },
  {
    id: 'WO20260601004',
    title: '1号楼门禁系统升级',
    description: '1号楼门禁系统固件升级，提升识别速度',
    deviceId: 'D001',
    deviceName: '1号楼单元门门禁',
    reporter: '系统',
    reporterPhone: '-',
    assigneeId: 'U002',
    assigneeName: '李师傅',
    status: 'completed',
    priority: 'low',
    createTime: '2026-06-04 10:00:00',
    assignTime: '2026-06-04 10:15:00',
    checkInTime: '2026-06-04 14:00:00',
    completeTime: '2026-06-04 16:30:00',
    photos: ['photo1.jpg', 'photo2.jpg'],
    remark: '升级完成，测试正常',
    cost: 500
  },
  {
    id: 'WO20260601005',
    title: '园区路灯故障排查',
    description: '园区主干道5号路灯不亮，需要检查更换',
    deviceId: 'D005',
    deviceName: '园区主干道照明',
    reporter: '巡逻保安',
    reporterPhone: '135****3456',
    assigneeId: null,
    assigneeName: null,
    status: 'pending',
    priority: 'low',
    createTime: '2026-06-06 19:45:00',
    assignTime: null,
    checkInTime: null,
    completeTime: null,
    photos: [],
    remark: '',
    cost: 0
  }
];

export const mockUsers: User[] = [
  {
    id: 'U001',
    name: '系统管理员',
    role: 'admin',
    phone: '138****0001',
    email: 'admin@property.com',
    avatar: 'A'
  },
  {
    id: 'U002',
    name: '李师傅',
    role: 'engineer',
    phone: '138****0002',
    email: 'lishifu@property.com',
    avatar: '李'
  },
  {
    id: 'U003',
    name: '王师傅',
    role: 'engineer',
    phone: '138****0003',
    email: 'wangshifu@property.com',
    avatar: '王'
  },
  {
    id: 'U004',
    name: '张主管',
    role: 'supervisor',
    phone: '138****0004',
    email: 'zhangzg@property.com',
    avatar: '张'
  },
  {
    id: 'U005',
    name: '刘经理',
    role: 'manager',
    phone: '138****0005',
    email: 'liujl@property.com',
    avatar: '刘'
  }
];

export const mockInspectionTasks: InspectionTask[] = [
  {
    id: 'IT20260607001',
    title: '周度设备巡检',
    route: '1号楼-2号楼-3号楼',
    devices: ['D001', 'D003', 'D007'],
    assigneeId: 'U002',
    assigneeName: '李师傅',
    scheduleDate: '2026-06-07',
    status: 'in_progress',
    items: [
      { id: 'II001', deviceId: 'D001', deviceName: '1号楼单元门门禁', checkItem: '门禁识别功能', result: 'normal', remark: '' },
      { id: 'II002', deviceId: 'D001', deviceName: '1号楼单元门门禁', checkItem: '门锁闭合情况', result: null, remark: '' },
      { id: 'II003', deviceId: 'D003', deviceName: '2号楼电梯外呼屏', checkItem: '屏幕显示效果', result: 'abnormal', remark: '右下角触控不灵敏' },
      { id: 'II004', deviceId: 'D003', deviceName: '2号楼电梯外呼屏', checkItem: '按键响应速度', result: null, remark: '' },
      { id: 'II005', deviceId: 'D007', deviceName: '3号楼单元门门禁', checkItem: '门禁识别功能', result: null, remark: '' }
    ]
  },
  {
    id: 'IT20260607002',
    title: '月度消防设备巡检',
    route: '地下室-公共区域',
    devices: ['D004', 'D005'],
    assigneeId: 'U003',
    assigneeName: '王师傅',
    scheduleDate: '2026-06-10',
    status: 'pending',
    items: [
      { id: 'II006', deviceId: 'D004', deviceName: '地下室供水泵A', checkItem: '水泵运行状态', result: null, remark: '' },
      { id: 'II007', deviceId: 'D004', deviceName: '地下室供水泵A', checkItem: '管道连接情况', result: null, remark: '' },
      { id: 'II008', deviceId: 'D005', deviceName: '园区主干道照明', checkItem: '灯具工作状态', result: null, remark: '' }
    ]
  }
];

export const mockMaintenancePlans: MaintenancePlan[] = [
  {
    id: 'MP001',
    deviceId: 'D001',
    deviceName: '1号楼单元门门禁',
    type: '常规保养',
    cycle: 3,
    cycleUnit: 'month',
    lastDate: '2026-02-10',
    nextDate: '2026-05-10',
    status: 'overdue'
  },
  {
    id: 'MP002',
    deviceId: 'D002',
    deviceName: '小区东门道闸',
    type: '常规保养',
    cycle: 3,
    cycleUnit: 'month',
    lastDate: '2026-01-15',
    nextDate: '2026-04-15',
    status: 'overdue'
  },
  {
    id: 'MP003',
    deviceId: 'D004',
    deviceName: '地下室供水泵A',
    type: '季度检修',
    cycle: 1,
    cycleUnit: 'quarter',
    lastDate: '2026-02-20',
    nextDate: '2026-05-20',
    status: 'upcoming'
  },
  {
    id: 'MP004',
    deviceId: 'D005',
    deviceName: '园区主干道照明',
    type: '月度巡检',
    cycle: 1,
    cycleUnit: 'month',
    lastDate: '2026-03-10',
    nextDate: '2026-04-10',
    status: 'upcoming'
  }
];

export const mockSpareParts: SparePart[] = [
  {
    id: 'SP001',
    name: '门禁摄像头模组',
    category: '门禁配件',
    supplierId: 'S001',
    supplierName: '海康威视授权商',
    stock: 5,
    minStock: 3,
    unit: '个',
    price: 280
  },
  {
    id: 'SP002',
    name: '道闸电机',
    category: '道闸配件',
    supplierId: 'S002',
    supplierName: '捷顺配件中心',
    stock: 2,
    minStock: 2,
    unit: '台',
    price: 1500
  },
  {
    id: 'SP003',
    name: '水泵机械密封件',
    category: '水泵配件',
    supplierId: 'S003',
    supplierName: '格兰富服务中心',
    stock: 1,
    minStock: 3,
    unit: '套',
    price: 450
  },
  {
    id: 'SP004',
    name: 'LED路灯电源',
    category: '照明配件',
    supplierId: 'S004',
    supplierName: '飞利浦照明',
    stock: 10,
    minStock: 5,
    unit: '个',
    price: 120
  },
  {
    id: 'SP005',
    name: '监控硬盘4TB',
    category: '监控配件',
    supplierId: 'S001',
    supplierName: '海康威视授权商',
    stock: 3,
    minStock: 2,
    unit: '块',
    price: 680
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: 'S001',
    name: '海康威视授权商',
    contact: '陈经理',
    phone: '139****1111',
    address: '市中区科技路88号',
    rating: 4.8,
    serviceCount: 56
  },
  {
    id: 'S002',
    name: '捷顺配件中心',
    contact: '王经理',
    phone: '139****2222',
    address: '高新区工业园A座',
    rating: 4.5,
    serviceCount: 32
  },
  {
    id: 'S003',
    name: '格兰富服务中心',
    contact: '李工',
    phone: '139****3333',
    address: '经济开发区兴隆街15号',
    rating: 4.9,
    serviceCount: 18
  },
  {
    id: 'S004',
    name: '飞利浦照明授权店',
    contact: '张总',
    phone: '139****4444',
    address: '建材市场B区23号',
    rating: 4.6,
    serviceCount: 45
  }
];

export const mockNotices: Notice[] = [
  {
    id: 'N001',
    title: '关于6月10日供水系统检修停水通知',
    type: 'shutdown',
    content: '为保障小区供水系统正常运行，物业服务中心定于2026年6月10日9:00-17:00对地下室供水设备进行例行检修维护。届时将暂停供水，请各业主提前做好储水准备。',
    publishTime: '2026-06-05 10:00:00',
    publisher: '物业服务中心',
    targetAudience: '全体业主',
    status: 'published'
  },
  {
    id: 'N002',
    title: '端午节期间物业服务安排',
    type: 'notification',
    content: '端午节期间（6月10日-6月12日），物业服务中心正常值班，24小时服务热线：400-xxx-xxxx。祝全体业主节日快乐！',
    publishTime: '2026-06-06 15:30:00',
    publisher: '物业服务中心',
    targetAudience: '全体业主',
    status: 'published'
  },
  {
    id: 'N003',
    title: '电梯安全使用温馨提示',
    type: 'notification',
    content: '近期接到业主反映电梯使用问题，物业服务中心温馨提示：请勿超载乘坐电梯，遇紧急情况请按紧急呼叫按钮。',
    publishTime: '2026-06-01 09:00:00',
    publisher: '物业服务中心',
    targetAudience: '全体业主',
    status: 'published'
  }
];

export const mockExpenseRecords: ExpenseRecord[] = [
  {
    id: 'ER001',
    workOrderId: 'WO20260601004',
    workOrderTitle: '1号楼门禁系统升级',
    amount: 500,
    category: '设备升级',
    description: '门禁系统固件升级服务费',
    date: '2026-06-05',
    status: 'approved',
    allocation: [
      { building: '1号楼', amount: 250 },
      { building: '公共维修基金', amount: 250 }
    ]
  },
  {
    id: 'ER002',
    workOrderId: 'WO20260601001',
    workOrderTitle: '地下室水泵异响维修',
    amount: 850,
    category: '维修费用',
    description: '更换水泵轴承及密封件',
    date: '2026-06-06',
    status: 'pending',
    allocation: [
      { building: '公共维修基金', amount: 850 }
    ]
  }
];

export const mockSatisfactionSurveys: SatisfactionSurvey[] = [
  {
    id: 'SS001',
    workOrderId: 'WO20260601004',
    workOrderTitle: '1号楼门禁系统升级',
    score: 5,
    comment: '师傅服务很好，升级后识别速度快多了',
    submitTime: '2026-06-05 18:20:00',
    reporter: '1号楼业主'
  },
  {
    id: 'SS002',
    workOrderId: 'WO20260528001',
    workOrderTitle: '路灯维修',
    score: 4,
    comment: '维修及时，就是来的时候打电话我没接到',
    submitTime: '2026-05-29 10:15:00',
    reporter: '3号楼业主'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalDevices: 8,
  normalDevices: 5,
  faultDevices: 1,
  pendingWorkOrders: 2,
  todayWorkOrders: 5,
  completedToday: 1,
  pendingInspections: 2,
  monthlyCost: 1350
};

export const monthlyWorkOrderData = [
  { month: '1月', count: 24, completed: 22 },
  { month: '2月', count: 18, completed: 17 },
  { month: '3月', count: 30, completed: 28 },
  { month: '4月', count: 26, completed: 25 },
  { month: '5月', count: 32, completed: 30 },
  { month: '6月', count: 15, completed: 12 }
];

export const deviceTypeDistribution = [
  { name: '门禁系统', value: 2, color: '#3b82f6' },
  { name: '道闸系统', value: 2, color: '#10b981' },
  { name: '电梯外呼屏', value: 1, color: '#f59e0b' },
  { name: '水泵设备', value: 1, color: '#ef4444' },
  { name: '照明系统', value: 1, color: '#8b5cf6' },
  { name: '监控设备', value: 1, color: '#ec4899' }
];

export const faultTrendData = [
  { date: '6/1', access_control: 0, gate: 1, elevator_screen: 0, water_pump: 0, lighting: 1, monitor: 0 },
  { date: '6/2', access_control: 1, gate: 0, elevator_screen: 0, water_pump: 0, lighting: 0, monitor: 0 },
  { date: '6/3', access_control: 0, gate: 0, elevator_screen: 1, water_pump: 0, lighting: 0, monitor: 0 },
  { date: '6/4', access_control: 0, gate: 0, elevator_screen: 0, water_pump: 0, lighting: 0, monitor: 0 },
  { date: '6/5', access_control: 0, gate: 0, elevator_screen: 0, water_pump: 1, lighting: 0, monitor: 0 },
  { date: '6/6', access_control: 0, gate: 1, elevator_screen: 1, water_pump: 0, lighting: 1, monitor: 1 },
  { date: '6/7', access_control: 0, gate: 0, elevator_screen: 0, water_pump: 0, lighting: 0, monitor: 0 }
];

