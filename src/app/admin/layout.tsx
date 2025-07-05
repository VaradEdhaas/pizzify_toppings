import type { ReactNode } from "react";
import ClientAdminLayout from "./ClientAdminLayout.client";

export default function Layout({ children }: { children: ReactNode }) {
  return <ClientAdminLayout>{children}</ClientAdminLayout>;
}
