import { createEvent, createStore } from "effector-root";
import { throttle, spread } from "patronum";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test("Dimensions get updated after trottle and not being updated before timeout", async () => {
  const update = createEvent();
  const updateSizeFn = throttle({ source: update, timeout: 300 });

  const $width = createStore(0);
  const $height = createStore(0);

  update({ innerWidth: 100, innerHeight: 100 });

  spread({
    source: updateSizeFn,
    targets: {
      innerWidth: $width,
      innerHeight: $height,
    },
  });

  expect($width.getState()).toBe(0);
  expect($height.getState()).toBe(0);
  await wait(300);

  expect($width.getState()).toBe(100);
  expect($height.getState()).toBe(100);
});
