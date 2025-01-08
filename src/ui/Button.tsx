import { Link } from "react-router-dom";
interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  type: "primary" | "secondary" | "add" | "small" | "round";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function Button({
  children,
  disabled,
  to,
  type,
  onClick,
}: ButtonProps) {
  const base =
    "inline-block text-sm rounded-full bg-[#F54748] font-semibold uppercase tracking-wide text-white/90 transition-colors duration-300 hover:bg-[#e03232] focus:bg-[#e03232]  focus:outline-none focus:ring focus:ring-[#e03232]  focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    add: "text-[#F54748] px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
