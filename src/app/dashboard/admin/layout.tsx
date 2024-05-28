import SidebarGym from "../../../../components/organims/SidebarGym"
import ProtectedRoute from "../../../../components/protecte/ProtecteRouter"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ProtectedRoute>
        <body className="flex ">
          <SidebarGym />
          {children}
        </body>
      </ProtectedRoute>
    </html>
  )
}
