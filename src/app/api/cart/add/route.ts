import { NextRequest, NextResponse } from 'next/server';
import { addToCart } from '@/actions/cart';

export async function POST(request: NextRequest) {
  try {
    const { productVariantId, quantity } = await request.json() as {
      productVariantId: string;
      quantity: number;
    };

    if (!productVariantId || typeof quantity !== 'number') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const result = await addToCart(productVariantId, quantity);
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST /api/cart/add:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
