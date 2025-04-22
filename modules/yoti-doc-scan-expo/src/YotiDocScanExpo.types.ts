import type { StyleProp, ViewStyle } from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type YotiDocScanExpoModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type YotiDocScanExpoViewProps = {
  url: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};

export interface YotiDocScanResult {
  code?: number;
  description: string;
  success?: boolean;
  sessionStatusCode?: number;
  sessionStatusDescription?: string;
}

export interface YotiDocScanConfig {
  sessionId: string;
  sessionToken: string;
  requestCode?: number; // Android only, defaults to 9001
}

export interface YotiDocScanColors {
  lightPrimaryColor?: string; // RGB hex color
  darkPrimaryColor?: string; // RGB hex color
}
