import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, Zap, Star, Sparkles, CreditCard, QrCode, ArrowRight, Info, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Replace with your Stripe Publishable Key from Dashboard
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51P...placeholder');

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = React.useState<'plan' | 'pay' | 'verifying'>('plan');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const upiId = "7819870730@fam";
  const amount = "499";
  const upiUrl = `upi://pay?pa=${upiId}&pn=Zen%20Learning&am=${amount}&cu=INR&tn=Zen%20Learning%20Premium`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create checkout session');
      }

      const { id, isDemo } = await response.json();
      
      if (isDemo) {
        // If in demo mode, simulate the redirect and success
        setTimeout(() => {
          window.location.href = '/?payment=success';
        }, 1500);
        return;
      }

      const stripe = (await stripePromise) as any;
      
      if (!stripe) throw new Error('Stripe failed to load');
      
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) throw error;

    } catch (err: any) {
      console.error('Stripe Error:', err);
      setError(err.message || 'Something went wrong with the payment.');
      setIsProcessing(false);
    }
  };

  const handleManualUPI = () => {
    setStep('pay');
  };

  const handleVerify = () => {
    setStep('verifying');
    setIsProcessing(true);
    // Simulate automatic payment verification check
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
      onClose();
    }, 3000);
  };

  // Check for success URL on mount
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'success') {
      onSuccess();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onSuccess]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -left-24 h-48 w-48 bg-theme/20 blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 h-48 w-48 bg-purple-500/20 blur-[100px]" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            {step === 'plan' && (
              <>
                <div className="relative text-center mb-8">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-theme/10 text-theme">
                    <ShieldCheck size={40} />
                  </div>
                  <h2 className="font-display text-3xl uppercase tracking-tighter mb-2">Go Premium</h2>
                  <p className="text-white/40 text-sm">Remove all distractions and unlock exclusive features.</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: <Zap size={18} />, title: "No More Ads", desc: "Enjoy a completely ad-free learning experience." },
                    { icon: <Star size={18} />, title: "Priority Support", desc: "Get your doubts resolved faster by our experts." },
                    { icon: <Sparkles size={18} />, title: "Exclusive Content", desc: "Access premium notes and sample papers." }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="mt-1 text-theme">{feature.icon}</div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-white">{feature.title}</h4>
                        <p className="text-xs text-white/40">{feature.desc}</p>
                      </div>
                      <Check size={16} className="ml-auto text-emerald-400" />
                    </div>
                  ))}
                </div>

                <div className="relative p-6 rounded-3xl bg-gradient-to-br from-theme/20 to-purple-500/20 border border-white/10 mb-8 text-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">Lifetime Access</span>
                    <span className="px-2 py-1 rounded-md bg-theme text-black text-[10px] font-bold uppercase tracking-widest">Best Value</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-display">₹{amount}</span>
                    <span className="text-white/40 text-sm line-through">₹1999</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleStripeCheckout}
                    disabled={isProcessing}
                    className="w-full h-14 relative group overflow-hidden rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-theme to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <div className="flex items-center justify-center gap-2">
                      {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
                      Pay with Card / UPI (Stripe)
                    </div>
                  </button>
                  
                  <button
                    onClick={handleManualUPI}
                    className="w-full h-14 rounded-2xl glass-morphism text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                  >
                    <QrCode size={18} />
                    Direct UPI (Manual)
                  </button>
                </div>
              </>
            )}

            {step === 'pay' && (
              <div className="text-center">
                <div className="mb-8">
                  <h3 className="font-display text-2xl uppercase tracking-tighter mb-2">Scan & Pay</h3>
                  <p className="text-white/40 text-sm">Scan this QR code with any UPI app to pay ₹{amount}</p>
                </div>

                <div className="relative mx-auto w-48 h-48 bg-white p-3 rounded-2xl mb-8 group">
                  <img src={qrUrl} alt="UPI QR Code" className="w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                    <QrCode size={48} className="text-white" />
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-left flex items-center justify-between group/upi">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">UPI ID</p>
                      <p className="text-sm font-mono text-theme">{upiId}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(upiId);
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-theme hover:text-black transition-all"
                      title="Copy UPI ID"
                    >
                      <CreditCard size={14} />
                    </button>
                  </div>
                  
                  <a 
                    href={upiUrl}
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Open UPI App
                    <ArrowRight size={14} />
                  </a>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleVerify}
                    className="w-full h-14 rounded-2xl bg-theme text-black font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all"
                  >
                    I have paid
                  </button>
                  <button
                    onClick={() => setStep('plan')}
                    className="text-xs font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                  >
                    Go Back
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-white/20 uppercase tracking-widest">
                  <Info size={12} />
                  Automatic verification takes 2-3 seconds
                </div>
              </div>
            )}

            {step === 'verifying' && (
              <div className="text-center py-12">
                <div className="relative mx-auto mb-8 h-24 w-24">
                  <div className="absolute inset-0 border-4 border-theme/20 rounded-full" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-t-theme rounded-full"
                  />
                </div>
                <h3 className="font-display text-2xl uppercase tracking-tighter mb-2">Verifying Payment</h3>
                <p className="text-white/40 text-sm">Please wait while we confirm your transaction with the bank...</p>
                
                <div className="mt-12 flex items-center justify-center gap-4">
                  <div className="h-1 w-12 bg-theme/20 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: [-48, 48] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="h-full w-full bg-theme"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Secure Check</span>
                  <div className="h-1 w-12 bg-theme/20 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: [-48, 48] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                      className="h-full w-full bg-theme"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <p className="mt-4 text-[10px] text-center text-white/20 uppercase tracking-widest">
              UPI ID: {upiId} • Secure Transaction
            </p>

            <button
              onClick={onClose}
              className="mt-6 w-full text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
            >
              Cancel & Go Back
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
