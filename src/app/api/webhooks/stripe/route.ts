import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const userId = session.metadata?.userId;
    const courseId = session.metadata?.courseId;

    if (userId && courseId) {
      // Create enrollment
      await db.enrollment.upsert({
        where: {
          userId_courseId: { userId, courseId },
        },
        update: {},
        create: {
          userId,
          courseId,
        },
      });
    }

    // If subscription, save it
    if (session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      if (userId) {
        await db.subscription.upsert({
          where: { stripeSubId: subscription.id },
          update: {
            status: subscription.status,
            currentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
          create: {
            userId,
            stripeSubId: subscription.id,
            plan: session.metadata?.plan || "community",
            status: subscription.status,
            currentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        });
      }
    }
  }

  // Handle subscription updates
  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    await db.subscription.update({
      where: { stripeSubId: subscription.id },
      data: {
        status: subscription.status,
        currentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  // Handle subscription cancellation
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    await db.subscription.update({
      where: { stripeSubId: subscription.id },
      data: { status: "canceled" },
    });
  }

  return new NextResponse(null, { status: 200 });
}
