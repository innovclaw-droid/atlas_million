import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { courseId, plan } = body;

    // Get or create user
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if already enrolled
    const existingEnrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: { userId: user.id, courseId },
      },
    });

    if (existingEnrollment) {
      return new NextResponse("Already enrolled", { status: 400 });
    }

    // Get or create Stripe customer
    let stripeCustomerId = user.stripeId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;
      await db.user.update({
        where: { id: user.id },
        data: { stripeId: customer.id },
      });
    }

    // Build line items based on plan
    const lineItems: any[] = [];
    
    const course = await db.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // One-time course payment
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: course.title,
          description: `Full access to ${course.title}`,
        },
        unit_amount: plan === "premium" ? 69700 : 49700,
      },
      quantity: 1,
    });

    // Add community subscription if applicable
    const mode = plan === "course_only" ? "payment" : "subscription";
    
    if (plan !== "course_only") {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Community Membership",
            description: "Monthly community access + weekly office hours",
          },
          unit_amount: 4900,
          recurring: { interval: "month" as const },
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: mode as any,
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/courses/${courseId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        courseId,
        plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
