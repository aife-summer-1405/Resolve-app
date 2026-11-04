import type { FC, ReactNode } from "react";

interface IDashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<IDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {children}
    </div>
  );
};

export default DashboardLayout;
