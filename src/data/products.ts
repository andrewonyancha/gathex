import Fuse from 'fuse.js';

// Define types for scalability (e.g., for future API responses)
export type Subcategory = 'engine' | 'brake-steering' | 'suspension-body' | 'electrical-light';

export type Brand = string;
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // URL or path to image
  category: 'new' | 'ex-japan';
  brand: Brand;
  features: string[];
  stock: number;
  subcategory: Subcategory;
};

// Static data (hardcoded for now). Later, this could be fetched from a server.
export const products: Product[] = [
  // New Parts
  {
    id: 'np-001',
    name: '555 Rack End, Stabilizer Link, Ball Joint',
    description: 'High-quality 555 rack end, stabilizer link, and ball joint for reliable steering and suspension.',
    price: 2000,
    image: '/images/products/555.jpeg', // Placeholder, to be updated later
    category: 'new',
    brand: 'in stock',
    features: ['Durable cast iron', 'Compatible with multiple vehicle models', '1-year warranty'],
    stock: 10,
    subcategory: 'suspension-body',
  },
  {
    id: 'np-002',
    name: 'RBI Rack End, Stabilizer Link, Ball Joint',
    description: 'RBI rack end, stabilizer link, and ball joint for enhanced vehicle stability.',
    price: 2000,
    image: '/images/products/rbi-suspension.jpeg', // Placeholder, to be updated later
    category: 'new',
    brand: 'in stock',
    features: ['High-strength materials', 'Precision engineering', '1-year warranty'],
    stock: 12,
    subcategory: 'suspension-body',
  },
  {
    id: 'np-003',
    name: 'Toyota Asimco Brake Pads',
    description: 'Asimco brake pads designed for Toyota vehicles, offering superior stopping power.',
    price: 1500,
    image: '/images/products/toyota-brake-pads.jpeg', // Placeholder, to be updated later
    category: 'new',
    brand: 'in stock',
    features: ['Low dust', 'Noise-reducing', 'Set of 4'],
    stock: 20,
    subcategory: 'brake-steering',
  },
  {
    id: 'np-004',
    name: '555 Ball Joint',
    description: 'Durable 555 ball joint for improved suspension performance.',
    price: 2000,
    image: '/images/products/555-ball-joint.jpeg', // Placeholder, to be updated later
    category: 'new',
    brand: 'in stock',
    features: ['High durability', 'Compatible with various models', '1-year warranty'],
    stock: 15,
    subcategory: 'suspension-body',
  },
  {
    id: 'np-005',
    name: 'SK20R11 Spark Plug',
    description: 'High-performance SK20R11 spark plug for efficient engine operation.',
    price: 600,
    image: '/images/products/sk20r11-spark-plug.jpeg', // Placeholder, to be updated later
    category: 'new',
    brand: 'in stock',
    features: ['Iridium tip', 'Improved fuel efficiency', 'Long lifespan'],
    stock: 50,
    subcategory: 'engine',
  },
  {
    id: 'np-006',
    name: 'SC20HR11 Spark Plug',
    description: 'SC20HR11 spark plug for reliable ignition and engine performance.',
    price: 600,
    image: '/images/products/sc20hr11-spark-plug.jpeg', // Placeholder, to be updated later
    category: 'new',
    brand: 'in stock',
    features: ['Iridium tip', 'Enhanced ignition', 'Long-lasting'],
    stock: 50,
    subcategory: 'engine',
  },
 
 
  // Ex-Japan Parts
  {
    id: 'ej-001',
    name: '555 Rack End, Stabilizer Link, Ball Joint',
    description: 'Used 555 rack end, stabilizer link, and ball joint sourced from Japan, fully tested.',
    price: 2000,
    image: '/images/products/555.jpeg', // Placeholder, to be updated later
    category: 'ex-japan',
    brand: 'in stock',
    features: ['Low mileage', 'OEM quality', '6-month warranty'],
    stock: 8,
    subcategory: 'suspension-body',
  },
  {
    id: 'ej-002',
    name: 'RBI Rack End, Stabilizer Link, Ball Joint',
    description: 'Used RBI rack end, stabilizer link, and ball joint from Japan, tested for reliability.',
    price: 2000,
    image: '/images/products/rbi-suspension.jpeg', // Placeholder, to be updated later
    category: 'ex-japan',
    brand: 'in stock',
    features: ['High-strength materials', 'Tested for performance', '6-month warranty'],
    stock: 10,
    subcategory: 'suspension-body',
  },
  {
    id: 'ej-003',
    name: 'Toyota Asimco Brake Pads',
    description: 'Used Asimco brake pads for Toyota vehicles, sourced from Japan.',
    price: 1500,
    image: '/images/products/toyota-brake-pads.jpeg', // Placeholder, to be updated later
    category: 'ex-japan',
    brand: 'in stock',
    features: ['Low wear', 'OEM quality', '6-month warranty'],
    stock: 15,
    subcategory: 'brake-steering',
  },
  {
    id: 'ej-004',
    name: '555 Ball Joint',
    description: 'Used 555 ball joint from Japan, tested for durability and performance.',
    price: 2000,
    image: '/images/products/555-ball-joint.jpeg', // Placeholder, to be updated later
    category: 'ex-japan',
    brand: 'in stock',
    features: ['Low mileage', 'High durability', '6-month warranty'],
    stock: 12,
    subcategory: 'suspension-body',
  },
  {
    id: 'ej-005',
    name: 'SK20R11 Spark Plug',
    description: 'Used SK20R11 spark plug from Japan, tested for reliable ignition.',
    price: 600,
    image: '/images/products/sk20r11-spark-plug.jpeg', // Placeholder, to be updated later
    category: 'ex-japan',
    brand: 'in stock',
    features: ['Iridium tip', 'Tested for performance', '6-month warranty'],
    stock: 40,
    subcategory: 'engine',
  },
  {
    id: 'ej-006',
    name: 'SC20HR11 Spark Plug',
    description: 'Used SC20HR11 spark plug from Japan, ensures reliable engine performance.',
    price: 600,
    image: '/images/products/sc20hr11-spark-plug.jpeg', // Placeholder, to be updated later
    category: 'ex-japan',
    brand: 'in stock',
    features: ['Iridium tip', 'Tested for reliability', '6-month warranty'],
    stock: 40,
    subcategory: 'engine',
  },
  {
    id: 'ej-007',
    name: 'SK20HR11 Spark Plug',
    description: 'Used SK20HR11 spark plug from Japan, optimized for engine efficiency.',
    price: 600,
    image: '/images/products/sk20hr11-spark-plug.jpeg', // Placeholder, to be updated later
    category: 'ex-japan',
    brand: 'in stock',
    features: ['Iridium tip', 'High performance', '6-month warranty'],
    stock: 40,
    subcategory: 'engine',
  },
  
];

// Function to get products by category (mimic async fetch for future dynamic)
export async function getProductsByCategory(category: 'new' | 'ex-japan'): Promise<Product[]> {
  // For now, filter static data. Later, replace with fetch('/api/products?category=' + category)
  return products.filter(p => p.category === category);
}

// Updated search function using Fuse.js for fuzzy, intelligent matching
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];

  // Fuse.js options: Customize for your needs
  const options = {
    // Keys to search, with weights (higher = more important)
    keys: [
      { name: 'name', weight: 0.4 },        // Prioritize name matches
      { name: 'description', weight: 0.3 }, // Then description
      { name: 'brand', weight: 0.2 },       // Brand
      { name: 'features', weight: 0.1 },    // Features array (Fuse handles arrays)
      { name: 'subcategory', weight: 0.1 }, // Subcategory for broader matches
    ],
    threshold: 0.3,            // 0 = exact match, 1 = match anything; 0.3 allows reasonable fuzziness
    ignoreLocation: true,      // Ignore position in string for better partial matches
    includeScore: true,        // Return scores for sorting
    minMatchCharLength: 2,     // Ignore very short queries per term
    findAllMatches: true,      // Find all matches, not just first
    shouldSort: true,          // Sort by score
    tokenize: true,            // Split query into words for AND matching
    matchAllTokens: true,      // Require all query words to match (intuitive AND)
  };

  const fuse = new Fuse(products, options);
  const results = fuse.search(query);

  // Return the actual Product objects, sorted by relevance (lower score = better)
  return results.map(result => result.item);
}

// Function for single product (for details page)
export async function getProductById(id: string): Promise<Product | undefined> {
  // Later, fetch('/api/products/' + id)
  return products.find(p => p.id === id);
}

// Additional exports for new-parts page
export const subcategories: Record<Subcategory, { title: string }> = {
  engine: { title: 'Engine' },
  'brake-steering': { title: 'Brake & Steering' },
  'suspension-body': { title: 'Suspension & Body' },
  'electrical-light': { title: 'Electrical & Light' },
};

export const brands: Brand[] = Array.from(new Set(products.map(p => p.brand)));

export async function getProductsGroupedBySubcategory(category: 'new' | 'ex-japan', brand?: Brand): Promise<Record<Subcategory, Product[]>> {
  const filtered = products.filter(p => p.category === category && (!brand || p.brand === brand));
  const grouped: Record<Subcategory, Product[]> = {
    engine: [],
    'brake-steering': [],
    'suspension-body': [],
    'electrical-light': [],
  };
  filtered.forEach(p => {
    grouped[p.subcategory].push(p);
  });
  return grouped;
}