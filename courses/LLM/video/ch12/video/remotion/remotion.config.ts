/**
 * All configuration options: https://remotion.dev/docs/config
 */
import { existsSync } from "node:fs";
import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Prefer a locally installed Chrome when headless-shell is unavailable.
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
} else if (existsSync(chrome)) {
  Config.setBrowserExecutable(chrome);
}
