import Link from "next/link";
import { ReactNode } from "react";

interface DashboardButtonProps {
  text: string;
  href: string;
  icon?: ReactNode; // Optional icon
  className?: string; // Optional custom styles
}

export default function DashboardButton({
  text,
  href,
  icon,
  className = "",
}: DashboardButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-center p-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{text}</span>
    </Link>
  );
}