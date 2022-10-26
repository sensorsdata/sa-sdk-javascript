declare namespace sensors {
  function init(para: object): void;
  function track(e: string, p?: object, c?: any): void;
  function use(name: string, option: object): any;
  function quick(name: string, p?: any, t?: any, c?: any): any;

  function identify(id: string, isSave?: boolean): any;
  function login(id: string, callback?: any): void;
  function logout(isChangeId?: boolean): void;

  function setOnceProfile(prop: object, c?: any): void;
  function setProfile(prop: object, c?: any): void;
  function appendProfile(prop: object, c?: any): void;
  function incrementProfile(prop: object, c?: any): void;
  function deleteProfile(c?: any): void;
  function unsetProfile(prop: object, c?: any): void;

  function registerPage(obj: object): void;

  function getPresetProperties(): any;
}
// 当项目中是通过 script 标签的 src 来加载神策 SDK 时，可以注释掉下面 export 这行代码
export default sensors;