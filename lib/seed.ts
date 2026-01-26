import { config as loadEnv } from "dotenv";
import { inArray } from "drizzle-orm";
import { departments, resources, config } from "./schema";

const QUOTES = [
  { text: "Dream big, work hard, stay humble.", by: "Anonymous" },
  { text: "Consistency compounds. Show up, even on hard days.", by: "Senior's Note" },
  { text: "Your future self will thank you for starting today.", by: "Faculty Mentor" },
];

async function seed() {
  loadEnv({ path: ".env.local" });
  const { db } = await import("./db");

  console.log("Seeding...");

  await db.delete(resources);
  await db.delete(departments);

  await db.insert(departments).values([
    { slug: "computer", name: "Computer Engineering", description: "Programming, DS, OS, Networks", accentColor: "#38bdf8" },
    { slug: "ec", name: "Electronics & Communication Engineering", description: "Circuits, Signals, VLSI", accentColor: "#4ade80" },
  ]);

  const deptRows = await db.select().from(departments);
  const compId = deptRows.find((d) => d.slug === "computer")!.id;
  const ecId = deptRows.find((d) => d.slug === "ec")!.id;

  const compResources = [
    { sem: 1, notes: "https://drive.google.com/drive/folders/19ra3FkKQSXh5N_3tOuLua118yH3QIGGg?usp=drive_link", papers: "https://drive.google.com/drive/folders/1DGyDXma9HxfiBJchYZjhwfXYKTUSRbs4?usp=drive_link" },
    { sem: 2, notes: "https://drive.google.com/drive/folders/1Sdcfg4Rua-6NhQ6HuJuYO7bbbG9xTA27?usp=drive_link", papers: "https://drive.google.com/drive/folders/1P6SlYIt7KCk5pAHbNOlj5rIFsxdhbLyE?usp=drive_link" },
    { sem: 3, notes: "https://drive.google.com/drive/folders/1G1VD8H6GuSHq3JZGk3iMvg7w2X6i17Rq?usp=drive_link", papers: "https://drive.google.com/drive/folders/1k-2_hxg__alcBGe7GUsdPZtL0gVnD4tr?usp=drive_link" },
    { sem: 4, notes: "https://drive.google.com/drive/folders/1aBgNqSWbaXV6WAKpRU6vg-tX_iGXARhb?usp=drive_link", papers: "https://drive.google.com/drive/folders/14uLZDuQ55Qfv95BiS7e2GoTXVhhZezci?usp=drive_link" },
  ];
  for (const r of compResources) {
    const ord = r.sem === 1 ? "1st" : r.sem === 2 ? "2nd" : r.sem === 3 ? "3rd" : "4th";
    await db.insert(resources).values([
      { departmentId: compId, semester: r.sem, type: "notes", url: r.notes, label: `Open ${ord} Sem Notes` },
      { departmentId: compId, semester: r.sem, type: "papers", url: r.papers, label: `Open ${ord} Sem Papers` },
    ]);
  }

  const ecResources = [
    { sem: 1, notes: "https://drive.google.com/drive/folders/19ra3FkKQSXh5N_3tOuLua118yH3QIGGg?usp=drive_link", papers: "https://drive.google.com/drive/folders/1DGyDXma9HxfiBJchYZjhwfXYKTUSRbs4?usp=drive_link" },
    { sem: 2, notes: "https://drive.google.com/drive/folders/1Sdcfg4Rua-6NhQ6HuJuYO7bbbG9xTA27?usp=drive_link", papers: "https://drive.google.com/drive/folders/1P6SlYIt7KCk5pAHbNOlj5rIFsxdhbLyE?usp=drive_link" },
    { sem: 3, notes: "https://drive.google.com/drive/folders/1ou8gO_zNjAGBjOfXTZuwK_t3NeJfT4ul?usp=sharing", papers: "https://drive.google.com/drive/folders/1xE6b_8h_0fdT9AKUc01phNA7wOvjFIII?usp=sharing" },
    { sem: 4, notes: null as string | null, papers: null as string | null },
  ];
  for (const r of ecResources) {
    const ord = r.sem === 1 ? "1st" : r.sem === 2 ? "2nd" : r.sem === 3 ? "3rd" : "4th";
    await db.insert(resources).values([
      { departmentId: ecId, semester: r.sem, type: "notes", url: r.notes, label: r.notes ? `Open ${ord} Sem Notes` : "Coming soon" },
      { departmentId: ecId, semester: r.sem, type: "papers", url: r.papers, label: r.papers ? `Open ${ord} Sem Papers` : "Coming soon" },
    ]);
  }

  await db.delete(config).where(inArray(config.key, ["whatsapp_number", "whatsapp_message", "contact_page_message", "quotes"]));
  await db.insert(config).values([
    { key: "whatsapp_number", value: "919904427095" },
    { key: "whatsapp_message", value: "Hello senior, I want to ask about ...." },
    { key: "contact_page_message", value: "Click the button below to message me directly on WhatsApp." },
    { key: "quotes", value: JSON.stringify(QUOTES) },
  ]);

  console.log("Seed done.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
