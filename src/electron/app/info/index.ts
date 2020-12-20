declare const __BUILD_INFO_PACKAGE_NAME__: String;
declare const __BUILD_INFO_PACKAGE_VERSION__: String;

export const Info = Object.freeze({
  name: __BUILD_INFO_PACKAGE_NAME__,
  version: __BUILD_INFO_PACKAGE_VERSION__
});
