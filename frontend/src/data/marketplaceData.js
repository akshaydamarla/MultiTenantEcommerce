import {
  Dumbbell,
  Gem,
  House,
  Laptop,
  Shirt,
  Sparkles,
} from 'lucide-react'

export const categories = [
  { name: 'Electronics', icon: Laptop },
  { name: 'Fashion', icon: Shirt },
  { name: 'Home & Living', icon: House },
  { name: 'Accessories', icon: Gem },
  { name: 'Sports', icon: Dumbbell },
  { name: 'Beauty', icon: Sparkles },
]

export const featuredProducts = [
  {
    id: 'wireless-headphones',
    name: 'Wireless Headphones',
    vendor: 'TechWorld Electronics',
    price: '₹2,499',
    rating: '4.5',
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 'linen-overshirt',
    name: 'Linen Overshirt',
    vendor: 'FashionHub',
    price: '₹1,899',
    rating: '4.8',
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 'ceramic-table-set',
    name: 'Ceramic Table Set',
    vendor: 'HomeStyle',
    price: '₹1,249',
    rating: '4.6',
    stock: 'In Stock',
    image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 'smart-watch-pro',
    name: 'Smart Watch Pro',
    vendor: 'GadgetZone',
    price: '₹3,999',
    rating: '4.7',
    stock: 'Only 4 left',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=640&q=80',
  },
]

export const featuredVendors = [
  { name: 'TechWorld Electronics', category: 'Electronics & Gadgets' },
  { name: 'FashionHub', category: 'Fashion & Apparel' },
  { name: 'HomeStyle', category: 'Home & Living' },
  { name: 'GadgetZone', category: 'Smart Devices' },
]