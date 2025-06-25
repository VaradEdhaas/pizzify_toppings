import ClientAdminLayout from "./ClientAdminLayout";

interface AdminLayoutProps {
  children: React.ReactNode;
  selected: string;
  onSelect: (page: string) => void;
}

export default function AdminLayout({ children, selected, onSelect }: AdminLayoutProps) {
  return (
    <ClientAdminLayout selected={selected} onSelect={onSelect}>
      {children}
    </ClientAdminLayout>
  );
}
