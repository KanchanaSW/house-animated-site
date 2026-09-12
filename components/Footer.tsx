export default function Footer() {
  return (
    <footer className="bg-studio px-4 py-10 text-studio-muted md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 border-t border-studio-line pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-studio-ink">Strata</p>
        <p className="max-w-[50ch] text-sm leading-relaxed">
          Architecture for houses that can be read as a kit of parts.
        </p>
        <a
          href="mailto:studio@strata.house"
          className="text-sm text-studio-ink underline-offset-4 hover:underline"
          data-cursor
        >
          studio@strata.house
        </a>
      </div>
    </footer>
  );
}
