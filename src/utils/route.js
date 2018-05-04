export function route(path) {
  const rootPath =
    typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__ ? `${__PATH_PREFIX__}/` : '/';

  if (!path || !path.length || path === '/') {
    return rootPath;
  }

  return `${rootPath}${path[0] === '/' ? path.slice(1) : path}`;
}

export default route;
