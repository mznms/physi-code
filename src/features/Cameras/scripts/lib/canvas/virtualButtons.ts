import { Keypoint, Pose } from "@tensorflow-models/pose-detection/dist/types";
import { Button } from "../types/types";
import { makeFuncGetInputs } from "./checkInput";
import {
  getCanvasContext,
  getCanvasElement,
} from "@/features/Cameras/scripts/utils/getHTMLElement";

/**
 * 3x3のグリッドとしてボタンを配置する
 */
export const virtualButtons = {
  grid_height: 3,
  grid_width: 3,
  grid_center_width: Math.floor(3 / 2),
  height_rate: [0.25, 0.5, 0.25], // 各行の幅の比
  width_rate: [0.25, 0.5, 0.25], // 各列の幅の比
  buttons_visibility: [
    [true, false, true],
    [true, false, true],
    [true, false, true],
  ],
  valid_keypoints: ["right_wrist", "left_wrist", "right_ankle", "left_ankle"],
  // 0: 通常状態のカラー      1:押されている状態のカラー
  colors: {
    normal: "rgba(100, 100, 100, 0.8)",
    pressed: "rgba(255, 100, 0, 0.3)",
  },

  height_rate_sum: Array(),
  width_rate_sum: Array(),
  getInputs: makeFuncGetInputs(),
};

export function initVirtualButtons() {
  virtualButtons.height_rate_sum = [0];
  virtualButtons.width_rate_sum = [0];
  let cnt = 0;
  for (let i = 0; i < virtualButtons.grid_width; i++) {
    cnt += virtualButtons.width_rate[i];
    virtualButtons.width_rate_sum.push(cnt);
  }
  cnt = 0;
  for (let i = 0; i < virtualButtons.grid_height; i++) {
    cnt += virtualButtons.height_rate[i];
    virtualButtons.height_rate_sum.push(cnt);
  }
}

export function buttons_update(poses: Pose[]) {
  buttons_draw_grid();
  buttons_draw(poses);
  if (poses.length != 0) virtualButtons.getInputs(poses[0].keypoints);
}
function buttons_draw_grid() {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const context = getCanvasContext(canvas);

  for (let i = 0; i < virtualButtons.grid_width; i++) {
    let x = canvas.width * virtualButtons.width_rate_sum[i];

    context.beginPath();
    context.moveTo(x, 0); //始点
    context.lineTo(x, canvas.height); //終点
    context.closePath();
    context.stroke();
  }
  for (let i = 0; i < virtualButtons.grid_height; i++) {
    let y = canvas.height * virtualButtons.height_rate_sum[i];

    context.beginPath();
    context.moveTo(0, y); //始点
    context.lineTo(canvas.width, y); //終点
    context.closePath();
    context.stroke();
  }
}

function buttons_draw(poses: Pose[]) {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const context = getCanvasContext(canvas);

  let keypoints: Keypoint[] = poses.length != 0 ? poses[0].keypoints : Array();

  // 仮想ボタンの描画
  for (let i = 0; i < virtualButtons.grid_height; i++) {
    for (let j = 0; j < virtualButtons.grid_width; j++) {
      if (!virtualButtons.buttons_visibility[i][j]) continue;

      let x1, y1, x2, y2: number;
      y1 = canvas.height * virtualButtons.height_rate_sum[i];
      x1 = canvas.width * virtualButtons.width_rate_sum[j];
      y2 = canvas.height * virtualButtons.height_rate_sum[i + 1];
      x2 = canvas.width * virtualButtons.width_rate_sum[j + 1];

      context.fillStyle = virtualButtons.colors.normal;

      for (let target of virtualButtons.valid_keypoints) {
        if (contains({ h: i, w: j }, keypoints, target)) {
          context.fillStyle = virtualButtons.colors.pressed;
        }
      }

      context.fillRect(x1, y1, x2 - x1, y2 - y1);
    }
  }
}

export function centeringPrompt(poses: Pose[]) {
  // Canvas要素を取得
  const canvas = getCanvasElement();
  const context = getCanvasContext(canvas);

  let keypoints: Keypoint[] = poses.length != 0 ? poses[0].keypoints : Array();

  // valid_keypoints のすべてが真ん中の列にあるとき何も表示しない
  // そうでないならばテキストと画像を表示
  let isPersonCenter = true;
  for (let target of virtualButtons.valid_keypoints) {
    let isTargetCenter = false;
    for (let i = 0; i < virtualButtons.grid_height; i++) {
      if (contains(i, virtualButtons.grid_center_width, keypoints, target)) {
        isTargetCenter = true;
        break;
      }
    }
    if (!isTargetCenter) {
      isPersonCenter = false;
      break;
    }
  }

  if (!isPersonCenter) {
    context.textAlign = "center";
    context.scale(-1, 1); // キャンバスが水平反転しているので文字も反転させる
    context.fillStyle = "red";
    context.font = "bold 32px 'ＭＳ ゴシック'";
    context.fillText(
      "全身を中央に映してください",
      -canvas.width / 2, // scale で反転させているため負の値にする
      (canvas.height * 2) / 3,
    );
  }
}

function findKeypointByName(
  keypoints: Keypoint[],
  targetName: String,
): Keypoint | undefined {
  return keypoints.find((keypoint) => keypoint.name === targetName);
}

export function contains(
  button: Button,
  keypoints: Keypoint[],
  target: String,
) {
  if (button.h < 0 || button.w < 0) return false;

  let pnt = findKeypointByName(keypoints, target);

  if (pnt == null) return false;

  let x1, y1, x2, y2: number;
  let canvas = getCanvasElement();
  y1 = canvas.height * virtualButtons.height_rate_sum[button.h];
  x1 = canvas.width * virtualButtons.width_rate_sum[button.w];
  y2 = canvas.height * virtualButtons.height_rate_sum[button.h + 1];
  x2 = canvas.width * virtualButtons.width_rate_sum[button.w + 1];

  return x1 <= pnt.x && pnt.x <= x2 && y1 <= pnt.y && pnt.y <= y2;
}
