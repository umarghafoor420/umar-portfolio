// src/app/page.tsx
'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import { developerProfile, projectsData } from "@/config/portfolioData";

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  
  // Chain reaction state for Concept section blocks
  const [isChainActive, setIsChainActive] = useState(false);
  
  // Mobile Tap state container to reveal sticky notes on touch devices
  const [activeBlockNoteId, setActiveBlockNoteId] = useState<number | null>(null);

  // Real-time smooth scroll tracking states
  const [worksScrollProgress, setScrollProgress] = useState<number[]>([0, 0, 0]);
  const [automationScrollProgress, setAutomationScrollProgress] = useState<number>(0);

  // Live Chat AI Assistant Terminal Console States
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: "Assalam-o-Alaikum! I am Umar Ghafoor's Live AI Assistant. Ask me anything about Umar's full-stack development skills, n8n automated pipelines, or work experience! (You can ask in English or Roman Urdu)" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Human-Friendly Contact Form Terminal Feedback States
  const [contactLogs, setContactLogs] = useState<string[]>([]);
  const [isFormProcessing, setIsFormProcessing] = useState(false);
  const contactTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping]);

  useEffect(() => {
    if (contactTerminalRef.current) {
      contactTerminalRef.current.scrollTo({ top: contactTerminalRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [contactLogs]);

  // Deep Viewport Scroll Matrix Engine (Slow & Elegant Transitions)
  useEffect(() => {
    setIsMounted(true);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleGlobalScrollMatrix = () => {
      const windowHeight = window.innerHeight;
      
      const entryThreshold = windowHeight * 0.90;
      const completeThreshold = windowHeight * 0.25;
      const totalTrackRange = entryThreshold - completeThreshold;

      // 1. Works Section Cards Progress Tracking
      const updatedWorks = projectsData.map((_, idx) => {
        const element = document.getElementById(`project-card-${idx}`);
        if (!element) return 0;
        const rect = element.getBoundingClientRect();
        const currentScrollOffset = entryThreshold - rect.top;
        return Math.max(0, Math.min(1, currentScrollOffset / totalTrackRange));
      });
      setScrollProgress(updatedWorks);

      // 2. Automation Container Progress Tracking
      const automationElement = document.getElementById("automation-container");
      if (automationElement) {
        const autoRect = automationElement.getBoundingClientRect();
        const currentAutoOffset = entryThreshold - autoRect.top;
        setAutomationScrollProgress(Math.max(0, Math.min(1, currentAutoOffset / totalTrackRange)));
      }
    };

    window.addEventListener('scroll', handleGlobalScrollMatrix);
    setTimeout(handleGlobalScrollMatrix, 100);

    return () => window.removeEventListener('scroll', handleGlobalScrollMatrix);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const suggestedQuestions = [
    "Can you share your pricing for a small website?",
    "I'd like a quote — how do I contact you with my budget?"
  ];

  const getYoutubeLink = (value: string) => {
    if (!value) return value;
    if (value.includes("youtube.com/embed/") || value.includes("youtu.be/")) {
      return value;
    }
    return `https://www.youtube.com/embed/${value}`;
  };

  const getYoutubeId = (value: string) => {
    if (!value) return '';
    const embedMatch = value.match(/youtube\.com\/embed\/([^?&/]+)/);
    if (embedMatch) return embedMatch[1];
    const vMatch = value.match(/[?&]v=([^?&]+)/);
    if (vMatch) return vMatch[1];
    const shortMatch = value.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return shortMatch[1];
    return value;
  };

  // FLUID PROPORTIONAL GRAPHICS ENGINE FOR RESPONSIVE BLOCKS WITH BLUEPRINT LABELS
  const architecturalBlocks = useMemo(() => [
    {
      id: 0,
      label: "BLK_01 / L0",
      note: "⚡ TIMING_CORE\n\n100% On-Time delivery of production-ready web platforms without breaking milestones.",
      baseTransform: "hover:-translate-y-1.5 hover:scale-[1.02]",
      activeTransform: "-translate-y-1.5 scale-[1.02]",
      child: (active: boolean) => (
        <div className={`w-[40%] h-[40%] border border-dashed rounded-xs transition-all duration-300 ${active ? 'border-brand-gold/60 scale-110' : 'border-neutral-800/40 group-hover:border-brand-gold/60 group-hover:scale-110'}`} />
      )
    },
    {
      id: 1,
      label: "BLK_02 / L1",
      note: "💻 FULL_STACK_DEV\n\nProficient in compiling optimized front-ends with Next.js & robust back-end node architectures.",
      baseTransform: "hover:-translate-y-1.5 hover:scale-[1.02] flex flex-col justify-end",
      activeTransform: "-translate-y-1.5 scale-[1.02] flex flex-col justify-end",
      child: (active: boolean) => (
        <div className={`w-full border-t rounded-b-sm transition-all duration-300 ${active ? 'h-2/3 bg-brand-gold/20 border-brand-gold' : 'h-1/3 bg-neutral-950/60 border-neutral-900/50 group-hover:h-2/3 group-hover:bg-brand-gold/20 group-hover:border-brand-gold'}`} />
      )
    },
    {
      id: 2,
      label: "CORE_NODE // LOCK",
      note: "🔄 AI_AUTOMATION\n\nOrchestrating advanced logical pipelines using n8n engines, cron-jobs & live webhooks.",
      baseTransform: "transform -rotate-2 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.02]",
      activeTransform: "-translate-y-2 rotate-0 scale-[1.02]",
      child: (active: boolean) => (
        <div className={`w-[30%] h-[30%] border rounded-xs transition-all duration-300 ${active ? 'bg-brand-gold shadow-[0_0_22px_#f59e0b] border-transparent scale-105' : 'bg-neutral-900 border-neutral-800 group-hover:bg-brand-gold hover:shadow-[0_0_22px_#f59e0b] group-hover:border-transparent'}`} />
      )
    },
    {
      id: 3,
      label: "BLK_03 / L0",
      note: "🛠️ CLEAN_ARCH\n\nWriting clean, scalable, and highly documented modular code-bases to ensure seamless long-term scaling.",
      baseTransform: "hover:-translate-y-1.5 hover:scale-[1.02]",
      activeTransform: "-translate-y-1.5 scale-[1.02]",
      child: (active: boolean) => (
        <div className="w-[35%] h-[35%] relative flex items-center justify-center">
          <div className={`w-full h-full border absolute rounded-xs translate-x-0.5 translate-y-0.5 transition-colors duration-300 ${active ? 'border-brand-gold/40' : 'border-neutral-800/40 group-hover:border-brand-gold/40'}`} />
          <div className={`w-full h-full border absolute rounded-xs -translate-x-0.5 -translate-y-0.5 transition-all duration-300 ${active ? 'border-brand-gold bg-neutral-950/20' : 'border-neutral-800/20 group-hover:border-brand-gold group-hover:bg-neutral-950/20'}`} />
        </div>
      )
    },
    {
      id: 4,
      label: "BLK_04 / CORE",
      note: "📦 DATABASE_INTEG\n\nStructuring high-integrity query logic for Postgres, Supabase, and heavy non-relational MongoDB instances.",
      baseTransform: "hover:-translate-y-1.5 hover:scale-[1.02]",
      activeTransform: "-translate-y-1.5 scale-[1.02]",
      child: (active: boolean) => (
        <div className={`w-[45%] h-[18%] border rounded-xs transition-all duration-300 ${active ? 'rotate-45 bg-brand-gold/20 border-brand-gold' : 'bg-neutral-950/40 border-neutral-900/60 group-hover:rotate-45 group-hover:bg-brand-gold/20 group-hover:border-brand-gold'}`} />
      )
    },
    {
      id: 5,
      label: "BLK_05 / TOP",
      note: "🎨 IMMERSIVE_UI\n\nDeveloping cinematic web systems using Tailwind CSS, fluid custom CSS sheet tracking, and 3D UI physics.",
      baseTransform: "hover:-translate-y-1.5 hover:scale-[1.02] flex flex-col justify-start",
      activeTransform: "-translate-y-1.5 scale-[1.02] flex flex-col justify-start",
      child: (active: boolean) => (
        <div className={`h-[20%] w-full border-b rounded-t-sm transition-all duration-300 ${active ? 'bg-brand-gold/20 border-brand-gold' : 'bg-neutral-950/40 border-b border-neutral-900/40 group-hover:bg-brand-gold/20 group-hover:border-brand-gold'}`} />
      )
    },
    {
      id: 6,
      label: "BLK_06 / FLOAT",
      note: "🔒 SECURE_GATEWAYS\n\nImplementing advanced client validation, route handlers, and protected endpoints for API nodes.",
      baseTransform: "hover:-translate-y-1.5 -rotate-3 hover:rotate-0 hover:scale-[1.02]",
      activeTransform: "-translate-y-1.5 rotate-0 scale-[1.02]",
      child: (active: boolean) => (
        <div className={`w-[40%] h-[40%] border rounded-xs flex items-center justify-center transition-colors duration-300 ${active ? 'border-brand-gold/50' : 'border-neutral-900/30 group-hover:border-brand-gold/50'}`}>
          <div className={`w-[50%] h-[50%] border rounded-xs transition-all duration-300 ${active ? 'bg-brand-gold/30 border-brand-gold shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'bg-neutral-900/50 border-neutral-900/50 group-hover:bg-brand-gold/30 group-hover:border-brand-gold group-hover:shadow-[0_0_10px_rgba(245,158,11,0.4)]'}`} />
        </div>
      )
    },
    {
      id: 7,
      label: "BLK_07 / END",
      note: "🚀 PERFORMANCE_TUNED\n\nOptimizing web applications to achieve 100% Google Lighthouse score metrics and fluid 60fps renders.",
      baseTransform: "hover:-translate-y-1.5 hover:scale-[1.02]",
      activeTransform: "-translate-y-1.5 scale-[1.02]",
      child: (active: boolean) => (
        <div className={`w-[26%] h-[20%] border rounded-xs transition-all duration-300 ${active ? 'border-brand-gold bg-brand-gold/10 shadow-inner' : 'border-neutral-900/50 group-hover:border-brand-gold bg-brand-gold/10 group-hover:shadow-inner'}`} />
      )
    }
  ], []);

  // CLIENT-FRIENDLY TERMINAL RECONCILIATION DISPATCH LOGIC
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormProcessing(true);
    setFormStatus('SENDING MESSAGE...');
    setContactLogs([]);

    const printLog = async (text: string, delay: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setContactLogs(prev => [...prev, text]);
          resolve();
        }, delay);
      });
    };

    await printLog(`[⚙️ STATUS] Initializing secure connection gateway...`, 100);
    await printLog(`[📝 VERIFY] Formatting details for client "${formData.name.toUpperCase()}"...`, 450);
    await printLog(`[🔒 SECURITY] Protecting data channel parameters...`, 500);
    await printLog(`[🚀 SENDING] Routing message directly to Umar Ghafoor's database...`, 650);

    try {
      const response = await fetch('https://formsubmit.co/ajax/umar.ghafoor388@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          "Client Name": formData.name,
          "Client Email": formData.email,
          "Message Scope": formData.message,
          "_replyto": formData.email,
          "_subject": `⚡ New Portfolio Lead from ${formData.name}`
        }),
      });

      if (response.ok) {
        await printLog(`[✅ DELIVERED] Connection successful! Your message has safely reached Umar.`, 400);
        await printLog(`[🤖 UMAR's AI CORE] "Assalam-o-Alaikum ${formData.name}! Thank you for your message. I have received your requirement scope. I will personally review your project details and get back to you on ${formData.email} as soon as possible!"`, 600);
        setFormStatus('SENT SUCCESSFULLY ✅');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setContactLogs(prev => [...prev, `[❌ ERROR] Unable to deliver message. Please check connection and try again.`]);
        setFormStatus('SUBMIT ERROR ❌');
      }
    } catch (err) {
      setContactLogs(prev => [...prev, `[❌ FAILURE] Communication network channel break.`]);
      setFormStatus('SERVER ERROR ❌');
    } finally {
      setIsFormProcessing(false);
    }
  };

  // HIGH-TECH INTUATIVE DUAL-LANGUAGE INTELLIGENT CHATBOT ENGINE
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiTyping) return;
    await sendChatQuery(chatInput);
  };

  const sendChatQuery = async (rawQuery: string) => {
    const query = rawQuery.toLowerCase().trim();
    setChatMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: rawQuery }]);
    setChatInput('');
    setIsAiTyping(true);

    await new Promise(resolve => setTimeout(resolve, 600));

    // Pricing-related direct routing
    if (query.match(/price|pricing|cost|budget|estimate|qeemat|kitna/)) {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "For project pricing and estimates, please use the Contact section below — you can share your budget and requirements there and I'll get back to you with a tailored quote." }]);
      setIsAiTyping(false);
      // scroll user to contact section for convenience
      scrollToSection('contact');
      return;
    }

    let responseText = "";

    const isUrdu = query.match(/(kaam|kam|kya|hai|hain|bhai|tajurba|umar|naam|nam|karo|krdo|kaise|kese|skills|shuru)/g);

    if (isUrdu) {
      if (query.includes("naam") || query.includes("nam") || query.includes("you") || query.includes("kaun") || query.includes("kon")) {
        responseText = "Mera naam Umar's AI Core hai! Main aapko Umar Ghafoor ke professional projects aur full-stack development skills ke baare mein bata sakta hoon.";
      } else if (query.includes("kaam") || query.includes("kam") || query.includes("field") || query.includes("skills") || query.includes("expert")) {
        responseText = "Umar Ghafoor ek professional Full-Stack Web Developer aur AI Automation Expert hain. Wo HTML, CSS, JavaScript, TypeScript, Tailwind CSS, Next.js, Node.js aur databases (Postgres/MongoDB) mein expert hain.";
      } else if (query.includes("automation") || query.includes("n8n") || query.includes("pipeline") || query.includes("bot")) {
        responseText = "Umar business automation mein mahir hain. Wo n8n tool ka istemaal karke customized workflows, CRM dispatch systems, webhooks aur database synchronization pipelines design karte hain.";
      } else if (query.includes("experience") || query.includes("tajurba") || query.includes("work") || query.includes("projects")) {
        responseText = "Umar ko premium modern web systems banane ka zabardast experience hai. Unhone NextGen Institute jaise institutional clients ke liye fully functional dynamic websites successfully delivered ki hain.";
      } else {
        responseText = "Mera paas is specific sawal ka jawab nahi hai. Agar aap Umar se rabta karna chahte hain ya project discuss karna chahte hain, toh please neche diye gaye 'Contact' section se apna message transmit kar dein!";
      }
    } else {
      if (query.includes("name") || query.includes("who") || query.includes("you")) {
        responseText = "I am Umar Ghafoor's Core AI Assistant. I can help you understand Umar's software services, development frameworks, and skills.";
      } else if (query.includes("skills") || query.includes("framework") || query.includes("next") || query.includes("tech")) {
        responseText = "Umar specializes across the full-stack continuum: HTML, CSS, JavaScript, TypeScript, Tailwind CSS, Next.js, and backend databases like PostgreSQL, Supabase, and MongoDB.";
      } else if (query.includes("automation") || query.includes("n8n") || query.includes("workflow")) {
        responseText = "He is an AI Automation specialist proficient in building backend infrastructure using n8n. He designs seamless automation pipelines, webhooks parsing, and server routers.";
      } else if (query.includes("experience") || query.includes("portfolio") || query.includes("projects")) {
        responseText = "Umar has successfully engineered high-performance architecture for global and institutional clients, including the live infrastructure for NextGen Institute.";
      } else {
        responseText = "I don't have an answer for this query in my matrix. If you want to talk to Umar, please drop your requirements or message in the Contact section directly below this module!";
      }
    }

    setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: responseText }]);
    setIsAiTyping(false);
  };

  if (!isMounted) return <div className="min-h-screen bg-[#0b0c0e]" />;

  const isAutomationPulseActive = automationScrollProgress > 0.45;

  return (
    <main className="min-w-[280px] min-h-screen bg-brand-charcoal text-foreground bg-grid-pattern p-3 sm:p-6 md:p-12 selection:bg-brand-gold selection:text-brand-charcoal antialiased overflow-x-hidden">
      
      {/* PERFECT UNBROKEN LIQUID SHIMMER WIRELESS CIRCUIT KEYFRAMES */}
      <style>{`
        @keyframes cleanSnakeCrawl { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 2000; } }
        
        @keyframes loopInputsSection {
          0% { border-color: #262626; box-shadow: none; }
          4%, 18% { border-color: #f59e0b; box-shadow: inset 0 0 10px rgba(245,158,11,0.2), 0 0 8px rgba(245,158,11,0.15); }
          24%, 100% { border-color: #262626; box-shadow: none; }
        }
        @keyframes loopTrackLine1 {
          0%, 14% { background: #262626; }
          18%, 24% { background: linear-gradient(90deg, #f59e0b, #fff); filter: drop-shadow(0 0 4px #f59e0b); }
          28%, 100% { background: #262626; filter: none; }
        }
        @keyframes loopJunctionBullet1 {
          0%, 18% { background: #171717; border-color: #262626; box-shadow: none; scale: 1; }
          21%, 27% { background: #f59e0b; border-color: #ffffff; box-shadow: 0 0 15px #f59e0b, inset 0 0 4px #fff; scale: 1.25; }
          31%, 100% { background: #171717; border-color: #262626; box-shadow: none; scale: 1; }
        }
        @keyframes loopTrackLine2 {
          0%, 24% { background: #262626; }
          27%, 34% { background: linear-gradient(90deg, #f59e0b, #fff); filter: drop-shadow(0 0 4px #f59e0b); }
          38%, 100% { background: #262626; filter: none; }
        }
        @keyframes loopMatrixSection {
          0%, 30% { border-color: #262626; box-shadow: none; }
          34%, 48% { border-color: #f59e0b; box-shadow: inset 0 0 10px rgba(245,158,11,0.2), 0 0 8px rgba(245,158,11,0.15); }
          54%, 100% { border-color: #262626; box-shadow: none; }
        }
        @keyframes loopTrackLine3 {
          0%, 44% { background: #262626; }
          48%, 54% { background: linear-gradient(90deg, #f59e0b, #fff); filter: drop-shadow(0 0 4px #f59e0b); }
          58%, 100% { background: #262626; filter: none; }
        }
        @keyframes loopJunctionBullet2 {
          0%, 48% { background: #171717; border-color: #262626; box-shadow: none; scale: 1; }
          51%, 57% { background: #f59e0b; border-color: #ffffff; box-shadow: 0 0 15px #f59e0b, inset 0 0 4px #fff; scale: 1.25; }
          61%, 100% { background: #171717; border-color: #262626; box-shadow: none; scale: 1; }
        }
        @keyframes loopTrackLine4 {
          0%, 54% { background: #262626; }
          57%, 64% { background: linear-gradient(90deg, #f59e0b, #fff); filter: drop-shadow(0 0 4px #f59e0b); }
          68%, 100% { background: #262626; filter: none; }
        }
        @keyframes loopOrchestratorSection {
          0%, 60% { border-color: #262626; box-shadow: none; }
          64%, 78% { border-color: #f59e0b; box-shadow: inset 0 0 10px rgba(245,158,11,0.2), 0 0 8px rgba(245,158,11,0.15); }
          84%, 100% { border-color: #262626; box-shadow: none; }
        }
        @keyframes loopTrackLine5 {
          0%, 74% { background: #262626; }
          78%, 84% { background: linear-gradient(90deg, #f59e0b, #fff); filter: drop-shadow(0 0 4px #f59e0b); }
          88%, 100% { background: #262626; filter: none; }
        }
        @keyframes loopJunctionBullet3 {
          0%, 78% { background: #171717; border-color: #262626; box-shadow: none; scale: 1; }
          81%, 87% { background: #f59e0b; border-color: #ffffff; box-shadow: 0 0 15px #f59e0b, inset 0 0 4px #fff; scale: 1.25; }
          91%, 100% { background: #171717; border-color: #262626; box-shadow: none; scale: 1; }
        }
        @keyframes loopTrackLine6 {
          0%, 84% { background: #262626; }
          87%, 94% { background: linear-gradient(90deg, #f59e0b, #fff); filter: drop-shadow(0 0 4px #f59e0b); }
          98%, 100% { background: #262626; filter: none; }
        }
        @keyframes loopCRMSection {
          0%, 86% { border-color: #262626; box-shadow: none; }
          90%, 98% { border-color: #f59e0b; box-shadow: inset 0 0 10px rgba(245,158,11,0.2), 0 0 8px rgba(245,158,11,0.15); }
          100% { border-color: #262626; box-shadow: none; }
        }

        .track-inputs-perimeter { animation: loopInputsSection 6s infinite linear; }
        .track-wire-1 { animation: loopTrackLine1 6s infinite linear; }
        .track-bullet-1 { animation: loopJunctionBullet1 6s infinite linear; }
        .track-wire-2 { animation: loopTrackLine2 6s infinite linear; }
        .track-matrix-perimeter { animation: loopMatrixSection 6s infinite linear; }
        .track-wire-3 { animation: loopTrackLine3 6s infinite linear; }
        .track-bullet-2 { animation: loopJunctionBullet2 6s infinite linear; }
        .track-wire-4 { animation: loopTrackLine4 6s infinite linear; }
        .track-orchestrator-perimeter { animation: loopOrchestratorSection 6s infinite linear; }
        .track-wire-5 { animation: loopTrackLine5 6s infinite linear; }
        .track-bullet-3 { animation: loopJunctionBullet3 6s infinite linear; }
        .track-wire-6 { animation: loopTrackLine6 6s infinite linear; }
        .track-crm-perimeter { animation: loopCRMSection 6s infinite linear; }

        @keyframes contactLaserBorder { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 1600; } }

        @keyframes syncWhatsApp { 0%, 1% { color: #9ca3af; text-shadow: none; } 2%, 58% { color: #f59e0b; text-shadow: 0 0 14px #f59e0b; } 59%, 100% { color: #9ca3af; text-shadow: none; } }
        @keyframes syncLinkedIn { 0%, 6% { color: #9ca3af; text-shadow: none; } 7%, 64% { color: #f59e0b; text-shadow: 0 0 14px #f59e0b; } 65%, 100% { color: #9ca3af; text-shadow: none; } }
        @keyframes syncContact { 0%, 13% { color: #9ca3af; text-shadow: none; } 14%, 71% { color: #f59e0b; text-shadow: 0 0 14px #f59e0b; } 72%, 100% { color: #9ca3af; text-shadow: none; } }
        @keyframes syncAutomation { 0%, 19% { color: #9ca3af; text-shadow: none; } 20%, 77% { color: #f59e0b; text-shadow: 0 0 14px #f59e0b; } 78%, 100% { color: #9ca3af; text-shadow: none; } }
        @keyframes syncWorks { 0%, 25% { color: #9ca3af; text-shadow: none; } 26%, 83% { color: #f59e0b; text-shadow: 0 0 14px #f59e0b; } 84%, 100% { color: #9ca3af; text-shadow: none; } }
        @keyframes syncConcept { 0%, 31% { color: #9ca3af; text-shadow: none; } 32%, 90% { color: #f59e0b; text-shadow: 0 0 14px #f59e0b; } 91%, 100% { color: #9ca3af; text-shadow: none; } }
        @keyframes syncMainLogo { 0%, 5% { color: #f59e0b; text-shadow: 0 0 20px #f59e0b; } 6%, 35% { color: #e5e7eb; text-shadow: none; } 36%, 100% { color: #f59e0b; text-shadow: 0 0 20px #f59e0b; } }
        
        .animate-whatsapp-sync { animation: syncWhatsApp 7s linear infinite; }
        .animate-linkedin-sync { animation: syncLinkedIn 7s linear infinite; }
        .animate-contact-sync { animation: syncContact 7s linear infinite; }
        .animate-automation-sync { animation: syncAutomation 7s linear infinite; }
        .animate-works-sync { animation: syncWorks 7s linear infinite; }
        .animate-concept-sync { animation: syncConcept 7s linear infinite; }
        .animate-logo-sync { animation: syncMainLogo 7s linear infinite; }
      `}</style>

      {/* FIXED NAVBAR */}
      <header className="max-w-5xl mx-auto bg-brand-charcoal/95 backdrop-blur-md p-3 sm:p-5 mb-8 md:mb-12 flex justify-between items-center sticky top-2 sm:top-4 z-50 rounded-sm border border-neutral-900/60 h-[54px] sm:h-[62px]">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="simpleCleanSnakeGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="90%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
            </defs>
            <rect x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" fill="none" rx="3" stroke="url(#simpleCleanSnakeGrad)" strokeWidth="4" strokeLinecap="round" className="blur-[3px] opacity-80" style={{ strokeDasharray: '580 1420', animation: 'cleanSnakeCrawl 7s linear infinite' }} />
            <rect x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" fill="none" rx="3" stroke="url(#simpleCleanSnakeGrad)" strokeWidth="2.5" strokeLinecap="round" style={{ strokeDasharray: '580 1420', animation: 'cleanSnakeCrawl 7s linear infinite' }} />
          </svg>
        </div>

        <div className="text-[11px] sm:text-sm md:text-base font-mono font-black tracking-widest z-10 relative animate-logo-sync select-none">
          {`<${developerProfile.name.toUpperCase()} //>`}
        </div>
        
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-x-6 text-[11px] font-mono uppercase tracking-wider z-10">
          <button onClick={() => scrollToSection('concept')} className="hover:text-brand-gold cursor-pointer bg-transparent border-none animate-concept-sync">/Concept</button>
          <button onClick={() => scrollToSection('works')} className="hover:text-brand-gold cursor-pointer bg-transparent border-none animate-works-sync">/Works</button>
          <button onClick={() => scrollToSection('automation')} className="hover:text-brand-gold cursor-pointer bg-transparent border-none animate-automation-sync">/Automation</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-brand-gold cursor-pointer bg-transparent border-none animate-contact-sync">/Contact</button>
        </nav>

        <div className="hidden md:flex items-center space-x-4 text-[10px] font-mono z-10 relative">
          <a href={developerProfile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors font-bold animate-linkedin-sync">// LINKEDIN</a>
          <a href={`https://wa.me/${developerProfile.socials.whatsapp}`} target="_blank" rel="noopener noreferrer" className="transition-colors font-bold animate-whatsapp-sync">// WHATSAPP</a>
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none z-50 relative p-1">
          <span className={`h-0.5 w-4 bg-brand-gold transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-0.5 w-4 bg-brand-gold transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-4 bg-brand-gold transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
        
        {isMobileMenuOpen && (
          <div className="absolute top-[52px] left-0 w-full bg-brand-charcoal/98 border border-neutral-900 p-4 flex flex-col space-y-3 md:hidden z-50 shadow-2xl">
            <button onClick={() => scrollToSection('concept')} className="text-left text-xs font-mono text-gray-400 py-1 border-b border-neutral-900/60">/Concept</button>
            <button onClick={() => scrollToSection('works')} className="text-left text-xs font-mono text-gray-400 py-1 border-b border-neutral-900/60">/Works</button>
            <button onClick={() => scrollToSection('automation')} className="text-left text-xs font-mono text-gray-400 py-1 border-b border-neutral-900/60">/Automation</button>
            <button onClick={() => scrollToSection('contact')} className="text-left text-xs font-mono text-gray-400 py-1 border-b border-neutral-900/60">/Contact</button>
            <div className="pt-1 flex gap-5 text-[10px] font-mono">
              <a href={developerProfile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-gold font-bold">[LINKEDIN]</a>
              <a href={`https://wa.me/${developerProfile.socials.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-brand-gold font-bold">[WHATSAPP]</a>
            </div>
          </div>
        )}
      </header>

      {/* CONCEPT AREA UPGRADED: 4 BOXES ON MOBILE GRID (2x2) & ALL 8 ON PC (4x2) MATCHING image_146022.png EXACTLY */}
      <section id="concept" className="max-w-5xl mx-auto text-center mb-12 md:mb-16 px-2 scroll-mt-20">
        <div className="text-[10px] font-mono text-neutral-500 tracking-widest mb-1 uppercase">CONCEPT 3:</div>
        <h2 className="text-lg sm:text-2xl md:text-4xl font-black tracking-wider text-neutral-100 mb-8 md:mb-12 uppercase">Architectural Blocks</h2>
        
        <div onMouseLeave={() => setIsChainActive(false)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto my-2 px-1">
          {architecturalBlocks.map((block) => {
            const isFlippedOnTouch = activeBlockNoteId === block.id;

            return (
              <div 
                key={block.id} 
                onMouseEnter={() => setIsChainActive(true)} 
                onTouchStart={() => setIsChainActive(true)}
                onClick={() => setActiveBlockNoteId(activeBlockNoteId === block.id ? null : block.id)}
                style={{ transitionDelay: isChainActive ? `${block.id * 80}ms` : '0ms' }} 
                className={`group aspect-square border rounded-sm relative flex items-center justify-center transition-all duration-350 cursor-crosshair overflow-hidden ${block.id >= 4 ? 'hidden sm:flex' : 'flex'} ${isChainActive ? `border-brand-gold bg-gradient-to-br from-brand-gold/15 via-brand-gold/[0.01] to-transparent shadow-[0_0_25px_rgba(245,158,11,0.2)] ${block.activeTransform}` : `border-brand-gold/15 bg-brand-gold/[0.005] ${block.baseTransform}`}`}
              >
                {/* DEFAULT STATE LAYOUT VIEW */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-250 p-1 pointer-events-none select-none w-full h-full ${isFlippedOnTouch ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                  <div className="absolute top-2 left-2 right-2 text-left">
                    <span className="text-[8px] sm:text-[10px] font-mono text-brand-gold font-bold tracking-tight block truncate uppercase">
                      {block.label}
                    </span>
                  </div>
                  <div className="w-full h-full flex items-center justify-center relative mt-2">
                    {block.child(isChainActive)}
                  </div>
                </div>

                {/* FIXED STICKY NOTE SYSTEM: Combines screen mouse hover AND mobile active touch state */}
                <div className={`absolute inset-0 bg-neutral-950 border border-brand-gold/30 p-3 sm:p-4 flex flex-col justify-center text-left transition-all duration-300 transform bg-gradient-to-br from-brand-gold/[0.08] via-neutral-950 to-neutral-950 z-20 pointer-events-none ${isFlippedOnTouch ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'}`}>
                  <div className="text-[6px] sm:text-[7px] font-mono text-brand-gold font-bold tracking-widest mb-1.5 border-b border-brand-gold/15 pb-0.5 flex justify-between items-center select-none">
                    <span>// PROFILE_CORE</span>
                    <span className="w-1 h-1 bg-brand-gold rounded-full animate-ping"></span>
                  </div>
                  <p className="text-[8px] min-[360px]:text-[10px] md:text-[11px] font-mono font-bold text-neutral-200 leading-snug sm:leading-relaxed whitespace-pre-line tracking-wide overflow-y-auto">
                    {block.note}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* WORKS MODULE */}
      <section id="works" className="max-w-5xl mx-auto mb-12 md:mb-16 px-2 scroll-mt-20">
        <div className="mb-4">
          <span className="text-xs font-mono text-brand-gold tracking-widest font-bold uppercase">WORKS:</span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-neutral-100 uppercase mt-0.5">Core System Deliverables</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {projectsData.map((project, idx) => {
            const progress = worksScrollProgress[idx] || 0;
            const isPulseActive = progress > 0.45;

            return (
              <div key={idx} id={`project-card-${idx}`} className="border border-neutral-900 bg-neutral-900/30 p-4 rounded-sm hover:border-brand-gold/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none z-0 p-[1.5px] rounded-sm">
                  <div className="absolute inset-0 rounded-sm transition-all duration-1000 ease-out" style={{ background: `linear-gradient(to bottom, #f59e0b calc(${progress} * 100%), transparent calc(${progress} * 100% + 10px))` }} />
                </div>
                <div className="absolute inset-[1.5px] bg-brand-charcoal rounded-sm z-0 pointer-events-none" />

                <div className="z-10 relative flex flex-col gap-2.5">
                  <div className="bg-neutral-950 border border-neutral-900 rounded-sm h-32 overflow-hidden relative group-hover:border-brand-gold/20 transition-all duration-300 flex flex-col justify-between shadow-inner">
                    <div className="flex items-center justify-between border-b border-neutral-900/70 p-2 bg-neutral-950/80 backdrop-blur-xs relative z-10">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full group-hover:bg-brand-gold/50 transition-colors"></span>
                        <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest ml-1">{project.category}</span>
                      </div>
                      <span className="text-[7px] font-mono text-neutral-600 tracking-wider">LIVE_RENDER</span>
                    </div>
                    <div className="absolute inset-0 pt-6 w-full h-full bg-neutral-950">
                      {project.videoLink && (project.videoLink.includes('youtube.com') || project.videoLink.includes('youtu.be')) ? (
                        <div className="relative w-full h-full">
                          <img
                            src={`https://img.youtube.com/vi/${getYoutubeId(project.videoLink)}/0.jpg`}
                            alt="Thumbnail"
                            className="w-full h-full object-cover opacity-45"
                          />

                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-brand-gold text-2xl">▶</span>
                          </div>
                        </div>
                      ) : (
                        <video src={`/videos/${project.id}.mp4`} autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover opacity-45 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
                      )}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent z-10 flex items-center justify-between">
                      <div className="w-1.5 h-1.5 border-b border-l border-neutral-800 group-hover:border-brand-gold/20"></div>
                      <span className="text-[7px] font-mono text-neutral-600 group-hover:text-neutral-400">SYS_OK</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-mono font-black uppercase tracking-wider transition-colors duration-1000" style={{ color: isPulseActive ? '#f8fafc' : '#64748b', textShadow: isPulseActive ? '0 0 10px rgba(248, 250, 252, 0.25)' : 'none' }}>
                      {project.title}
                    </h3>
                    <p className="text-[11px] font-mono font-medium leading-relaxed mt-1 tracking-wide transition-colors duration-1000" style={{ color: isPulseActive ? '#cbd5e1' : '#475569' }}>
                      {project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-0.5">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="bg-neutral-950/60 p-1.5 border border-neutral-900 rounded-sm text-[9px]">
                        <span className="block text-neutral-500 font-mono uppercase">{m.label}</span>
                        <span className="font-mono text-brand-gold font-bold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-neutral-900 pt-2.5 mt-2.5 flex flex-col gap-2 z-10 relative">
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-[9px] font-mono bg-neutral-950 px-2 py-0.5 text-neutral-500 rounded-sm">{tech}</span>
                    ))}
                  </div>
                  <button type="button" onClick={() => setActiveVideoUrl(project.videoLink ? getYoutubeLink(project.videoLink) : `/videos/${project.id}.mp4`)} className="w-full mt-0.5 border border-neutral-800 bg-neutral-900 text-[10px] font-mono text-brand-gold py-1.5 rounded-sm uppercase tracking-wider hover:bg-brand-gold hover:text-brand-charcoal transition-colors cursor-pointer text-center">
                    Watch System Demo &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AUTOMATION MODULE RE-ENGINEERED FOR PREMIUM INTUATIVE INTERACTIVE AI CHATBOT (image_1e4d69.png Re-built) */}
      <section id="automation" className="max-w-5xl mx-auto mb-12 md:mb-16 px-2 scroll-mt-24">
        <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
          <div>
            <span className="text-xs font-mono text-brand-gold tracking-widest uppercase font-bold">AUTOMATION:</span>
            <h2 className="text-lg md:text-xl font-black tracking-tight uppercase mt-0.5 transition-all duration-300" style={{ color: isAutomationPulseActive ? '#f8fafc' : '#64748b' }}>Automation Pipe</h2>
          </div>
          <span className="text-[10px] font-mono text-neutral-600">// VISUAL ENGINE DRIVEN THROUGH WEBHOOK CORE</span>
        </div>

        <div id="automation-container" className="border border-neutral-900/80 bg-neutral-950/60 rounded-md p-4 sm:p-6 md:p-8 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-0 p-[1.5px] rounded-md">
            <div className="absolute inset-0 rounded-md transition-all duration-75" style={{ background: `linear-gradient(to bottom, #f59e0b calc(${automationScrollProgress} * 100%), transparent calc(${automationScrollProgress} * 100% + 20px))` }} />
          </div>
          <div className="absolute inset-[1.5px] bg-brand-charcoal rounded-md z-0 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-1.5 relative z-20 font-mono text-[10px] mt-2 w-full">
            
            <div className="space-y-3.5 flex flex-col justify-center w-full md:w-[22%]">
              <div className="bg-neutral-900 p-3 rounded-xs flex items-center justify-between border border-neutral-800/80 shadow-md min-h-[40px] track-inputs-perimeter">
                <span className="text-cyan-400 font-bold">⚡ [WEBHOOK]</span>
                <span className="text-neutral-500">INPUT</span>
              </div>
              <div className="bg-neutral-900 p-3 rounded-xs flex items-center justify-between border border-neutral-800/80 shadow-md min-h-[40px] track-inputs-perimeter">
                <span className="text-purple-400 font-bold">💾 [POSTGRES]</span>
                <span className="text-neutral-500">SYNC</span>
              </div>
              <div className="bg-neutral-900 p-3 rounded-xs flex items-center justify-between border border-neutral-800/80 shadow-md min-h-[40px] track-inputs-perimeter">
                <span className="text-amber-400 font-bold">💻 [CLIENT_API]</span>
                <span className="text-neutral-500">DATA</span>
              </div>
            </div>

            <div className="hidden md:block w-[3%] h-[2px] bg-neutral-800 relative overflow-hidden track-wire-1" />
            <div className="hidden md:block w-3 h-3 rounded-full border border-neutral-800 bg-neutral-950 z-30 track-bullet-1 transition-all" />
            <div className="hidden md:block w-[2%] h-[2px] bg-neutral-800 relative overflow-hidden track-wire-2" />

            <div className="w-full md:w-[20%]">
              <div className="bg-neutral-900 p-4 rounded-sm text-center border border-neutral-800/70 min-h-[105px] flex flex-col justify-center shadow-lg track-matrix-perimeter">
                <div className="text-brand-gold font-bold">⚙️ [ROUTING_MATRIX]</div>
                <div className="text-[8px] text-neutral-500 uppercase mt-1">Context Logic Parsing</div>
              </div>
            </div>

            <div className="hidden md:block w-[3%] h-[2px] bg-neutral-800 relative overflow-hidden track-wire-3" />
            <div className="hidden md:block w-3 h-3 rounded-full border border-neutral-800 bg-neutral-950 z-30 track-bullet-2 transition-all" />
            <div className="hidden md:block w-[2%] h-[2px] bg-neutral-800 relative overflow-hidden track-wire-4" />

            <div className="w-full md:w-[20%]">
              <div className="bg-neutral-900 p-4 rounded-sm text-center border border-neutral-800/70 min-h-[105px] flex flex-col justify-center shadow-lg track-orchestrator-perimeter">
                <div className="text-emerald-400 font-bold">🔄 [N8N_ORCHESTRATOR]</div>
                <div className="text-[8px] text-neutral-500 uppercase mt-1">Payload Sync Loop</div>
              </div>
            </div>

            <div className="hidden md:block w-[3%] h-[2px] bg-neutral-800 relative overflow-hidden track-wire-5" />
            <div className="hidden md:block w-3 h-3 rounded-full border border-neutral-800 bg-neutral-950 z-30 track-bullet-3 transition-all" />
            <div className="hidden md:block w-[2%] h-[2px] bg-neutral-800 relative overflow-hidden track-wire-6" />

            <div className="w-full md:w-[20%]">
              <div className="bg-neutral-900 p-4 rounded-sm text-center border border-dashed border-neutral-800/70 min-h-[105px] flex flex-col justify-center shadow-lg track-crm-perimeter">
                <div className="text-rose-400 font-bold">🚀 [CRM_DISPATCH]</div>
                <div className="text-[8px] text-neutral-500 uppercase mt-1">Secure Delivery Target</div>
              </div>
            </div>

          </div>

          {/* DYNAMIC SIMULATED INTERACTIVE CHATBOT MODULE (image_1e4d69.png Transformed) */}
          <div className="border-t border-neutral-900 mt-6 pt-4 relative z-20">
            <div className="text-[10px] font-mono text-brand-gold mb-2 tracking-widest font-black uppercase">// 🤖 UMAR'S LIVE AI ASSISTANT // Chat with my Core Node:</div>
            <div className="bg-neutral-950 border border-neutral-900 p-3.5 h-44 overflow-y-auto space-y-3 font-mono text-xs rounded-sm custom-scrollbar" ref={chatContainerRef}>
              {chatMessages.map(msg => (
                <div key={msg.id} className="leading-relaxed">
                  <span className={msg.sender === 'ai' ? 'text-brand-gold font-bold' : 'text-cyan-400 font-bold'}>
                    {msg.sender === 'ai' ? '● [AI_CORE]: ' : '○ [YOU]: '}
                  </span>
                  <span className="text-neutral-200">{msg.text}</span>
                </div>
              ))}
              {isAiTyping && <div className="text-neutral-600 animate-pulse font-bold">// AI_CORE IS THINKING AND ANALYZING REQUEST MATRIX...</div>}
            </div>
            
            <form onSubmit={handleChatSubmit} className="mt-2.5 flex gap-2 font-mono text-xs">
              <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                placeholder="Ask about Umar's full-stack skills, n8n automation, web experience..." 
                className="flex-1 bg-neutral-900 border border-neutral-800 p-3 text-gray-200 focus:outline-none focus:border-brand-gold rounded-sm min-w-0 tracking-wide font-medium" 
              />
              <input type="submit" hidden />
              <button type="submit" className="bg-neutral-800 border border-neutral-700 text-brand-gold px-4 sm:px-6 font-bold uppercase hover:bg-brand-gold hover:text-brand-charcoal transition-colors rounded-sm cursor-pointer active:scale-95 select-none">
                Transmit
              </button>
            </form>

            <div className="mt-2 flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendChatQuery(q)}
                  className="text-[11px] font-mono bg-neutral-800 border border-neutral-700 text-neutral-300 px-3 py-2 rounded-sm hover:bg-brand-gold hover:text-brand-charcoal transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECURE TRANSMISSION CHANNEL FORM MODULE */}
      <section id="contact" className="max-w-5xl mx-auto mb-12 px-2 scroll-mt-28">
        <div className="border-b border-neutral-800 pb-3 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xs md:text-sm font-mono tracking-widest text-brand-gold uppercase font-bold">// SECURE TRANSMISSION CHANNEL</h2>
          <div className="flex gap-4 text-[10px] font-mono tracking-wider">
            <a href={developerProfile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-brand-gold transition-colors font-bold">[LINKEDIN_NODE]</a>
            <a href={`https://wa.me/${developerProfile.socials.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-brand-gold transition-colors font-bold">[WHATSAPP_CORE]</a>
          </div>
        </div>

        <div className="border border-neutral-900 bg-neutral-950/40 p-5 sm:p-6 md:p-10 max-w-2xl mx-auto rounded-sm relative shadow-2xl group overflow-hidden transition-all duration-300">
          
          {/* FIXED ALWAYS-ON GLOWING LASER BORDER ANIMATION */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <rect 
                x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" 
                fill="none" rx="4" stroke="#f59e0b" strokeWidth="2"
                strokeLinecap="round" className="opacity-70"
                style={{ strokeDasharray: '260 1000', animation: 'contactLaserBorder 4.5s linear infinite' }}
              />
            </svg>
          </div>

          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neutral-800 group-hover:border-brand-gold/60 transition-colors duration-300 pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neutral-800 group-hover:border-brand-gold/60 transition-colors duration-300 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neutral-800 group-hover:border-brand-gold/60 transition-colors duration-300 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neutral-800 group-hover:border-brand-gold/60 transition-colors duration-300 pointer-events-none" />
          
          <form onSubmit={handleFormSubmit} className="space-y-6 font-mono text-xs relative z-10">
            <div>
              <label className="block text-neutral-500 mb-1.5 tracking-wider select-none">IDENTIFIER_ENTITY_NAME</label>
              <input 
                type="text" required disabled={isFormProcessing}
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                className="w-full bg-neutral-950/90 border border-neutral-900 p-3 text-gray-200 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 rounded-sm transition-all duration-300 font-medium tracking-wide" 
              />
            </div>
            
            <div>
              <label className="block text-neutral-500 mb-1.5 tracking-wider select-none">ROUTING_COMMS_EMAIL</label>
              <input 
                type="email" required disabled={isFormProcessing}
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                className="w-full bg-neutral-950/90 border border-neutral-900 p-3 text-gray-200 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 rounded-sm transition-all duration-300 font-medium tracking-wide" 
              />
            </div>
            
            <div>
              <label className="block text-neutral-500 mb-1.5 tracking-wider select-none">SYSTEM_REQUIREMENTS_SCOPE</label>
              <textarea 
                rows={4} required disabled={isFormProcessing}
                value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                className="w-full bg-neutral-950/90 border border-neutral-900 p-3 text-gray-200 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 rounded-sm transition-all duration-300 resize-none font-medium leading-relaxed tracking-wide" 
              />
            </div>

            <button 
              type="submit" disabled={isFormProcessing}
              className="w-full bg-neutral-900 border border-neutral-800 text-brand-gold font-bold py-3.5 uppercase tracking-widest hover:bg-brand-gold hover:text-brand-charcoal hover:border-transparent transition-all duration-300 rounded-sm cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]"
            >
              {formStatus || 'TRANSMIT SCOPE ↗'}
            </button>
          </form>

          {/* SIMPLIFIED HIGH-END CLIENT RECONCILIATION TERMINAL LOGS */}
          {contactLogs.length > 0 && (
            <div className="mt-8 border-t border-neutral-900 pt-5 relative z-10 animate-fadeIn">
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2 flex items-center justify-between font-mono">
                <span>// CORE TERMINAL ROUTING RECEIPTS:</span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              </div>
              <div 
                ref={contactTerminalRef}
                className="bg-neutral-950 border border-neutral-900 rounded-sm p-4 h-44 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-2.5 custom-scrollbar text-neutral-400 select-text"
              >
                {contactLogs.map((log, i) => {
                  let logStyle = "text-neutral-400";
                  if (log.includes("[⚙️ STATUS]")) logStyle = "text-cyan-400";
                  if (log.includes("[✅ DELIVERED]")) logStyle = "text-emerald-400 font-bold";
                  if (log.includes("[🤖 UMAR's AI CORE]")) logStyle = "text-brand-gold font-medium bg-brand-gold/[0.02] p-2 border-l border-brand-gold rounded-r-xs mt-1 block";
                  if (log.includes("[❌")) logStyle = "text-rose-400 font-bold";

                  return (
                    <div key={i} className={`${logStyle} animate-fadeIn`}>
                      {log}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto border-t border-neutral-900 pt-6 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-500 tracking-widest text-center md:text-left">
        <p>CONCEPTS MAPPED TO PRODUCTION STACKS.</p>
        <p>&copy; 2026 {developerProfile.name.toUpperCase()}. CORE ARCHITECTURE STABLE.</p>
      </footer>

      {/* GLOBAL VIDEO PREVIEW POPUP OVERLAY */}
      {activeVideoUrl && (
        <div className="fixed inset-0 bg-brand-charcoal/95 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 animate-fadeIn">
          <div className="border border-neutral-800 bg-neutral-950 p-2 sm:p-3 max-w-4xl w-full rounded-sm relative shadow-2xl">
            <div className="flex justify-between items-center border-b border-neutral-900 pb-2 mb-3 font-mono text-[10px] sm:text-[11px]">
              <span className="text-brand-gold truncate max-w-[200px] sm:max-w-none">// SYSTEM_DIAGNOSTIC_WALKTHROUGH.MP4</span>
              <button onClick={() => setActiveVideoUrl(null)} className="text-neutral-500 hover:text-rose-500 cursor-pointer transition-colors bg-transparent border-none uppercase font-bold text-xs pl-2">[ Close X ]</button>
            </div>
            <div className="relative aspect-video w-full bg-black border border-neutral-900 flex items-center justify-center">
              {activeVideoUrl?.includes('youtube.com/embed/') || activeVideoUrl?.includes('youtu.be/') ? (
                <iframe
                  src={activeVideoUrl}
                  title="Project Demo"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={activeVideoUrl} controls autoPlay className="w-full h-full object-contain" />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}