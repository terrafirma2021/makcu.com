import type { Metadata } from "next";
import { getDictionary, LangProps } from "@/lib/dictionaries";
import { getLocales } from "@/lib/locale-server";
import RootLayoutProvider from "./provider";

export async function generateMetadata({ params }: LangProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    metadataBase: new URL("https://www.makcu.com"),
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
} & LangProps>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <div lang={lang}>
      <RootLayoutProvider dict={dict}>{children}</RootLayoutProvider>
    </div>
  );
}

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [{ lang: "en" }, { lang: "cn" }];
  }

  try {
    const locales = getLocales();
    return locales.map((locale) => ({ lang: locale }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [{ lang: "en" }, { lang: "cn" }];
  }
}
