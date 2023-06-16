import './globals.css'


export const metadata = {
  title: 'Rock Paper scissors',
  description: 'Lets play a game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="min-h-screen" lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
