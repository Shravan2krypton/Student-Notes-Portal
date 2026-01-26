import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-300 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-blue-400"
            >
              <span className="transition-transform group-hover:translate-x-1">→</span>
              Contact
            </Link>
            <Link
              href="/feedback"
              className="group inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-green-400"
            >
              <span className="transition-transform group-hover:translate-x-1">→</span>
              Feedback
            </Link>
            <a
              href="https://chat.whatsapp.com/IYm1EWCvIg7CnPQpxoUwmd"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-green-500"
            >
              <span className="transition-transform group-hover:translate-x-1">→</span>
              Join WhatsApp Group
            </a>
          </div>
          <p className="text-sm text-slate-400">
            © 2026 Student Notes Portal. Built by seniors, for juniors.
          </p>
        </div>
        <div className="text-center sm:text-right">
          <p className="font-bold text-white text-lg">Together, we rise</p>
          <p className="mt-1 text-sm text-slate-400">Empowering academic excellence</p>
        </div>
      </div>
    </footer>
  );
}
