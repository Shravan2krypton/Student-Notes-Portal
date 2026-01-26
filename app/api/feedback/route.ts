import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { feedback } from "@/lib/schema";

const MAX_MESSAGE = 2000;
const MAX_CONTACT = 256;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawMsg = typeof body.message === "string" ? body.message.trim() : "";
    const rawContact = typeof body.contact === "string" ? body.contact.trim() : "";

    if (!rawMsg || rawMsg.length > MAX_MESSAGE) {
      return NextResponse.json(
        { error: "Message is required and must be at most 2000 characters." },
        { status: 400 }
      );
    }
    if (rawContact.length > MAX_CONTACT) {
      return NextResponse.json({ error: "Contact must be at most 256 characters." }, { status: 400 });
    }

    await db.insert(feedback).values({
      message: rawMsg,
      contact: rawContact || null,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
