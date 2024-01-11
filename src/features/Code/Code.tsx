import { Textarea } from "@nextui-org/input";
import { PauseIcon } from "../ui/Icon/PauseIcon";
import { PlayArrowIcon } from "../ui/Icon/PlayArrowIcon";
import { SettingsIcon } from "../ui/Icon/SettingsIcon";

export function Code() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="text-xl">ソースコード</div>
        <div className="flex gap-2">
          <PlayArrowIcon />
          <PauseIcon />
          <SettingsIcon />
        </div>
      </div>
      <Textarea />
    </div>
  );
}