import { serviceImages, type ResponsiveImageAsset } from './images';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: ResponsiveImageAsset;
  imageAlt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'flatbed-vs-step-deck-choosing-the-right-trailer',
    title: 'Flatbed vs. Step Deck: Choosing the Right Open-Deck Trailer for Heavy Freight',
    excerpt: 'Understanding the height limits, loading capabilities, and securement requirements between standard flatbeds and step-deck trailers.',
    category: 'Equipment & Logistics',
    date: 'June 18, 2026',
    readTime: '4 min read',
    author: 'WolfWay Logistics Team',
    image: serviceImages.stepDeck,
    imageAlt: 'Step-deck trailer configured for tall industrial freight',
    content: `
      Choosing between a standard flatbed and a step-deck trailer is one of the most critical decisions in open-deck logistics.
      
      ### Standard Flatbed Trailers
      Standard flatbeds offer a flat 48-foot or 53-foot deck resting approximately 60 inches above the road. They are ideal for general machinery, steel coils, lumber, and pipe loads that fit within legal height limits (typically 13 feet 6 inches total height).

      ### Step-Deck (Single-Drop) Trailers
      Step-deck trailers feature an upper deck (for smaller cargo or dunnage) and a lower deck resting much closer to the ground (typically 36 to 42 inches). This lower deck height allows shippers to haul cargo up to 10 feet tall without requiring expensive over-height permits.

      ### Key Securement Considerations
      Whether utilizing flatbeds or step decks, proper weight distribution, grade 70 chains, heavy-duty ratchet straps, and corner protectors are required to ensure 100% FMCSA compliance.
    `
  },
  {
    slug: 'why-24-7-dispatch-prevents-costly-freight-delays',
    title: 'Why 24/7 Dispatch Communication Prevents Costly Freight Delays',
    excerpt: 'How real-time human communication between drivers, shippers, and dispatch eliminates detention, missed appointments, and routing errors.',
    category: 'Operations',
    date: 'June 05, 2026',
    readTime: '3 min read',
    author: 'WolfWay Dispatch Team',
    image: serviceImages.openDeck,
    imageAlt: 'Open-deck truck traveling an interstate freight corridor',
    content: `
      In open-deck transportation, timing is everything. A 30-minute delay at a crane unloading facility can disrupt an entire day's schedule.

      ### Human Dispatch vs. Call Centers
      Many large freight brokerages route driver inquiries to outsourced call centers that lack context. At WolfWay Logistics LLC, our dispatch coordinators operate 24/7 and know your load details directly.

      ### Proactive Delay Prevention
      By monitoring weather events, scale house delays, and facility loading queues, our dispatchers adjust routing in real time, keeping shippers informed and drivers rolling safely.
    `
  },
  {
    slug: 'how-air-ride-equipment-protects-high-value-machinery',
    title: 'How Air-Ride Equipment Protects High-Value Industrial Machinery',
    excerpt: 'The engineering behind air-ride suspension and why it is essential for sensitive industrial, CNC, and construction cargo.',
    category: 'Cargo Protection',
    date: 'May 22, 2026',
    readTime: '5 min read',
    author: 'WolfWay Fleet Safety',
    image: serviceImages.flatbed,
    imageAlt: 'Flatbed equipment carrying protected industrial cargo',
    content: `
      Vibration damage during transit is a hidden cost for machinery manufacturers. Traditional spring suspensions transfer road shocks directly to the cargo.

      ### The Air-Ride Advantage
      Air-ride suspension utilizes pressurized air bags to cushion the trailer deck, absorbing up to 80% of road vibration. This prevents internal mechanical calibration loss on CNC machines, transformers, and delicate industrial equipment.

      ### Complete Securement Protocol
      In addition to air-ride decks, WolfWay specifies custom rubber friction matting, edge guards, and custom tarping to shield valuable cargo from road debris and weather elements.
    `
  },
  {
    slug: 'what-experienced-cdl-drivers-look-for-in-a-carrier',
    title: 'What Experienced CDL-A Drivers Look for in a Carrier Partner',
    excerpt: 'Beyond per-mile rates: why respect, modern equipment, 1-day orientation, and predictable home-time matter most to professional drivers.',
    category: 'Driver Culture',
    date: 'May 10, 2026',
    readTime: '4 min read',
    author: 'WolfWay Recruiting',
    image: serviceImages.openDeck,
    imageAlt: 'Professional CDL-A driver operating open-deck equipment',
    content: `
      Driver retention in the trucking industry remains a primary challenge. Experienced open-deck drivers look for carriers that respect their time behind the wheel.

      ### Predictable Home-Time & Dedicated Corridors
      Drivers want to know when they will be home. By structuring dedicated lanes around regional hubs, carriers provide consistent home-time schedules.

      ### Fast 1-Day Orientation
      Nobody wants to sit in a hotel classroom for a week without earning. Streamlined 1-day orientation gets drivers on the road quickly.
    `
  }
];
