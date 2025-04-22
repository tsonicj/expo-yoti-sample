// Reexport the native module. On web, it will be resolved to YotiDocScanExpoModule.web.ts
// and on native platforms to YotiDocScanExpoModule.ts
export { default } from './src/YotiDocScanExpoModule';
export * from './src/YotiDocScanExpo.types';
