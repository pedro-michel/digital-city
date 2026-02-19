import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      {children}
    </main>
  );
}
