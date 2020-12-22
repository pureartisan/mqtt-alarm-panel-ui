declare const __BUILD_INFO_PACKAGE_NAME__: string;
declare const __BUILD_INFO_PACKAGE_VERSION__: string;

export const Info = Object.freeze({
  name: __BUILD_INFO_PACKAGE_NAME__,
  version: __BUILD_INFO_PACKAGE_VERSION__
});
