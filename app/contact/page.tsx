import { db } from "@/lib/db";
import { config } from "@/lib/schema";
import { inArray } from "drizzle-orm";
import Link from "next/link";

export const metadata = {
  title: "Contact - Student Notes Portal",
  description: "Get in touch via WhatsApp.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const rows = await db.select().from(config).where(inArray(config.key, ["whatsapp_number", "whatsapp_message", "contact_page_message"]));
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value ?? ""]));
  const num = (map.whatsapp_number || "919904427095").replace(/\D/g, "");
  const text = encodeURIComponent(map.whatsapp_message || "Hello senior, I want to ask about ....");
  const msg = map.contact_page_message || "Click the button below to message me directly on WhatsApp.";

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 dark:text-white">Contact</span>
      </nav>
      
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Get in Touch</h1>
        <p className="mx-auto max-w-lg text-lg text-slate-600 dark:text-slate-400">
          Have questions or need help? Reach out to us directly on WhatsApp for the fastest response.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl dark:border-slate-700/80 dark:bg-slate-800">
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-center dark:from-slate-800 dark:to-slate-700">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 2.39 4.024c1.326 1.148 2.838 1.773 3.483 1.968.198.064.384.099.565.099.569 0 1.772-.233 2.044-.66.273-.427.273-.79.198-.876-.074-.084-.272-.173-.57-.36z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">WhatsApp Support</h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400">{msg}</p>
          <a
            href={`https://wa.me/${num}?text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 2.39 4.024c1.326 1.148 2.838 1.773 3.483 1.968.198.064.384.099.565.099.569 0 1.772-.233 2.044-.66.273-.427.273-.79.198-.876-.074-.084-.272-.173-.57-.36z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
            </svg>
            Message on WhatsApp
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-slate-700/80 dark:from-slate-800 dark:to-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Response Time</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Usually within minutes</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-purple-50 to-pink-50 p-4 dark:border-slate-700/80 dark:from-slate-800 dark:to-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Quick Help</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Direct support available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
