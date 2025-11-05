'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type OtpModalProps = {
  email: string;
  maskedEmail: string;
  isOpen: boolean;
  isVerifying: boolean;
  onClose: () => void;
  onVerify: (code: string) => Promise<void> | void;
  onResend: () => Promise<void> | void;
  initialCooldownSeconds?: number;
};

export default function OtpModal({ email, maskedEmail, isOpen, isVerifying, onClose, onVerify, onResend, initialCooldownSeconds = 30 }: OtpModalProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string>('');
  const [cooldown, setCooldown] = useState<number>(initialCooldownSeconds);
  const [isShaking, setIsShaking] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement | null;
      setDigits(Array(6).fill(''));
      setError('');
      setCooldown(initialCooldownSeconds);
      setTimeout(() => inputsRef.current[0]?.focus(), 30);
    } else {
      // restore focus
      lastActiveElement.current?.focus();
    }
  }, [isOpen, initialCooldownSeconds]);

  useEffect(() => {
    if (!isOpen) return;
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [isOpen, cooldown]);

  const code = useMemo(() => digits.join(''), [digits]);
  const canVerify = code.length === 6 && /^\d{6}$/.test(code);

  useEffect(() => {
    if (canVerify) {
      // Auto-submit on 6th digit
      void handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canVerify]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    setError('');
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        setDigits((prev) => {
          const next = [...prev];
          next[index] = '';
          return next;
        });
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = Array(6).fill('');
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    const focusIndex = Math.min(text.length, 5);
    setTimeout(() => inputsRef.current[focusIndex]?.focus(), 10);
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setCooldown(initialCooldownSeconds);
    await onResend();
  };

  const handleVerify = async () => {
    if (!canVerify) return;
    setError('');
    try {
      await onVerify(code);
    } catch (err) {
      setError('Invalid OTP');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
    }
  };

  // focus trap
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" aria-hidden={!isOpen}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="otp-title"
        className={`relative w-full max-w-sm mx-4 bg-white rounded-xl shadow-2xl overflow-hidden animate-slide-up ${isShaking ? 'animate-shake' : ''}`}
        onPaste={handlePaste}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          aria-label="Close"
        >
          ×
        </button>
        <div className="p-6">
          <h2 id="otp-title" className="text-xl font-semibold text-slate-900 mb-1">Verify Your Email</h2>
          <p className="text-sm text-slate-600 mb-4">We sent a 6-digit code to <span className="font-medium">{maskedEmail}</span></p>
          <p className="text-xs text-slate-500 mb-4">Didn’t receive it? Check your spam folder.</p>

          <div className="flex items-center justify-between gap-2 mb-3" aria-label="Enter 6 digit code">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-12 h-12 text-center text-lg font-semibold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={d}
                onChange={(e) => handleChange(i, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(i, e)}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0}
              className={`text-sm font-medium ${cooldown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'}`}
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
            </button>
            <button
              type="button"
              onClick={handleVerify}
              disabled={!canVerify || isVerifying}
              className={`px-4 py-2 rounded-lg text-white text-sm font-semibold ${!canVerify || isVerifying ? 'bg-blue-400/80 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} flex items-center gap-2`}
            >
              {isVerifying ? 'Verifying…' : 'Verify'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


