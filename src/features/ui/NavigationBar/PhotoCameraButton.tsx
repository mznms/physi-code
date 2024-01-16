"use client";
import { Button } from "@nextui-org/button";
import { PhotoCameraIcon } from "../Icon/PhotoCamera";
import { useCamera } from "@/features/Camera/useCamera";

export function PhotoCameraButton() {
  const { isOpen, setIsOpen, isLoading } = useCamera();

  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <Button
      onClick={handleClick}
      color="primary"
      endContent={<PhotoCameraIcon size={24} />}
      isLoading={isLoading}
    >
      {isOpen ? "終了" : "起動"}
    </Button>
  );
}
