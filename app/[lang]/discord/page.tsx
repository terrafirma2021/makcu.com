const DISCORD_INVITE_URL = "https://discord.com/invite/makcu";

export default function DiscordRedirect() {
  return (
    <main className="min-h-[60vh] px-6 py-10">
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(DISCORD_INVITE_URL)});`,
        }}
      />
      <a href={DISCORD_INVITE_URL}>Continue to Discord</a>
    </main>
  );
}
