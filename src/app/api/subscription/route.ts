import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { validateRequest, successResponse, errorResponse, ApiError } from '@/lib/api';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);

    const subscription = await prisma.user.findUnique({
      where: { id: user.id },
      select: { subscription: true },
    });

    return successResponse(subscription?.subscription);
  } catch (error) {
    return errorResponse('Failed to fetch subscription', 500);
  }
}

export async function POST(_req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = validateRequest(session);
    const body = await _req.json();
    const { priceId } = body;

    // Create or retrieve Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
      },
    });

    return successResponse({ url: checkoutSession.url });
  } catch (error) {
    return errorResponse('Failed to update subscription', 500);
  }
}

export async function DELETE(_req: NextRequest) {
  try {
    const authSession = await getServerSession(authOptions);
    const user = validateRequest(authSession);

    if (!user.stripeCustomerId) {
      throw new ApiError(400, 'No active subscription found');
    }

    // Cancel subscription in Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'active',
    });

    if (subscriptions.data.length > 0) {
      await stripe.subscriptions.cancel(subscriptions.data[0].id);
    }

    // Update user subscription status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscription: {
          plan: 'free',
          status: 'inactive',
          expiresAt: new Date(),
        },
      },
    });

    return successResponse({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    return errorResponse(error as Error);
  }
}
