import type { DTCGTokenFile } from "@clafoutis/studio-core";

const DB_NAME = "clafoutis-studio";
const STORE_NAME = "drafts";
const DB_VERSION = 1;

interface DraftData {
  projectId: string;
  tokenFiles: Record<string, DTCGTokenFile>;
  baselineSha: string;
  savedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "projectId" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDraft(
  projectId: string,
  tokenFiles: Record<string, DTCGTokenFile>,
  baselineSha: string,
): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const data: DraftData = {
    projectId,
    tokenFiles,
    baselineSha,
    savedAt: Date.now(),
  };
  store.put(data);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadDraft(projectId: string): Promise<DraftData | null> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.get(projectId);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function clearDraft(projectId: string): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.delete(projectId);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function hasDraft(projectId: string): Promise<boolean> {
  const draft = await loadDraft(projectId);
  return draft !== null;
}
