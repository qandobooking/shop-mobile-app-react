export function authTokenConfig(state, config = {headers: {}}) {
  const authtoken = state.auth ? 'JWT ' + state.auth.token : null;
  return { ...config, headers: { ...config.headers, Authorization: authtoken } };
}

export function jsonPostConfig(body = {}) {
  return {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}
