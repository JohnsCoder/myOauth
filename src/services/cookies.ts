export default {
  add(cookie: any) {
    const key = Object.keys(cookie)[0];
    const value = cookie[key];
    document.cookie = `${key}=${value}; expires=${new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000
    )}; place="/"; SameSite=strict; Secure";`;
  },
  remove(key: string) {
    document.cookie = `${key}=""; expires=${Date()}`;
  },
  get(key: string) {
    const arrCookie = document.cookie.split("; ");
    let objCookie: any = new Object();
    arrCookie.forEach((cookie) => {
      const keysAndValues = cookie.split("=");
      objCookie[keysAndValues[0]] = keysAndValues[1];
    });
    return objCookie[key];
  },
};
