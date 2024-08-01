import { AuthProvider } from "@/lib/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Car Shipping Management System",
  description: "A sample dashboard for car shipping management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
