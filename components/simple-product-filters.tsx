'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Filter, 
  X, 
  Star, 
  Heart, 
  Sparkles,
  Baby,
  Shirt,
  Gamepad2,
  BookOpen,
  Palette,
  Puzzle,
  Car,
  Music,
  Zap
} from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  isDeal?: boolean;
  dealPrice?: number;
  tags?: string[];
}

interface FilterState {
  categories: string[];
  onSale: boolean;
}

interface SimpleProductFiltersProps {
  products: Product[];
  onFiltersChange: (filteredProducts: Product[]) => void;
  className?: string;
}

const CATEGORIES = [
  { name: 'Action Figures', icon: Zap, color: 'text-brana-blue' },
  { name: 'Arts & Crafts', icon: Palette, color: 'text-brana-pink' },
  { name: 'Board Games', icon: Puzzle, color: 'text-brana-purple' },
  { name: 'Building Blocks', icon: Gamepad2, color: 'text-brana-green' },
  { name: 'Dolls & Accessories', icon: Heart, color: 'text-brana-pink' },
  { name: 'Educational', icon: BookOpen, color: 'text-brana-blue' },
  { name: 'Electronic Toys', icon: Zap, color: 'text-brana-yellow' },
  { name: 'Outdoor Toys', icon: Car, color: 'text-brana-green' },
  { name: 'Musical Toys', icon: Music, color: 'text-brana-purple' },
  { name: 'Baby Toys', icon: Baby, color: 'text-brana-pink' },
  { name: 'Clothing', icon: Shirt, color: 'text-brana-blue' },
  { name: 'Special Deals', icon: Sparkles, color: 'text-brana-yellow' },
];

export function SimpleProductFilters({ products, onFiltersChange, className }: SimpleProductFiltersProps) {
  // Use a ref to track if this is the initial render
  const isInitialMount = React.useRef(true);
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    onSale: false,
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Get unique categories from products
  const availableCategories = React.useMemo(() => 
    Array.from(new Set(products.map(p => p.category))).sort(),
    [products]
  );

  // Apply filters and notify parent when they change
  React.useEffect(() => {
    // Skip the initial render to prevent double-calling with initial state
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    let result = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // On sale filter
    if (filters.onSale) {
      result = result.filter(product => product.isDeal);
    }

    onFiltersChange(result);
  }, [filters, products, onFiltersChange]);

  const toggleCategory = React.useCallback((category: string) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      // Return a new object to ensure state update
      return {
        ...prev,
        categories: newCategories
      };
    });
  }, []);

  // Memoize the filter application to prevent unnecessary recalculations
  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // On sale filter
    if (filters.onSale) {
      result = result.filter(product => product.isDeal);
    }

    return result;
  }, [filters, products]);

  // Call onFiltersChange only when filteredProducts changes
  React.useEffect(() => {
    onFiltersChange(filteredProducts);
  }, [filteredProducts, onFiltersChange]);

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      onSale: false,
    });
  };

  const getActiveFiltersCount = () => {
    return filters.categories.length + (filters.onSale ? 1 : 0);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} active
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="text-brana-pink hover:text-brana-pink hover:bg-brana-pink/10"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-brana-green flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Category
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isAvailable = availableCategories.includes(category.name);
            const isSelected = filters.categories.includes(category.name);
            
            return (
              <div
                key={category.name}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  isSelected ? 'bg-brana-green/10 border border-brana-green/20' : 'hover:bg-gray-50'
                } ${!isAvailable ? 'opacity-50' : 'cursor-pointer'}`}
              >
                <div className="flex items-center space-x-2 flex-1">
                  <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      id={`category-${category.name}`}
                      checked={isSelected}
                      onCheckedChange={() => isAvailable && toggleCategory(category.name)}
                      disabled={!isAvailable}
                      className={`h-5 w-5 rounded-md border-2 transition-colors duration-200 ${
                        isSelected 
                          ? 'bg-brana-green border-brana-green text-white' 
                          : 'border-gray-300 hover:border-brana-green hover:bg-gray-50'
                      }`}
                    />
                  </div>
                  <Icon className={`h-4 w-4 ${category.color} flex-shrink-0`} />
                  <label 
                    htmlFor={`category-${category.name}`}
                    className={`text-sm cursor-pointer select-none ${
                      isSelected ? 'font-medium text-brana-green' : 'text-gray-700'
                    }`}
                  >
                    {category.name}
                  </label>
                </div>
                {!isAvailable && (
                  <span className="text-xs text-gray-400 ml-auto">No items</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-brana-green flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Price Range (KSh)
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-brana-green focus:ring-1 focus:ring-brana-green"
            />
            <input
              type="number"
              placeholder="Max"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-brana-green focus:ring-1 focus:ring-brana-green"
            />
          </div>
        </div>
      </div>

      {/* On Sale */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-brana-green flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Special Offers
        </h3>
        <div className="space-y-2">
          <div
            className={`flex items-center p-2 rounded-lg transition-colors ${
              filters.onSale ? 'bg-brana-green/10 border border-brana-green/20' : 'hover:bg-gray-50'
            }`}
            onClick={() => setFilters(prev => ({ ...prev, onSale: !prev.onSale }))}
          >
            <div className="flex items-center space-x-2 flex-1">
              <Checkbox
                id="on-sale"
                checked={filters.onSale}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, onSale: !!checked }))}
                className={`h-5 w-5 rounded-md border-2 transition-colors duration-200 ${
                  filters.onSale 
                    ? 'bg-brana-green border-brana-green text-white' 
                    : 'border-gray-300 hover:border-brana-green hover:bg-gray-50'
                }`}
              />
              <label 
                htmlFor="on-sale" 
                className={`text-sm cursor-pointer select-none ${
                  filters.onSale ? 'font-medium text-brana-green' : 'text-gray-700'
                }`}
              >
                On Sale
              </label>
            </div>
            <span className="ml-auto px-2 py-1 bg-brana-yellow/20 text-brana-yellow-dark text-xs font-medium rounded-full whitespace-nowrap">
              Special Deal
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block ${className}`}>
        <Card className="sticky top-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-brana-green flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

