export interface ButtonProps {
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  noPadding?: boolean;
  disabled?: boolean;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}