export function useNonReactiveCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
