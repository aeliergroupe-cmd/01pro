'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AdvisorMessage } from '@/types/account';

const MOCK_MESSAGES: AdvisorMessage[] = [
  {
    id: 'm1',
    content:
      'Good morning. I wanted to follow up on your recent purchase of the Côte d\'Azur Suit — I hope it arrived in perfect condition. Please don\'t hesitate to reach out if you\'d like to schedule a fitting to ensure the alterations are exactly right.',
    sender: 'advisor',
    senderName: 'Alexandre Moreau',
    timestamp: '2025-04-10T09:30:00',
    read: true,
  },
  {
    id: 'm2',
    content:
      'Thank you, Alexandre. The suit arrived beautifully. I may take you up on that fitting — the left shoulder sits slightly higher than I expected.',
    sender: 'customer',
    senderName: 'Jean Dupont',
    timestamp: '2025-04-10T11:15:00',
    read: true,
  },
  {
    id: 'm3',
    content:
      'Of course. This is a simple adjustment our atelier can make. I\'d suggest booking a complimentary fitting appointment at the Paris Maison — I can arrange for our head tailor, Monsieur Blanchard, to be present. Would next week suit you?',
    sender: 'advisor',
    senderName: 'Alexandre Moreau',
    timestamp: '2025-04-10T13:00:00',
    read: true,
  },
];

export function AdvisorChat() {
  const [messages, setMessages] = useState<AdvisorMessage[]>(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    const newMsg: AdvisorMessage = {
      id: `m${Date.now()}`,
      content: input.trim(),
      sender: 'customer',
      senderName: 'Jean Dupont',
      timestamp: new Date().toISOString(),
      read: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    await new Promise((r) => setTimeout(r, 1500));
    const reply: AdvisorMessage = {
      id: `m${Date.now() + 1}`,
      content:
        'Thank you for your message. Alexandre will respond within one business day.',
      sender: 'advisor',
      senderName: 'Alexandre Moreau',
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [...prev, reply]);
    setSending(false);
  }

  return (
    <div className="border border-border flex flex-col" style={{ height: '520px' }}>
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-surface flex items-center justify-center flex-none">
          <span className="text-label-luxury text-foreground">AM</span>
        </div>
        <div>
          <p className="text-sm text-foreground font-light">Alexandre Moreau</p>
          <p className="text-xs text-muted-foreground">Personal Client Advisor · Paris</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex gap-3', msg.sender === 'customer' && 'flex-row-reverse')}
          >
            <div className="w-7 h-7 rounded-full bg-surface flex items-center justify-center flex-none text-xs text-foreground">
              {msg.senderName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className={cn('max-w-[75%]', msg.sender === 'customer' && 'items-end')}>
              <div
                className={cn(
                  'px-4 py-3 text-sm font-light leading-relaxed',
                  msg.sender === 'advisor'
                    ? 'bg-surface text-foreground'
                    : 'bg-foreground text-background'
                )}
              >
                {msg.content}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(msg.timestamp).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-surface flex items-center justify-center flex-none text-xs">AM</div>
            <div className="px-4 py-3 bg-surface text-muted-foreground text-sm">
              <span className="animate-pulse">Typing…</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-border px-4 py-3 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message your advisor…"
          className={cn(
            'flex-1 h-10 px-3 bg-transparent border border-border',
            'text-sm text-foreground font-light',
            'focus:outline-none focus:border-foreground transition-colors duration-200',
            'placeholder:text-muted-foreground/50'
          )}
        />
        <button
          type="submit"
          disabled={!input.trim() || sending}
          className="w-10 h-10 bg-foreground text-background flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-40"
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
