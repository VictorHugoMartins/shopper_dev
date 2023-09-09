import React, { useEffect, useState } from "react";

//Import assets
import styles from "./allFileInput.module.scss";

//Import utils
import { fileToBase64 } from "~/utils/FileToBase64";

//Import types
import { FileInputProps } from "./fileInput.interface";
import { FileObjectType } from "~/types/FileObjectType";
import FileCard from "~/components/FileCard";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

const AllFileInput: React.FC<FileInputProps> = ({
  onChange,
  value,
  remove
}) => {
  const [allFile, setAllFile] = useState<File>(null);
  const [inputValue, setInputValue] = useState<FileObjectType>({
    name: "",
    disabled: false,
    file: "",
  });

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (remove === true) {
      setInputValue(null);
    }
  }, [remove])

  function _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    let file = event.target.files[0];
    if (file) {
      setAllFile(file);
      fileToBase64(file, (newFile) => {
        let object = { ...inputValue, name: file.name, file: newFile };
        setInputValue(object);
        if (onChange) onChange(object);
      });
    }
  }

  return (
    <div className={styles.allFileInput}>
      {inputValue?.file ? (
        <FileCard
          fileObject={inputValue}
          onRemove={() => {
            setInputValue(null);
          }}
        />
      ) : (
        <label>
          <div className={ClassJoin([styles.fileInput, styles.primary])}>
            <p>Carregar arquivo de precificação</p>
            <input
              type="file"
              accept="csv"
              onClick={() => {
                setAllFile(null);
              }}
              onChange={_onChange}
            />
          </div>
        </label>
      )}
    </div>
  );
};

export default AllFileInput;
