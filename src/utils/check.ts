
/**
 * 密码策略,4种不同的密码要求
 *
 * @param passwordLen 密码长度要求
 * @param passwordStyle 密码格式要求
 * @param value 待验证的字符串
 * @returns {boolean} 是否符合要求
 */
export const checkPasswordStrategy = (passwordLen: number = 8, passwordStyle: string, value: string): boolean => {
  if (passwordStyle === "2") {
    return value.length >= passwordLen;
  }

  //必须包含大小写字母和数字
  let strategy1 =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{" + passwordLen + ",}$";

  //必须包含小写字母
  let strategy3 = "^(?=.*[a-z])[a-zA-Z\\d]{" + passwordLen + ",}$";

  //必须包含小写字母和数字
  let strategy4 = "^(?=.*[a-z])(?=.*\\d)[a-zA-Z\\d]{" + passwordLen + ",}$";

  let strategy;
  switch (passwordStyle) {
    case "1": {
      strategy = strategy1;
      break;
    }
    case "3": {
      strategy = strategy3;
      break;
    }
    case "4": {
      strategy = strategy4;
      break;
    }
    default: {
      strategy = strategy1;
    }
  }
  return new RegExp(strategy).test(value);
};

/**
 * 验证错误原因
 *
 * @param passwordStyle 密码格式要求
 * @param passwordLen 密码长度要求
 * @returns {string}
 */
export const getFailDetail = (passwordStyle: string, passwordLen: number): string => {
  switch (passwordStyle) {
    case "1": {
      return `必须包含大小写字母和数字，最小长度${passwordLen}个字符`;
    }
    case "2": {
      return `最小长度${passwordLen}个字符`;
    }
    case "3": {
      return `必须包含小写字母，最小长度${passwordLen}个字符`;
    }
    case "4": {
      return `必须包含小写字母和数字，最小长度${passwordLen}个字符`;
    }
    default: {
      return `必须包含大小写字母和数字，最小长度${passwordLen}个字符`;
    }
  }
};
