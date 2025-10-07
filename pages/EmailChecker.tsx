import React, { useState } from 'react';
import { analyzeContent } from '../services/geminiService';
import { AnalysisResult } from '../types';
import AnalysisResultDisplay from '../components/AnalysisResultDisplay';

const EmailChecker: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!emailContent.trim()) {
      setError('Email content cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeContent(emailContent, 'email');
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary">Email Checker</h1>
      <p className="text-text-secondary mt-1">Paste the full email content, including headers, for a comprehensive analysis.</p>

      <div className="mt-6 bg-secondary p-6 rounded-lg border border-border">
        <label htmlFor="email-content" className="block text-sm font-medium text-text-secondary">Email Content</label>
        <textarea
          id="email-content"
          rows={10}
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          className="mt-1 block w-full bg-primary border-border rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm p-3 text-text-primary"
          placeholder="From: support@yourbank.co\nSubject: Urgent: Action Required on Your Account..."
        />
        <div className="mt-4">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
            {isLoading ? 'Analyzing...' : 'Analyze Email'}
          </button>
        </div>
      </div>
      {error && <div className="mt-4 text-danger bg-danger/10 p-3 rounded-md">{error}</div>}
      {result && <AnalysisResultDisplay result={result} analyzedContent={emailContent} />}
    </div>
  );
};

export default EmailChecker;
