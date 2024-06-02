import SidebarGym from "../../../../components/organims/SidebarGym";
import ProtectedRoute from "../../../../components/protecte/ProtecteRouter";

export default function RootLayout({ children }:any) {
  return (
    <html lang="en"> {/* Ensure consistent language */}
        <body className="flex">
      <ProtectedRoute>
          <SidebarGym />
          {children}
      </ProtectedRoute>
        </body>
    </html>
  );
}
