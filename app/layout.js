import './globals.css'

export const metadata = {
  title: 'Makan Yuks!',
  description: 'Deskripsi aplikasi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}