import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: ""
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/admin/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased`}
        style={{fontFamily: 'Plus Jakarta Sans'}}
      >
        {children}
      </body>
    </html>
  );
}
