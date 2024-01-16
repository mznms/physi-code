import { Textarea } from "@nextui-org/react";
import { useCode } from "@/features/Code/codeContext";

export function Result() {
  const { code } = useCode();
  return (
    <Textarea
      label="ソースコード"
      placeholder="Enter your description"
      value={code}
      disableAnimation
      disableAutosize
      classNames={{
        base: "absolute bottom-0 left-0 z-50 w-screen h-[calc(100dvh-100vw-64px)] lg:relative lg:w-auto lg:min-w-64 lg:flex-grow lg:h-[min(calc(100dvh-64px-32px),calc(100vw-340px))]",
        inputWrapper: "flex-grow rounded-none lg:rounded-2xl",
        input: "text-4xl h-full",
      }}
      isReadOnly={true}
    />
  );
}
