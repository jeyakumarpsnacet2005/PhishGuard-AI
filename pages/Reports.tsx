import React from 'react';

const Reports: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary">Reports</h1>
      <p className="text-text-secondary mt-1">View and export summaries of detected threats.</p>

      <div className="mt-6 bg-secondary p-8 rounded-lg border border-border text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-xl font-medium text-text-primary">Reporting Feature Coming Soon</h3>
        <p className="mt-1 text-text-secondary">
          Detailed analytics and PDF/CSV exports will be available here in a future update.
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-blue-500 cursor-not-allowed opacity-50"
          >
            Export PDF (Disabled)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
