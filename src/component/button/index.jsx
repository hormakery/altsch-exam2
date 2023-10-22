import { CgSpinner } from "react-icons/cg";

export default function Button({ isLoading, children, ...props }) {
  return (
    <button {...props}>
      {isLoading && <CgSpinner size={18} className="icon-spinner" />}
      {children}
    </button>
  );
}
