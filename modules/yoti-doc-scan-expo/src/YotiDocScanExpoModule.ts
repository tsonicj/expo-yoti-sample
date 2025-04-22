import { requireNativeModule } from "expo-modules-core";

import {
  YotiDocScanResult,
} from "./YotiDocScanExpo.types";

interface YotiDocScanExpoModule {
  startSession(sessionId: string, sessionToken: string): Promise<YotiDocScanResult>;
}

export default requireNativeModule<YotiDocScanExpoModule>("YotiDocScanExpo");
