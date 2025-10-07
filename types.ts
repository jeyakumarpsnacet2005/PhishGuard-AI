export enum AnalysisStatus {
  Safe = "safe",
  Suspicious = "suspicious",
  Phishing = "phishing",
  Malicious = "malicious",
}

export interface AnalysisResult {
  status: AnalysisStatus;
  confidence: number;
  explanation: string;
  suspiciousPhrases?: string[];
}

export interface ActivityLog {
  id: number;
  type: 'Email' | 'URL' | 'Message';
  content: string;
  status: AnalysisStatus;
  timestamp: string;
}
