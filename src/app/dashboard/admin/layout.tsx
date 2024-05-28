import SidebarGym from "../../../../components/organims/SidebarGym"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <main>
        <body className="flex ">
          <SidebarGym />
          {children}
        </body>
      </main>
    </html>
  )
}
