import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <span className="text-lg font-bold tracking-wider text-neon-pink">
              MOOSEPHONE
            </span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <span>&copy; {new Date().getFullYear()} Moosephone</span>
            <span>Cloud Phone Solutions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
