import { getLocales } from "@/lib/locale-server";
import { getBasePath } from "@/lib/site-paths";

export default function LocaleRedirectPage() {
  const locales = getLocales();
  const fallbackLocale = locales[0] || "en";
  const basePath = getBasePath();

  const redirectScript = `
(() => {
  const supported = ${JSON.stringify(locales)};
  const fallback = ${JSON.stringify(fallbackLocale)};
  const basePath = ${JSON.stringify(basePath)};
  const language = (navigator.language || "").toLowerCase();
  const languages = [language, ...(navigator.languages || []).map((item) => item.toLowerCase())];
  const matched = languages.find((item) => supported.includes(item) || item.startsWith("zh"));
  const locale = matched ? (matched.startsWith("zh") ? "cn" : matched.split("-")[0]) : fallback;
  const targetLocale = supported.includes(locale) ? locale : fallback;
  const target = basePath + "/" + targetLocale + "/";
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
