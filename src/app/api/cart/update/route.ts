import { NextRequest, NextResponse } from 'next/server';
import { updateCartLine } from '@/actions/cart';

export async function POST(request: NextRequest) {
  try {
    const { orderLineId, quantity } = await request.json() as {
      orderLineId: string;
      quantity: number;
    };

    if (!orderLineId || typeof quantity !== 'number') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const result = await updateCartLine(orderLineId, quantity);
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST /api/cart/update:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
