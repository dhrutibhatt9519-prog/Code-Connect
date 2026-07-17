export const API_BASE_URL = 'http://localhost:3000';
export const DEPLOYED_DATA_URL = '/db.json';
export const SAMPLE_USER_ID = 'user1';

export function usesLocalJsonServer(): boolean {
  const hostname = globalThis.location?.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
}
