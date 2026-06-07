
import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  AlertTriangle,
  Megaphone,
  Star,
  X,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import type { Notice } from '@/types';

const Notices: React.FC = () => {
  const { notices, satisfactionSurveys } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'shutdown' | 'notification' | 'satisfaction'>('shutdown');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'satisfaction' ? true : notice.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'shutdown': return <AlertTriangle size={20} />;
      case 'notification': return <Megaphone size={20} />;
      case 'satisfaction': return <Star size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'shutdown': return 'bg-danger-100 text-danger-700';
      case 'notification': return 'bg-primary-100 text-primary-700';
      case 'satisfaction': return 'bg-warning-100 text-warning-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success-100 text-success-700';
      case 'draft': return 'bg-slate-100 text-slate-700';
      case 'expired': return 'bg-slate-100 text-slate-500';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return '已发布';
      case 'draft': return '草稿';
      case 'expired': return '已过期';
      default: return '未知';
    }
  };

  const renderStars = (score: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={16}
            className={s <= score ? 'text-warning-500 fill-warning-500' : 'text-slate-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">公告通知</h1>
          <p className="text-slate-500 mt-1">管理停机公告、业主通知和满意度回访</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} className="mr-2" />
          发布公告
        </button>
      </div>

      <div className="card p-1 inline-flex">
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'shutdown' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:text-slate-900'
          )}
          onClick={() => setActiveTab('shutdown')}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} />
            停机公告
          </div>
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'notification' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:text-slate-900'
          )}
          onClick={() => setActiveTab('notification')}
        >
          <div className="flex items-center gap-2">
            <Megaphone size={16} />
            业主通知
          </div>
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === 'satisfaction' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:text-slate-900'
          )}
          onClick={() => setActiveTab('satisfaction')}
        >
          <div className="flex items-center gap-2">
            <Star size={16} />
            满意度回访
          </div>
        </button>
      </div>

      {activeTab !== 'satisfaction' ? (
        <>
          <div className="card p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="搜索公告标题、内容..."
                  className="input pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-slate-500" />
                <select className="input py-2 text-sm w-36">
                  <option value="all">全部状态</option>
                  <option value="published">已发布</option>
                  <option value="draft">草稿</option>
                  <option value="expired">已过期</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="card card-hover p-5 cursor-pointer"
                onClick={() => { setSelectedNotice(notice); setShowDetail(true); }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', getTypeColor(notice.type))}>
                      {getTypeIcon(notice.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{notice.title}</h3>
                        <span className={cn('badge', getStatusColor(notice.status))}>
                          {getStatusLabel(notice.status)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{notice.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                        <span className="flex items-center">
                          <User size={14} className="mr-1.5 text-slate-400" />
                          {notice.publisher}
                        </span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1.5 text-slate-400" />
                          {notice.publishTime}
                        </span>
                        <span className="flex items-center">
                          <Megaphone size={14} className="mr-1.5 text-slate-400" />
                          {notice.targetAudience}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </div>
            ))}

            {filteredNotices.length === 0 && (
              <div className="card p-12 text-center">
                <Bell className="mx-auto h-12 w-12 text-slate-300" />
                <p className="mt-4 text-slate-500">暂无公告</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">满意度回访记录</h3>
            <p className="text-sm text-slate-500 mt-1">查看业主对维修服务的评价和反馈</p>
          </div>
          <div className="divide-y divide-slate-200">
            {satisfactionSurveys.map((survey) => (
              <div key={survey.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-slate-900">{survey.workOrderTitle}</h4>
                      {renderStars(survey.score)}
                    </div>
                    <p className="text-sm text-slate-600 mt-2 bg-slate-50 rounded-lg p-3">
                      <MessageSquare size={14} className="inline mr-1.5 text-slate-400 -mt-0.5" />
                      {survey.comment}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      <span>报修人：{survey.reporter}</span>
                      <span>提交时间：{survey.submitTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDetail && selectedNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', getTypeColor(selectedNotice.type))}>
                  {getTypeIcon(selectedNotice.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{selectedNotice.title}</h3>
                  <p className="text-sm text-slate-500">{selectedNotice.publishTime}</p>
                </div>
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
                <span className={cn('badge', getStatusColor(selectedNotice.status))}>
                  {getStatusLabel(selectedNotice.status)}
                </span>
                <span className="text-sm text-slate-600">发布人：{selectedNotice.publisher}</span>
                <span className="text-sm text-slate-600">受众：{selectedNotice.targetAudience}</span>
              </div>
              <div className="prose max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedNotice.content}</p>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
                <button className="btn btn-secondary" onClick={() => setShowDetail(false)}>关闭</button>
                <button className="btn btn-primary">编辑公告</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices;

