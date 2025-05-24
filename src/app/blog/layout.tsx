import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - नiveśा",
  description:
    "Expert articles on mutual funds, credit cards, and loyalty programs for Indians and NRIs across the world",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </div>
  );
}
