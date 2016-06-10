export function searchRegExp(search) {
  const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
  const escapedSearch = search.replace(matchOperatorsRe, '\\$&');
  return new RegExp(`${escapedSearch}`, 'gi');
};

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
