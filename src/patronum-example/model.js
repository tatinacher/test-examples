import { createStore, createEvent } from "effector";
import { throttle, spread } from "patronum";

const THROTTLE_TIMEOUT_IN_MS = 200;

export const $width = createStore(0);
export const $height = createStore(0);
export const updateWidth = createEvent();
export const updateSize = throttle({
  source: updateWidth,
  timeout: THROTTLE_TIMEOUT_IN_MS,
});

spread({
  source: updateSize,
  targets: {
    innerWidth: $width,
    innerHeight: $height,
  },
});
