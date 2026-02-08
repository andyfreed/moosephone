import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabase } from "@/lib/supabase";
import { PHONE_MODELS, type PhoneExtension, type PhoneModelId } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { model, quantity, extensions } = body as {
      model: PhoneModelId;
      quantity: number;
      extensions: PhoneExtension[];
    };

    const phone = PHONE_MODELS.find((m) => m.id === model);
    if (!phone) {
      return NextResponse.json({ error: "Invalid phone model" }, { status: 400 });
    }

    if (quantity < 1 || quantity > 50) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    if (extensions.length !== quantity) {
      return NextResponse.json(
        { error: "Extensions count must match quantity" },
        { status: 400 }
      );
    }

    const totalPrice = phone.priceMonthly * quantity;

    // Create pending order in Supabase
    const supabase = getSupabase();
    const { data: order, error: dbError } = await supabase
      .from("orders")
      .insert({
        model,
        quantity,
        extensions,
        price_per_phone: phone.priceMonthly,
        total_price: totalPrice,
        status: "pending",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB error creating order:", dbError);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            product_data: {
              name: `${phone.name} - Cloud Phone Service`,
              description: `Pre-configured ${phone.name} with cloud phone service. ${quantity} phone(s).`,
            },
            unit_amount: Math.round(phone.priceMonthly * 100),
          },
          quantity,
        },
      ],
      metadata: {
        order_id: order.id,
        model,
        quantity: String(quantity),
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/configure?model=${model}`,
    });

    // Store stripe session ID on the order
    await supabase
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
