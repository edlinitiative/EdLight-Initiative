export const BUILD_COMMIT = (process.env.NEXT_PUBLIC_BUILD_COMMIT || 'dev').slice(0, 7);
export const BUILD_BRANCH = process.env.NEXT_PUBLIC_BUILD_BRANCH || 'local';
export const BUILD_REPO = process.env.NEXT_PUBLIC_BUILD_REPO || 'workspace';
export const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString();

export default { BUILD_COMMIT, BUILD_BRANCH, BUILD_REPO, BUILD_TIME };
