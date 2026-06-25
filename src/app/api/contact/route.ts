// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 1. Core Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required transmission payloads." }, { status: 400 });
    }

    const TARGET_EMAIL = "umar.ghafoor388@gmail.com";

    // 2. Executing Fetch using FormSubmit's strict default keys
    const emailCarrierResponse = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _subject: `🔥 New Portfolio Lead from ${name}`,
        name: name,      // Strict standard key required by FormSubmit
        email: email,    // Strict standard key required by FormSubmit
        message: message // Strict standard key required by FormSubmit
      })
    });

    if (emailCarrierResponse.ok) {
      console.log(`[MAIL ENGINE]: Strict payload verified and sent to ${TARGET_EMAIL}`);
      return NextResponse.json({ success: true, msg: "TRANSMISSION SECURED" });
    } else {
      return NextResponse.json({ error: "External mail carrier rejection." }, { status: 502 });
    }

  } catch (error) {
    return NextResponse.json({ error: "Internal transmission routing failure." }, { status: 500 });
  }
}