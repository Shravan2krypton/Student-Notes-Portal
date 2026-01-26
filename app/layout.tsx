import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import PublicLayout from "@/components/PublicLayout";
import "@/app/globals.css";
import "@/app/layout.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://student-notes-portal.example"),
  title: {
    default: "Student Notes Portal",
    template: "%s | Student Notes Portal",
  },
  description: "Notes, PYQs, and academic resources for engineering students",
  applicationName: "Student Notes Portal",
  openGraph: {
    type: "website",
    title: "Student Notes Portal",
    description: "Notes, PYQs, and academic resources for engineering students",
    siteName: "Student Notes Portal",
  },
  twitter: {
    card: "summary",
    title: "Student Notes Portal",
    description: "Notes, PYQs, and academic resources for engineering students",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased layout-container">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PublicLayout>{children}</PublicLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
