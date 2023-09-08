import React from "react";

import { ButtonProps } from "./button.interface";

import styles from "./button.module.scss";

import ClassJoin from "~/utils/ClassJoin/ClassJoin";

const Button: React.FC<ButtonProps> = ({
  color,
  noPadding,
  text,
  disabled,
  onClick,
}) => {
  let classList = [styles.button, styles[color], noPadding && styles.noPadding];

  return (
    <button
      className={ClassJoin(classList)}
      type={"button"}
      onClick={(e) => { if (onClick) onClick(e); }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
