import { db } from "../lib/db";
import { departments } from "../lib/schema";

async function updateDepartments() {
  console.log("Updating existing departments with icons...");
  
  // Update computer department
  await db
    .update(departments)
    .set({ icon: "💻" })
    .where(eq(departments.slug, "computer"));
  
  // Update ec department
  await db
    .update(departments)
    .set({ icon: "📡" })
    .where(eq(departments.slug, "ec"));
  
  console.log("Departments updated successfully!");
}

import { eq } from "drizzle-orm";

updateDepartments().catch(console.error);
