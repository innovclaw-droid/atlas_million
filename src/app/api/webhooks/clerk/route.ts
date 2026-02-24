import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  const headersList = await headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Verification failed", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0]?.email_address;

    if (email) {
      await db.user.create({
        data: {
          clerkId: id,
          email,
          name: [first_name, last_name].filter(Boolean).join(" ") || null,
        },
      });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const email = email_addresses[0]?.email_address;

    if (email) {
      await db.user.upsert({
        where: { clerkId: id },
        update: {
          email,
          name: [first_name, last_name].filter(Boolean).join(" ") || null,
        },
        create: {
          clerkId: id,
          email,
          name: [first_name, last_name].filter(Boolean).join(" ") || null,
        },
      });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (id) {
      await db.user.delete({ where: { clerkId: id } }).catch(() => {});
    }
  }

  return new NextResponse(null, { status: 200 });
}
