export default function HeroFallback() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-studio">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/poster.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  );
}
