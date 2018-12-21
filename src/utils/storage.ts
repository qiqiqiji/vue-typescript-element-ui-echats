export const saveUserInfo = (
  name: string,
  role: string,
  username: string,
  siteId: string,
  token: string,
  expressTime: string
) => {
  localStorage.setItem("name", name);
  localStorage.setItem("role", role);
  localStorage.setItem("username", username);
  localStorage.setItem("siteId", siteId);
  localStorage.setItem("token", token);
  localStorage.setItem("expressTime", expressTime);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export function saveMenu(jumpMenu: object[]) {
  localStorage.setItem("menu", JSON.stringify(jumpMenu));
}

export function getMenu(): any {
  return JSON.parse(localStorage.getItem("menu") as string);
}
