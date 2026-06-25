// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const query = message.toLowerCase();

    const isUrdu = query.includes('kya') || query.includes('kaun') || query.includes('kaise') || 
                   query.includes('bhai') || query.includes('naam') || query.includes('kaam') || 
                   query.includes('hai') || query.includes('ho') || query.includes('tum') || 
                   query.includes('paisa') || query.includes('batao') || query.includes('rate');

    let reply = "";

    if (query.includes('test') || query.includes('hello') || query.includes('hi') || query.includes('checking')) {
      reply = isUrdu 
        ? "Matrix connection bilkul stable hai bhai! Chatbot perfect test ho raha hai. Koi bhi technical query transmit karo."
        : "Matrix pipeline connection stable! The chatbot test session is successful. Feel free to query regarding core development.";
    }
    
    else if (query.includes('who') || query.includes('intro') || query.includes('about') || query.includes('naam') || query.includes('kaun')) {
      reply = isUrdu 
        ? "Main Umar Ghafoor ka automated AI assistant node hoon. Umar ek Full-Stack Web Developer aur AI Automation Engineer hain jo high-performance application layers aur automated workflows design karte hain."
        : "I am Umar Ghafoor's automated AI assistant node. Umar is a Full-Stack Web Developer and AI Automation Engineer who designs high-performance application layers and automated workflows.";
    }

    else if (query.includes('tech') || query.includes('stack') || query.includes('skill') || query.includes('language') || query.includes('code') || query.includes('n8n')) {
      reply = isUrdu 
        ? "Core Stack Arsenal: Next.js, React, TypeScript, JavaScript, TailwindCSS, aur PostgreSQL. Visual pipeline automation ke liye custom n8n flows design kiye jate hain."
        : "Core Technical Arsenal: Next.js, React, TypeScript, JavaScript, TailwindCSS, and PostgreSQL. Visual pipeline syncing is handled via customized n8n automation engines.";
    }

    else if (query.includes('price') || query.includes('cost') || query.includes('rate') || query.includes('paisa') || query.includes('charge')) {
      reply = isUrdu 
        ? "Project parameters aur custom budget rates ke liye aap direct email (umar.ghafoor388@gmail.com) par rabta kar sakte hain ya niche diye gae secure form module se parameters send kar dein."
        : "For strict pricing parameters and project quotes, please send a direct business inquiry to umar.ghafoor388@gmail.com or transmit your scope using the contact terminal below.";
    }

    else {
      reply = isUrdu 
        ? "Transmission payload acknowledged. Mujhe development frameworks, n8n automated pipelines, ya service inquiry ke baare mein query transmit karein."
        : "Payload acknowledged. Please query the server node further regarding software architectures, automation pipelines, or technical project inquiries.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: "Pipeline routing error on server layer." }, { status: 500 });
  }
}