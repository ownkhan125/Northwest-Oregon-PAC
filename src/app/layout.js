import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Morgan Hale for Congress — A New Chapter for the 14th District",
  description:
    "Morgan Hale is running for Congress to build a fair economy, strengthen democracy, and deliver results for working families.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-background text-foreground flex flex-col overflow-x-hidden">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
