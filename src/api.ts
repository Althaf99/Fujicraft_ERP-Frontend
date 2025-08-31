// Type declaration for process.env in Create React App
declare global {
  // eslint-disable-next-line no-var
  var process: {
    env: {
      REACT_APP_API_URL?: string;
      [key: string]: string | undefined;
    };
  };
}
const API_BASE =
  (import.meta as any).env?.VITE_API_URL ||
  (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) ||
  'http://localhost:5001/api';

export { API_BASE };