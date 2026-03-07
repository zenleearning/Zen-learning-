import React from 'react';
import { motion } from 'motion/react';
import { X, Twitter, Youtube, Instagram, MessageSquare } from 'lucide-react';
import { NewsItem, GameDetail } from '../data/games';

interface DetailScreenProps {
  item: NewsItem | GameDetail;
  onBack: () => void;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ item, onBack }) => {
  const isGame = 'size' in item;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 bg-[#050505] p-8 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-8 text-white/70 hover:text-neon-red flex items-center gap-2">
          <X size={24} /> Close
        </button>
        
        <h1 className="font-display text-5xl font-bold mb-4 text-white">{item.title}</h1>
        {isGame && <p className="text-neon-red mb-6 uppercase tracking-widest">{item.category}</p>}
        
        <div className="prose prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-bold mb-4">Full Details</h2>
          <p className="text-lg text-white/80">{item.fullDetails}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Twitter size={24} /> <h3 className="font-bold">Twitter</h3>
            </div>
            <ul className="space-y-2">
              {item.socialSentiment.twitter.map((tweet, i) => (
                <li key={i} className="text-sm text-white/70">"{tweet}"</li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4 text-red-500">
              <Youtube size={24} /> <h3 className="font-bold">YouTube</h3>
            </div>
            <ul className="space-y-2">
              {item.socialSentiment.youtube.map((comment, i) => (
                <li key={i} className="text-sm text-white/70">"{comment}"</li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4 text-pink-500">
              <Instagram size={24} /> <h3 className="font-bold">Instagram</h3>
            </div>
            <ul className="space-y-2">
              {item.socialSentiment.instagram.map((comment, i) => (
                <li key={i} className="text-sm text-white/70">"{comment}"</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailScreen;
