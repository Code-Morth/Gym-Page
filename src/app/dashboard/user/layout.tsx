import SidebarGym from "../../../../components/organims/SidebarGym"
import ProtectedRoute from "../../../../components/protecte/ProtecteRouter"

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="flex">
        <ProtectedRoute>
          <SidebarGym />
          {children}
        </ProtectedRoute>
      </body>
    </html>
  )
}
