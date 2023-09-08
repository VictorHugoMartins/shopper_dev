import React from "react";

import style from "./flexbox.module.scss";
import { FlexboxProps } from "./flexbox.interface";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

const Flexbox: React.FC<FlexboxProps> = ({
  align = "flex-start",
  children,
  flexDirection,
  justify = "flex-start",
  spacing,
  width
}) => {
  let classList = [
    style.flexbox,
    spacing && style[`${spacing}Spacing`],
  ];

  return (
    <div
      className={ClassJoin(classList)}
      style={{
        alignItems: align,
        justifyContent: justify,
        flexDirection: flexDirection,
        width: width,
      }}
    >
      {children}
    </div>
  );
};

export default Flexbox;
