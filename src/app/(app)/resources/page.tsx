import { Search, MapPin, Phone, Navigation } from "lucide-react";

export const metadata = {
  title: "Free Care Finder | MannSaathi",
};

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="space-y-4">
        <h1 className="font-display font-bold text-4xl text-text-primary">Free Care Finder</h1>
        <p className="text-text-secondary text-lg">Find zero-cost or heavily subsidized healthcare options near you.</p>
      </header>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input 
            type="text" 
            placeholder="Search clinics, schemes, or medicines..."
            className="w-full bg-surface-800 border border-surface-600 rounded-xl py-3 pl-12 pr-4 text-text-primary focus:outline-none focus:border-primary-500"
          />
        </div>
        <button className="bg-surface-800 border border-surface-600 px-4 py-3 rounded-xl hover:bg-surface-700 transition-colors flex items-center gap-2 text-text-primary">
          <MapPin className="w-5 h-5 text-primary-500" /> Lucknow
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "General Checkup", "Mental Health", "Free Medicines", "Women's Health"].map((filter, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full border ${i === 0 ? 'bg-primary-500/10 border-primary-500 text-primary-400' : 'bg-surface-800 border-surface-700 text-text-secondary hover:text-text-primary'} text-sm font-medium transition-colors`}>
            {filter}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface-800 border border-surface-700 rounded-2xl p-6 hover:border-primary-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-display font-semibold text-xl text-text-primary mb-1">Jan Aushadhi Store</h3>
                <p className="text-text-secondary text-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Gomti Nagar, 0.8 km away
                </p>
              </div>
              <span className="bg-accent-500/10 text-accent-500 text-xs px-2 py-1 rounded-full border border-accent-500/20 font-medium">
                Open Now
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs bg-surface-700 px-2 py-1 rounded text-text-primary">✅ Subsidized Medicines</span>
              <span className="text-xs bg-surface-700 px-2 py-1 rounded text-text-primary">✅ Walk-in</span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-surface-700 hover:bg-surface-600 text-text-primary py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <Navigation className="w-4 h-4" /> Directions
              </button>
              <button className="flex-1 bg-surface-700 hover:bg-surface-600 text-text-primary py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <Phone className="w-4 h-4" /> Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
