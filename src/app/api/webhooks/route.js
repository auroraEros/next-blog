// app/api/clerk-webhook/route.js
import { Webhook } from 'svix';
import { headers } from 'next/headers';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return Response.json(
      { error: 'WEBHOOK_SECRET is missing from environment variables' },
      { status: 500 }
    );
  }

  try {
    // Get headers
    const headerPayload = headers();
    const svixHeaders = {
      'svix-id': headerPayload.get('svix-id'),
      'svix-timestamp': headerPayload.get('svix-timestamp'),
      'svix-signature': headerPayload.get('svix-signature'),
    };

    // Verify we have all required headers
    if (!svixHeaders['svix-id'] || !svixHeaders['svix-timestamp'] || !svixHeaders['svix-signature']) {
      return Response.json(
        { error: 'Missing required Svix headers' },
        { status: 400 }
      );
    }

    // Get payload
    const payload = await req.json();
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(JSON.stringify(payload), svixHeaders);

    // Process event
    console.log(`Webhook received: ${evt.type}`, evt.data);

    // Handle specific events
    switch (evt.type) {
      case 'user.created':
        console.log('New user created:', evt.data.id);
        break;
      case 'user.updated':
        console.log('User updated:', evt.data.id);
        break;
      default:
        console.log('Unhandled event type:', evt.type);
    }

    return Response.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('Webhook processing error:', err);
    return Response.json(
      { error: 'Invalid webhook signature' },
      { status: 400 }
    );
  }
}