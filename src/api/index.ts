import ajax from "./ajax";

interface ajaxFunc {
  (data?: object): Promise<object>;
}

export const getSiteId: ajaxFunc = () => ajax("/api/v1/getsiteid");

export const getPasswordStrategy: ajaxFunc = () =>
  ajax("/api/v1/accessmanage/passwordstrategy");

export const login: ajaxFunc = data => ajax("/api/v1/login", data, "post");

export const getMenu: ajaxFunc = data =>
  ajax("/api/v1/auth/menu", data, "post");

export const getLoginConfig: ajaxFunc = () =>
  ajax("/api/v1/auth/accessmanage/loginsettings");

export const getPwdConfig: ajaxFunc = () =>
  ajax("/api/v1/accessmanage/passwordstrategy");
