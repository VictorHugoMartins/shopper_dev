import { CSSProperties } from 'react';
import { AlignType, JustifyType } from "~/types/LayoutTypes";
import {
  SpacingPatternObjectType,
  SpacingPatternType,
} from "~/types/SpacingType";

export interface FlexboxProps {
  children: React.ReactNode;
  align?: AlignType;
  justify?: JustifyType;
  flexDirection?: "row" | "column";
  spacing?: SpacingPatternType;
  width?: number | string;
}