import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Info, X } from 'lucide-react';

interface AdBannerProps {
  type?: 'horizontal' | 'vertical' | 'square';
  className?: string;
}

const MOCK_ADS = [
  {
    title: "Master Mathematics with AI",
    desc: "Join 100,000+ students scoring 95+ in boards.",
    cta: "Start Free Trial",
    image: "https://picsum.photos/seed/math/400/200",
    color: "#22d3ee"
  },
  {
    title: "Best Science Kits for Class 10",
    desc: "Perform experiments at home with our certified kits.",
    cta: "Shop Now",
    image: "https://picsum.photos/seed/science/400/200",
    color: "#818cf8"
  },
  {
    title: "Exam Stress? Talk to Experts",
    desc: "Free counseling sessions for board students.",
    cta: "Book Session",
    image: "https://picsum.photos/seed/meditation/400/200",
    color: "#fbbf24"
  }
];

export const AdBanner: React.FC<AdBannerProps> = ({ type = 'horizontal', className }) => {
  const [ad] = React.useState(() => MOCK_ADS[Math.floor(Math.random() * MOCK_ADS.length)]);
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl group ${className}`}
    >
      <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
        <span className="text-[8px] font-bold uppercase tracking-widest text-white/20 bg-black/40 px-1.5 py-0.5 rounded">Ad</span>
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded-full text-white/20 hover:text-white transition-colors"
        >
          <X size={12} />
        </button>
      </div>

      <div className={`flex ${type === 'horizontal' ? 'flex-col sm:flex-row' : 'flex-col'} h-full`}>
        <div className={`${type === 'horizontal' ? 'w-full sm:w-1/3 h-24 sm:h-full' : 'w-full h-32'} relative overflow-hidden`}>
          <img 
            src={ad.image} 
            alt="Advertisement" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="flex-1 p-4 flex flex-col justify-center">
          <h4 className="text-sm font-bold text-white mb-1 group-hover:text-theme transition-colors">{ad.title}</h4>
          <p className="text-[10px] text-white/40 mb-3 line-clamp-2">{ad.desc}</p>
          <button 
            className="w-fit flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all"
            style={{ backgroundColor: `${ad.color}20`, color: ad.color }}
          >
            {ad.cta}
            <ExternalLink size={10} />
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
};
