import ClientAdminLayout from "./ClientAdminLayout";

export const metadata = {
  title: "Admin Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientAdminLayout>{children}</ClientAdminLayout>;
}
