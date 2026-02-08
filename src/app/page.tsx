import Link from "next/link";
import Logo from "@/components/Logo";
import { PHONE_MODELS } from "@/lib/types";

export default function Home() {
  return (
    <div className="grid-floor">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Background gradient orbs */}
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-pink/5 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-neon-cyan/5 blur-[120px]" />

        <Logo size={180} className="mb-8" />

        <h1 className="mb-2 text-5xl font-extrabold tracking-wider text-neon-pink glow-pink sm:text-7xl">
          MOOSEPHONE
        </h1>
        <p className="mb-6 text-lg font-medium tracking-widest text-neon-cyan glow-cyan sm:text-xl">
          CLOUD PHONES. PLUG IN. GO.
        </p>
        <p className="mb-10 max-w-xl text-gray-400">
          Pre-configured Yealink phones delivered to your door. Just plug in the ethernet cable
          and start making calls. No technical setup required.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/configure" className="btn-neon rounded-lg text-lg">
            Configure Your Phones
          </Link>
          <Link href="#pricing" className="btn-neon btn-neon-cyan rounded-lg text-lg">
            View Pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-16 text-center text-3xl font-bold text-white sm:text-4xl">
          Why <span className="text-neon-pink">Moosephone</span>?
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Zero Config",
              desc: "Phones arrive pre-configured with your extensions, voicemail, and settings. Plug in and go.",
              icon: (
                <svg className="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              ),
            },
            {
              title: "Enterprise Hardware",
              desc: "Yealink phones with HD audio, color displays, Wi-Fi, Bluetooth, and all the features you need.",
              icon: (
                <svg className="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              ),
            },
            {
              title: "Simple Pricing",
              desc: "One monthly price per phone. No hidden fees, no surprise charges. Cancel anytime.",
              icon: (
                <svg className="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              title: "Scalable",
              desc: "From 1 phone to 100+. Add or remove lines whenever your business needs change.",
              icon: (
                <svg className="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              ),
            },
            {
              title: "Cloud Managed",
              desc: "All phone settings managed in the cloud. Updates roll out automatically. No on-site IT needed.",
              icon: (
                <svg className="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                </svg>
              ),
            },
            {
              title: "Support Included",
              desc: "Phone not working? We help remotely or send a replacement. Support is always included.",
              icon: (
                <svg className="h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              ),
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-dark-border bg-dark-card p-6 transition-all hover:border-neon-pink/30 hover:box-glow-pink"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
          Choose Your <span className="text-neon-cyan">Phone</span>
        </h2>
        <p className="mb-16 text-center text-gray-400">
          All phones come pre-configured and ready to use. Monthly pricing includes the phone, service, and support.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PHONE_MODELS.map((phone, i) => (
            <div
              key={phone.id}
              className={`relative rounded-xl border bg-dark-card p-8 transition-all ${
                i === 1
                  ? "border-neon-cyan box-glow-cyan"
                  : "border-dark-border hover:border-neon-pink/30"
              }`}
            >
              {i === 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon-cyan px-4 py-1 text-xs font-bold text-dark-bg">
                  MOST POPULAR
                </div>
              )}
              {/* Phone icon placeholder */}
              <div className="mb-6 flex h-32 items-center justify-center rounded-lg bg-dark-bg">
                <svg className="h-16 w-16 text-neon-pink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{phone.name}</h3>
              <p className="mb-4 text-sm text-gray-400">{phone.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-neon-cyan">${phone.priceMonthly}</span>
                <span className="text-gray-500">/mo per phone</span>
              </div>
              <Link
                href={`/configure?model=${phone.id}`}
                className={`btn-neon block rounded-lg text-center ${i === 1 ? "btn-neon-cyan" : ""}`}
              >
                Configure
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-dark-border py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Ready to upgrade your phones?
        </h2>
        <p className="mb-8 text-gray-400">
          Configure your phones in minutes. We handle everything else.
        </p>
        <Link href="/configure" className="btn-neon rounded-lg text-lg">
          Get Started Now
        </Link>
      </section>
    </div>
  );
}
