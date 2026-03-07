import React from 'react';
import { NEWS_DATA, CATEGORIZED_GAMES, NewsItem, GameDetail } from '../data/games';
import { ChevronRight, Clock, MessageSquare } from 'lucide-react';

interface SearchResultsProps {
  searchQuery: string;
  onBack: () => void;
  onSelect: (item: NewsItem | GameDetail) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, onBack, onSelect }) => {
  const filteredNews = NEWS_DATA.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGames = Object.values(CATEGORIZED_GAMES).flat().filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <button onClick={onBack} className="mb-8 text-neon-red font-bold uppercase tracking-widest hover:text-white">
        ← Back to Home
      </button>
      <h1 className="font-display text-5xl uppercase tracking-tighter mb-12">Search Results for "{searchQuery}"</h1>
      
      <section className="mb-20">
        <h2 className="font-display text-3xl uppercase tracking-tighter mb-8 border-l-4 border-neon-red pl-4">Games</h2>
        {filteredGames.length === 0 ? <p className="text-white/60">No games found.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <div key={game.id} className="glass-panel p-6 rounded-lg hover:border-neon-red transition-all">
                <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                <p className="text-neon-red text-xs font-bold uppercase tracking-widest mb-3">{game.category} • {game.size}</p>
                <p className="text-white/60 text-sm mb-4">{game.description}</p>
                <button 
                  onClick={() => onSelect(game)}
                  className="text-neon-red font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-3xl uppercase tracking-tighter mb-8 border-l-4 border-neon-red pl-4">News</h2>
        {filteredNews.length === 0 ? <p className="text-white/60">No news found.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
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
                    onClick={() => onSelect(news)}
                    className="flex items-center gap-1 text-neon-red font-bold uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Read More <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
