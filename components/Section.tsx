import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  variant?: "default" | "hero" | "card";
}

export default function Section({ 
  children, 
  title, 
  description, 
  className = "", 
  variant = "default" 
}: SectionProps) {
  const baseClasses = "rounded-2xl p-6 sm:p-8";
  
  const variantClasses = {
    default: "border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800",
    hero: "bg-gradient-to-br from-blue-100 via-green-100/60 to-amber-100/60 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800/60",
    card: "border border-slate-200 bg-white/90 shadow dark:border-slate-700 dark:bg-slate-800/90"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <section className={combinedClasses}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
