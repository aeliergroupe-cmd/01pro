import { NextRequest, NextResponse } from 'next/server';
import { removeFromCart } from '@/actions/cart';

export async function POST(request: NextRequest) {
  try {
    const { orderLineId } = await request.json() as { orderLineId: string };

    if (!orderLineId) {
      return NextResponse.json({ error: 'Missing orderLineId' }, { status: 400 });
    }

    const result = await removeFromCart(orderLineId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST /api/cart/remove:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
