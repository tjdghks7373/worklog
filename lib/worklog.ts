import { WorkLog } from '@/types/worklog';

const STORAGE_KEY = 'worklogs';

export function getWorkLogs(): WorkLog[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveWorkLog(log: WorkLog) {
  const logs = getWorkLogs();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([log, ...logs]));
}
