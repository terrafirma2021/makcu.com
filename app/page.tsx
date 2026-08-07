import { getLocales } from "@/lib/locale-server";
import { getBasePath } from "@/lib/site-paths";

export default function LocaleRedirectPage() {
  const locales = getLocales();
  const fallbackLocale = locales.includes("en") ? "en" : locales[0] || "en";
  const basePath = getBasePath();

  const redirectScript = `
(() => {
  const fallback = ${JSON.stringify(fallbackLocale)};
  const basePath = ${JSON.stringify(basePath)};
  const target = basePath + "/" + fallback + "/";
  window.location.replace(target + window.location.search + window.location.hash);
})();
  `.trim();

  return (
    <main className="min-h-screen px-6 py-10">
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <a href={`${basePath}/${fallbackLocale}/`}>Continue to MAKCU</a>
      </noscript>
    </main>
  );
}
