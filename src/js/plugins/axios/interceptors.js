const lsTokenKey = "my_app_token";

function setToken(req) {
  const isAuthUrl = req.url.includes("auth");

  if (!isAuthUrl) {
    const token = localStorage.getItem(lsTokenKey);
    req.headers["x-access-token"] = token;
  }

  return req;
}

function onError(err) {
  console.dir(err);

  return Promise.reject(err);
}

function setTokenOnLogin(resp) {
  const isLoginUrl = resp.config.url.includes("login");

  if (isLoginUrl) {
    const token = resp.data.token;
    localStorage.setItem(lsTokenKey, token);
  }

  return resp;
}

function getClearResponse(resp) {
  return resp.data;
}

export default function (axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearResponse, onError);
}
