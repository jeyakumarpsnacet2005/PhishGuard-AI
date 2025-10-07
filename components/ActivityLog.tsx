import React from 'react';
import { ActivityLog as ActivityLogType, AnalysisStatus } from '../types';

const statusConfig = {
    [AnalysisStatus.Safe]: { className: "bg-success/20 text-success", label: "Safe" },
    [AnalysisStatus.Suspicious]: { className: "bg-warning/20 text-warning", label: "Suspicious" },
    [AnalysisStatus.Phishing]: { className: "bg-danger/20 text-danger", label: "Phishing" },
    [AnalysisStatus.Malicious]: { className: "bg-danger/20 text-danger", label: "Malicious" },
};

const StatusBadge: React.FC<{ status: AnalysisStatus }> = ({ status }) => {
    const config = statusConfig[status] || { className: "bg-gray-500/20 text-gray-400", label: "Unknown" };
    
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
            {config.label}
        </span>
    );
};

const mockActivity: ActivityLogType[] = [
    { id: 1, type: 'URL', content: 'http://secure-login-update.com', status: AnalysisStatus.Phishing, timestamp: '2 mins ago' },
    { id: 2, type: 'Email', content: 'Subject: Your account is locked', status: AnalysisStatus.Phishing, timestamp: '15 mins ago' },
    { id: 3, type: 'URL', content: 'https://google.com', status: AnalysisStatus.Safe, timestamp: '1 hour ago' },
    { id: 4, type: 'Message', content: 'Your package is waiting...', status: AnalysisStatus.Suspicious, timestamp: '3 hours ago' },
    { id: 5, type: 'Email', content: 'Re: Project Update', status: AnalysisStatus.Safe, timestamp: '5 hours ago' },
    { id: 6, type: 'URL', content: 'http://totally-legit-bank.net/login', status: AnalysisStatus.Phishing, timestamp: '8 hours ago' },
    { id: 7, type: 'Message', content: 'Click here to claim your prize!', status: AnalysisStatus.Suspicious, timestamp: '1 day ago' },
];

const ActivityLogItem: React.FC<{ item: ActivityLogType }> = ({ item }) => {
    return (
        <div className="flex items-center justify-between p-3 bg-primary rounded-md hover:bg-border/50 transition-colors duration-200">
            <div>
                <p className="font-semibold text-text-primary">
                    {item.type}: <span className="font-normal text-text-secondary truncate">{item.content.length > 50 ? item.content.substring(0, 50) + '...' : item.content}</span>
                </p>
                <p className="text-sm text-text-secondary">{item.timestamp}</p>
            </div>
            <StatusBadge status={item.status} />
        </div>
    );
};


const ActivityLog: React.FC = () => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Recent Activity</h3>
            <div className="space-y-3">
                {mockActivity.map(item => <ActivityLogItem key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default ActivityLog;