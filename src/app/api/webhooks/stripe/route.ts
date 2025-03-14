import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { successResponse, errorResponse } from '@/lib/api';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      throw new Error('No signature found');
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (!userId) {
          throw new Error('No user ID found in session metadata');
        }

        // Update user subscription status
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscription: {
              plan: 'pro',
              status: 'active',
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            },
          },
        });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by Stripe customer ID
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          throw new Error('No user found for customer ID');
        }

        // Update subscription status based on Stripe subscription status
        const status = subscription.status === 'active' ? 'active' : 'inactive';
        const plan = subscription.items.data[0].price.nickname?.toLowerCase() || 'pro';

        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscription: {
              plan,
              status,
              expiresAt: new Date(subscription.current_period_end * 1000),
            },
          },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by Stripe customer ID
        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          throw new Error('No user found for customer ID');
        }

        // Update user subscription status to inactive
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
        break;
      }
    }

    return successResponse({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return errorResponse(error as Error);
  }
}
