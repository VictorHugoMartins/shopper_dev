import React, { useEffect, useState } from "react";

import { FileObjectType } from "~/types/FileObjectType";
import Icon from "../Icon/Icon";
import { IconTypes } from "../Icon/icon.interface";

import styles from "./fileCard.module.scss";

export interface FileCardProps {
  fileObject: FileObjectType;
  onRemove: () => void;
}

type PreviewIconImgType = {
  isImage: boolean;
  icon?: IconTypes;
  ext?: string;
};

const FileCard: React.FC<FileCardProps> = ({ fileObject, onRemove }) => {
  const [preview, setPreview] = useState<PreviewIconImgType>({
    isImage: false,
    icon: null,
  });

  useEffect(() => _checkPreview(), [fileObject]);

  function _checkPreview() {
    setPreview({ icon: "FaFile", isImage: false, ext: "File" });
  }

  return (
    <div className={styles.fileCard}>
      <div className={styles.fileCardContent}>
        <div className={styles.preview}>
          {preview.icon && (
            <Icon type={preview.icon} size={30} />
          )}
        </div>
        <div className={styles.label}>{fileObject.name}</div>

        <a className={styles.icon} onClick={() => onRemove()}>
          <Icon type="FaRegTimesCircle" size={20} />
        </a>

      </div>
    </div>
  );
};

export default FileCard;
