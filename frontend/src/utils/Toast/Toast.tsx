import { toast, ToastOptions } from "react-toastify";

let options: ToastOptions<{}> = {
  position: toast.POSITION.BOTTOM_RIGHT,
  theme: "colored",
};

function success(message: string | JSX.Element) {
  toast.success(message, options);
}

function error(message: string | JSX.Element) {
  toast.error(message, options);
}

const Toast = {
  success,
  error,
};

export default Toast;
