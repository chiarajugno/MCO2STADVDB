import '@mantine/core/styles.css';
import './globals.css';
import '@mantine/notifications/styles.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}