import { matchPath } from 'react-router-dom';

export const getIsOnPage = (
  pathName: string,
  path: string,
  exact = false,
  strict = false
) =>
  Boolean(
    matchPath(pathName, {
      path,
      exact,
      strict,
    })
  );
