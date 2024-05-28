import "../../styles/index.css"
import { PrimeReactProvider } from "primereact/api"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PrimeReactProvider>
      <html lang="es">
        <body>
        {children}
        </body>
      </html>
    </PrimeReactProvider>
  )
}
