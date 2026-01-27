import Link from "next/link";
import Section from "@/components/Section";

export const metadata = {
  title: "About Us - Student Notes Portal",
  description: "Our mission, vision, and who we are.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 text-center text-white shadow-2xl sm:p-12">
        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Empowering Students Together
        </h1>
        <p className="mt-4 text-lg text-white/90 sm:text-xl">
          This portal was created by seniors to make learning easier for juniors.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/feedback"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Give Feedback
          </Link>
          <a
            href="https://chat.whatsapp.com/IYm1EWCvIg7CnPQpxoUwmd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-primary"
          >
            Join WhatsApp Group
          </a>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Section
          title="Our Mission"
          className="shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            We aim to build a seamless academic platform where every student can access high-quality study materials without confusion or delay. Our mission is to create an environment where learning becomes simpler, faster, and more effective—whether it&apos;s preparing for exams, completing assignments, or understanding difficult topics. The Student Notes Portal is designed to bridge the knowledge gap between seniors and juniors so that no student feels lost or unprepared. By centralizing notes, question papers, and study guides, we want to empower students with the right resources at the right time.
          </p>
        </Section>

        <Section
          title="Who We Are"
          className="shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            This portal is more than just a collection of notes — it&apos;s a support system. Many students spend hours searching for the right PDFs, past papers, or topic explanations. By offering everything in one place, the Student Notes Portal reduces stress, saves time, and ensures that every student gets equal access to study materials. It represents a small effort from seniors that creates a big impact on juniors. From helping during exam season to assisting in clearing backlogs, this platform ensures that no student is left behind and that everyone has the tools to succeed.
          </p>
        </Section>
      </div>

      <Section
        title="Why This Portal Matters"
        className="mt-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Easy access to notes",
            "Previous year papers",
            "Built by seniors, for juniors",
            "Inspiring students to aim higher",
            "Have suggestions, want to help, or wish to contribute notes? Your input can help hundreds of students.",
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 shadow-md transition-all hover:scale-105 hover:shadow-lg dark:from-slate-800 dark:to-slate-700"
            >
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Our Vision"
        className="mt-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          We envision the Student Notes Portal becoming a complete academic companion for every student from their first day of college to their final semester. Our goal is to create a smart, evolving ecosystem where knowledge is not just stored but shared, updated, and continuously improved by seniors and juniors working together. In the coming years, we aim to integrate advanced features such as AI-powered study assistants, chapter-wise summaries, interactive quizzes, doubt-solving forums, and department-specific digital libraries. We want this platform to grow beyond simple notes — into a place where students can discuss ideas, prepare for exams strategically, and build confidence in every subject. At its core, our vision is to build a legacy: a student-driven hub that continues to support future batches long after we graduate. Every contribution today becomes a stepping stone for someone tomorrow. By nurturing this cycle of learning and guidance, we hope to inspire a culture where students uplift each other and academic success becomes a shared journey, not an individual struggle.
        </p>
      </Section>
    </main>
  );
}
