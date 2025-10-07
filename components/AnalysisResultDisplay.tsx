import React from 'react';
import { AnalysisResult, AnalysisStatus } from '../types';

interface AnalysisResultDisplayProps {
  result: AnalysisResult;
  analyzedContent?: string;
}

const statusConfig = {
  [AnalysisStatus.Safe]: {
    label: 'Safe',
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  },
  [AnalysisStatus.Suspicious]: {
    label: 'Suspicious',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
  },
  [AnalysisStatus.Phishing]: {
    label: 'Phishing Detected',
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    borderColor: 'border-danger/30',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
  },
   [AnalysisStatus.Malicious]: {
    label: 'Malicious',
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    borderColor: 'border-danger/30',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3.14 13.06 4.24-4.24 4.24 4.24-4.24 4.24-4.24-4.24zM16.48 4.2l-4.24 4.24 4.24 4.24 4.24-4.24-4.24-4.24z"></path></svg>
  },
};

const getHighlightedText = (text: string, phrases: string[]) => {
    if (!phrases || phrases.length === 0) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${phrases.join('|')})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                phrases.some(phrase => part.toLowerCase() === phrase.toLowerCase()) ? (
                    <mark key={i} className="bg-warning/30 text-white rounded px-1">{part}</mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};


const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({ result, analyzedContent }) => {
  const config = statusConfig[result.status];
  const confidencePercent = (result.confidence * 100).toFixed(0);

  return (
    <div className={`mt-6 p-6 border rounded-lg ${config.bgColor} ${config.borderColor}`}>
      <div className="flex items-center">
        <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full ${config.color} ${config.bgColor}`}>
          {config.icon}
        </div>
        <div className="ml-4">
          <h3 className={`text-2xl font-bold ${config.color}`}>{config.label}</h3>
          <p className="text-text-secondary">Confidence: {confidencePercent}%</p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold text-text-primary">AI Explanation:</h4>
        <p className="text-text-secondary mt-1">{result.explanation}</p>
      </div>

      {analyzedContent && result.suspiciousPhrases && result.suspiciousPhrases.length > 0 && (
        <div className="mt-4">
            <h4 className="font-semibold text-text-primary">Highlighted Content:</h4>
            <div className="mt-2 p-4 bg-primary rounded-md border border-border text-text-secondary whitespace-pre-wrap font-mono text-sm">
                {getHighlightedText(analyzedContent, result.suspiciousPhrases)}
            </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResultDisplay;
