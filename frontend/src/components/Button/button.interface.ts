export interface ButtonProps {
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  className?: string;
  disabled?: boolean;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}