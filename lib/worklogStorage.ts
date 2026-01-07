import { WorkLog } from '@/types/worklog';

const STORAGE_KEY = 'worklogs';

export function getWorkLogs(): WorkLog[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getWorkLogById(id: string): WorkLog | undefined {
  return getWorkLogs().find((log) => log.id === id);
}

export function saveWorkLog(log: WorkLog) {
  const logs = getWorkLogs();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([log, ...logs]));
}

/** ✅ 수정 */
export function updateWorkLog(updated: WorkLog) {
  const logs = getWorkLogs().map((log) =>
    log.id === updated.id ? updated : log,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

/** ✅ 삭제 */
export function deleteWorkLog(id: string) {
  const logs = getWorkLogs().filter((log) => log.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}
