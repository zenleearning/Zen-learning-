import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  Menu, 
  X, 
  Clock, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { NEWS_DATA, TRENDING_GAMES, UPCOMING_GAMES, CATEGORIZED_GAMES, POPULAR_THIS_WEEK, FEATURED_GAMES } from './data/games';
import DetailScreen from './components/DetailScreen';
import SearchResults from './components/SearchResults';
import { NewsItem, GameDetail } from './data/games';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState<'All' | 'Android' | 'PC' | 'Console'>('All');
  const [selectedItem, setSelectedItem] = useState<NewsItem | GameDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [view, setView] = useState<'home' | 'search' | 'detail'>('home');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      setView('search');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Sidebar Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed inset-0 z-50 bg-black p-8 lg:hidden"
        >
          <div className="flex justify-end mb-10">
            <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-6 text-center">
            {['Home', 'Latest News', 'Game Updates', 'Upcoming Games', 'Esports News', 'Trending Games', 'Guides', 'Blog', 'About', 'Contact'].map((item) => (
              <button key={item} className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-red transition-all">
                {item}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="flex items-center gap-2 cursor-pointer absolute left-1/2 -translate-x-1/2" onClick={() => setView('home')}>
              <Gamepad2 className="text-neon-red" size={32} />
              <span className="font-display text-3xl tracking-tighter uppercase neon-text-red">GameVerse</span>
            </div>

            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isSearchOpen ? 'auto' : 0, opacity: isSearchOpen ? 1 : 0 }}
                className="overflow-hidden"
              >
                <input 
                  type="text" 
                  placeholder="Search games..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-neon-red w-48"
                />
              </motion.div>
              <Search className="text-white/70 cursor-pointer hover:text-neon-red" size={24} onClick={() => setIsSearchOpen(!isSearchOpen)} />
            </div>
          </div>
        </div>
      </nav>

      {view === 'search' ? (
        <SearchResults 
          searchQuery={searchQuery} 
          onBack={() => setView('home')} 
          onSelect={(item) => { setSelectedItem(item); setView('detail'); }}
        />
      ) : view === 'detail' && selectedItem ? (
        <DetailScreen item={selectedItem} onBack={() => setView('home')} />
      ) : (
        <>
          {/* News Ticker */}
      <div className="bg-neon-red text-black py-2 overflow-hidden whitespace-nowrap border-b border-black">
        <motion.div 
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-block font-bold uppercase tracking-widest text-sm"
        >
          Breaking News: New GTA VI trailer rumors intensify • Anata Game receives major content update • Neverness to Everness gameplay revealed • Epic Games Store free game of the week is live!
        </motion.div>
      </div>

      {/* Secondary News Ticker */}
      <div className="bg-black text-neon-red py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
        <motion.div 
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="inline-block font-bold uppercase tracking-widest text-sm"
        >
          Esports Update: Valorant Champions Tour 2026 schedule released • BGMI Pro League Season 4 starts next week • PUBG Global Series qualifiers are heating up • Minecraft Championship 50 announced!
        </motion.div>
      </div>

      {/* Hero Section */}
      <header className="py-20 px-4 text-center bg-gradient-to-b from-[#111111] to-[#050505]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="font-display text-8xl font-bold text-neon-red neon-text-red">2026</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-5xl sm:text-7xl uppercase tracking-tighter leading-none mb-12"
        >
          Level Up Your <span className="text-neon-red neon-text-red">Gaming</span>
        </motion.h1>

        {/* Featured Games in Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {FEATURED_GAMES.map((game) => (
            <div key={game.id} className="glass-panel p-6 rounded-lg flex flex-col justify-between items-center text-center">
              <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
              <p className="text-neon-red text-xs font-bold uppercase tracking-widest mb-4">{game.category} • {game.size}</p>
              <button 
                onClick={() => { setSelectedItem(game); setView('detail'); }}
                className="bg-neon-red text-black font-bold uppercase tracking-widest px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-neon-red hover:text-black transition-all"
        >
          Explore All Games
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="py-20 px-4 max-w-7xl mx-auto space-y-20">
        
        {/* Category News Sections */}
        {['BGMI', 'GTA', 'Valorant', 'Free Fire', 'PUBG', 'Call of Duty', 'Minecraft', 'Ananta'].map((category) => (
          <section key={category}>
            <h2 className="font-display text-4xl uppercase tracking-tighter mb-8 border-l-4 border-neon-red pl-4">{category} Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {NEWS_DATA.filter(n => n.category === category).map((news) => (
                <div key={news.id} className="glass-panel p-6 rounded-lg flex justify-between items-center hover:border-neon-red transition-all">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                    <p className="text-white/60 text-sm">{news.summary}</p>
                  </div>
                  <button 
                    onClick={() => { setSelectedItem(news); setView('detail'); }}
                    className="text-neon-red font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Popular This Week Section */}
        <section className="mb-20">
          <h2 className="font-display text-5xl uppercase tracking-tighter mb-10 border-l-4 border-neon-red pl-4">Popular This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_THIS_WEEK.map((game) => (
              <div key={game.id} className="glass-panel p-6 rounded-lg hover:border-neon-red transition-all">
                <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                <p className="text-neon-red text-xs font-bold uppercase tracking-widest mb-3">{game.category} • {game.size}</p>
                <p className="text-white/60 text-sm mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-500 font-bold">★ {game.rating}</span>
                  <button 
                    onClick={() => { setSelectedItem(game); setView('detail'); }}
                    className="text-neon-red font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categorized Games Sections */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {['All', 'Android', 'PC', 'Console'].map(platform => (
            <button 
              key={platform}
              onClick={() => setFilter(platform as any)}
              className={`px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs ${filter === platform ? 'bg-neon-red' : 'bg-white/10'} hover:bg-neon-red transition-all`}
            >
              {platform} Games
            </button>
          ))}
        </div>
        {Object.entries(CATEGORIZED_GAMES).map(([category, games]) => {
          const filteredGames = games.filter(g => 
            (filter === 'Android' ? g.isAndroid : filter === 'PC' ? g.isPC : filter === 'Console' ? g.isConsole : true) &&
            g.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (filteredGames.length === 0) return null;
          return (
            <section key={category} className="mb-12">
              <h2 className="font-display text-4xl uppercase tracking-tighter mb-8 border-l-4 border-neon-red pl-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <div key={game.id} className="glass-panel p-6 rounded-lg hover:border-neon-red transition-all">
                    <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                    <p className="text-neon-red text-xs font-bold uppercase tracking-widest mb-3">{game.category} • {game.size}</p>
                    <p className="text-white/60 text-sm mb-4">{game.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-500 font-bold">★ {game.rating}</span>
                      <button 
                        onClick={() => { setSelectedItem(game); setView('detail'); }}
                        className="text-neon-red font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Trending Games Section */}
        <section>
          <h2 className="font-display text-5xl uppercase tracking-tighter mb-10 border-l-4 border-neon-red pl-4">Trending Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TRENDING_GAMES.map((game, i) => (
              <div key={game.id} className="glass-panel p-6 rounded-lg text-center hover:border-neon-red border border-white/10 transition-all cursor-pointer">
                <span className="text-4xl font-display text-white/20 mb-2 block">#{i + 1}</span>
                <h3 className="font-bold uppercase tracking-widest">{game.title}</h3>
                <p className="text-white/40 text-xs mt-1">{game.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section>
          <h2 className="font-display text-5xl uppercase tracking-tighter mb-10 border-l-4 border-neon-red pl-4">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEWS_DATA.slice(currentPage * 9, (currentPage + 1) * 9).map((news) => (
              <div key={news.id} className="glass-panel p-8 rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-neon-red text-[10px] font-bold uppercase tracking-widest border border-neon-red px-2 py-1">{news.category}</span>
                  <h3 className="text-2xl font-bold mt-4 mb-2">{news.title}</h3>
                  <p className="text-white/60 text-sm mb-6">{news.summary}</p>
                </div>
                <div className="flex items-center justify-between text-white/40 text-xs pt-6 border-t border-white/10">
                  <div className="flex items-center gap-1"><Clock size={12} /> {news.date}</div>
                  <div className="flex items-center gap-1"><MessageSquare size={12} /> {news.commentCount} Comments</div>
                  <button 
                    onClick={() => { setSelectedItem(news); setView('detail'); }}
                    className="flex items-center gap-1 text-neon-red font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Read More <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          {NEWS_DATA.length > 9 && (
            <div className="flex justify-center gap-4 mt-10">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="bg-white/10 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neon-red disabled:opacity-50"
              >
                Previous
              </button>
              <span className="flex items-center font-bold text-neon-red">Page {currentPage + 1} of {Math.ceil(NEWS_DATA.length / 9)}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(NEWS_DATA.length / 9) - 1, prev + 1))}
                disabled={currentPage === Math.ceil(NEWS_DATA.length / 9) - 1}
                className="bg-white/10 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neon-red disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Gamepad2 className="text-neon-red" size={24} />
            <span className="font-display text-2xl tracking-tighter uppercase">GameVerse</span>
          </div>
          <p className="text-white/40 text-sm max-w-md mx-auto">The ultimate hub for gaming news, launch dates, and expert tips.</p>
          <div className="flex justify-center gap-6">
            {['Twitter', 'Discord', 'YouTube', 'Twitch'].map((social) => (
              <button key={social} className="text-white/60 hover:text-neon-red text-xs font-bold uppercase tracking-widest transition-colors">
                {social}
              </button>
            ))}
          </div>
          <p className="text-white/20 text-xs font-bold uppercase tracking-[0.3em]">© 2026 GameVerse Hub. All rights reserved.</p>
        </div>
      </footer>
      </>
      )}
    </div>
  );
};

export default App;
