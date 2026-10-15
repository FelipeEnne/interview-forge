"use client";

import { useCallback, useSyncExternalStore } from "react";

import { noopSubscribe } from "./noop-subscribe";

export function useLocalStorageSnapshot(storageKey: string): string | null {
  const getSnapshot = useCallback(
    () => window.localStorage.getItem(storageKey),
    [storageKey],
  );

  return useSyncExternalStore(noopSubscribe, getSnapshot, () => null);
}
