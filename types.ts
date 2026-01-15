
export enum Cycle {
  PREP = 'إعدادي',
  SECONDARY = 'ثانوي تأهيلي'
}

export type Level = string;
export type Track = string;
export type Subject = string;

export interface EducationState {
  cycle: Cycle;
  level: Level;
  track: Track;
  subject: Subject;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  file?: {
    url: string;
    mimeType: string;
  };
  timestamp: Date;
}

export interface FileData {
  data: string;
  mimeType: string;
}
