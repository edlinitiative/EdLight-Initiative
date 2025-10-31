// Lightweight logger that is active only in development builds.
const isDev = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development';

export const debug = (...args: unknown[]) => {
  if (isDev) console.debug(...args);
};

export const info = (...args: unknown[]) => {
  if (isDev) console.info(...args);
};

export const warn = (...args: unknown[]) => {
  if (isDev) console.warn(...args);
};

export const error = (...args: unknown[]) => {
  if (isDev) console.error(...args);
};

const logger = { debug, info, warn, error };
export default logger;
