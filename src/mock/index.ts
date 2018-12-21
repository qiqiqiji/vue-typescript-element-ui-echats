import Mock from "mockjs";

Mock.setup({
  timeout: "200-600"
});

Mock.mock("/api/v1/auth/menu", function(options: any) {
  return {
    source: [
      {
        name: "应用日志",
        imageUrl: "systemlog.png",
        url: "/log",
        submenu: [
          {
            name: "日志首页",
            url: "/log/home"
          }
        ]
      },
      {
        name: "配置中心",
        imageUrl: "system_settings.png",
        url: "/configuration",
        submenu: [
          {
            name: "系统配置",
            submenu: [
              {
                name: "访问配置",
                url: "/configuration/system/visit"
              },
              {
                name: "管理员配置",
                url: "/configuration/system/admin"
              },
              {
                name: "备份配置",
                url: "/configuration/system/backups"
              },
              {
                name: "基本配置",
                url: "/configuration/system/basic"
              }
            ]
          },
          {
            name: "系统日志",
            url: "/configuration/log"
          }
        ]
      }
    ],
    success: true
  };
});

Mock.mock("/api/v1/getsiteid", function(options: any) {
  return {
    siteId: "CD62CF864C8CAD76",
    success: true
  };
});

Mock.mock("/api/v1/login", function(options: any) {
  return {
    expressTime: 600000,
    name: "xitong",
    perms: true,
    role: "系统管理员",
    success: true,
    token: "e7k6f104-b238-4efc-88f3-c3254c872d9f"
  };
});

Mock.mock("/api/v1/accessmanage/passwordstrategy", function(options: any) {
  return {
    isAllowRepeatePasswordManager: false,
    minLengthOfPasswordManager: 8,
    passwordStyleManager: "1",
    radiogroup: "default",
    success: true,
    updatePasswordPeroidManager: "3"
  };
});

Mock.mock("/api/v1/auth/accessmanage/loginsettings", function(options: any) {
  return {
    enableConcurrentSessions: false,
    expire: 10,
    failedLockTime: 10,
    retryNumber: 3,
    success: true
  };
});
