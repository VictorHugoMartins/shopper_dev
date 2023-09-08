import { FileObjectType } from "~/types/FileObjectType";

export interface FileInputProps {
  value?: FileObjectType;
  onChange?: (file: FileObjectType) => void;
}