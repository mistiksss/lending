import { LeadForm } from "@/components/LeadForm";
import { site } from "@/lib/site";
import { RequestCta } from "@/components/RequestCta";

export function Afterform() {
  const { about, gallery, capabilities, benefits, closing, brand, request } =
    site;

  return (
    <>
      <section className="border-t border-line bg-ink">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          <figure className="min-h-[420px] bg-ink-soft md:min-h-[640px]">
            <img
              src={about.image}
              alt={about.imageAlt}
              className="h-full w-full object-cover"
            />
          </figure>
          <div className="flex flex-col justify-center px-5 py-16 md:px-14 md:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-solare">
              {about.kicker}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-paper md:text-5xl">
              {about.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mute">
              {about.text}
            </p>
            <ul className="mt-10 space-y-5">
              {about.points.map((point) => (
                <li key={point.title} className="text-paper">
                  <span className="font-display font-semibold">
                    {point.title}
                  </span>
                  <span className="mt-1 block text-sm text-mute">
                    {point.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <RequestCta>{site.offer.about}</RequestCta>
            </div>
          </div>
        </div>
      </section>

      <section id="plus" className="px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-3">
          {gallery.map((item) => (
            <Figure key={item.src} {...item} />
          ))}
        </div>
      </section>

      <section className="border-t border-line px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-solare">
            {capabilities.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold text-paper md:text-5xl">
            {capabilities.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mute">
            {capabilities.text}
          </p>
          <ul className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.items.map((item) => (
              <li key={item.name} className="bg-ink px-6 py-8">
                <p className="font-display text-xl font-semibold text-paper">
                  {item.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="spec"
        className="border-t border-line px-5 py-28 md:px-8 md:py-36"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-solare">
            {benefits.kicker}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-paper md:text-5xl">
            {benefits.title}
          </h2>
          <div className="mt-16 grid gap-3 sm:grid-cols-2">
            {benefits.items.map((item) => (
              <article
                key={item.label}
                className="border border-line bg-ink-soft px-6 py-8 md:px-8 md:py-10"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-solare">
                  {item.label}
                </p>
                <p className="mt-4 font-display text-4xl font-bold text-paper md:text-5xl">
                  {item.value}
                </p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id={request.id}
        className="border-t border-line bg-ink"
      >
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          <figure className="relative min-h-[420px] bg-ink-soft md:min-h-[640px]">
            <img
              src={closing.image}
              alt={closing.imageAlt}
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute bottom-6 left-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/80 md:bottom-8 md:left-8">
              {closing.caption}
            </figcaption>
          </figure>
          <div className="flex flex-col justify-center px-5 py-16 md:px-14 md:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-solare">
              {request.kicker}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-paper md:text-5xl">
              {request.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mute">
              {request.text}
            </p>
            <div className="mt-10 max-w-md">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-5 py-20 md:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              {brand.name}
            </p>
            <p className="mt-5 font-display text-5xl font-extrabold uppercase text-paper md:text-7xl">
              {brand.product}
            </p>
            <p className="mt-4 text-sm font-medium text-mute">{brand.tagline}</p>
          </div>
          <RequestCta>{site.offer.nav}</RequestCta>
        </div>
      </footer>
    </>
  );
}

function Figure({
  src,
  kicker,
  title,
  alt,
}: {
  src: string;
  kicker: string;
  title: string;
  alt: string;
}) {
  return (
    <figure className="group relative overflow-hidden bg-ink-soft">
      <img
        src={src}
        alt={alt}
        className="aspect-[16/10] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-solare">
          {kicker}
        </p>
        <p className="mt-1 text-lg font-medium text-paper">{title}</p>
      </figcaption>
    </figure>
  );
}
