/** Returns an unsubscribe no-op for one-shot useSyncExternalStore snapshots. */
export function noopSubscribe(): () => void {
  return () => {};
}
