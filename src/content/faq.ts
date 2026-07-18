export interface FAQItem {
  question: string;
  answer: string;
  category: 'shippers' | 'drivers' | 'general';
}

export const shipperFAQs: FAQItem[] = [
  {
    category: 'shippers',
    question: 'What open-deck equipment configurations does WolfWay Logistics LLC offer?',
    answer: 'We coordinate transport across standard flatbeds, step decks, double drop trailers, and specialized open-deck equipment with air-ride suspension, tarps, chains, straps, and binders.'
  },
  {
    category: 'shippers',
    question: 'How fast can I receive a freight quote?',
    answer: 'Our dispatch team reviews quote requests immediately. You will typically receive a detailed rate estimate in less than 1 hour during business hours.'
  },
  {
    category: 'shippers',
    question: 'Do you handle over-dimensional or heavy haul freight?',
    answer: 'Yes. We coordinate permits, route planning, escort vehicles, and specialized step-deck or double-drop trailers for over-dimensional and heavy machinery loads across the lower 48 states.'
  },
  {
    category: 'shippers',
    question: 'How do you ensure cargo safety and securement?',
    answer: 'All open-deck shipments adhere strictly to FMCSA securement regulations. Drivers utilize heavy-duty grade 70 chains, ratchet straps, corner protectors, and heavy tarping where required.'
  },
  {
    category: 'shippers',
    question: 'What level of tracking and communication do you provide?',
    answer: 'We provide 24/7 real-time tracking updates and direct human dispatch communication from pickup confirmation through transit to final delivery.'
  }
];

export const driverFAQs: FAQItem[] = [
  {
    category: 'drivers',
    question: 'What CDL-A experience is required to drive with WolfWay Logistics LLC?',
    answer: 'We require a valid Class A CDL with at least 1 to 2 years of verifiable OTR experience. Open-deck or flatbed securement experience is preferred.'
  },
  {
    category: 'drivers',
    question: 'What type of equipment do drivers operate?',
    answer: 'Our fleet features late-model Volvos and Freightliners equipped with modern amenities, APUs, inverter systems, and air-ride open-deck trailers.'
  },
  {
    category: 'drivers',
    question: 'How does home-time work for OTR drivers?',
    answer: 'We build dedicated route corridors around your home state to guarantee predictable home-time schedules, including weekends-home options depending on your location.'
  },
  {
    category: 'drivers',
    question: 'How long does orientation take?',
    answer: 'We respect your time. Our orientation process takes 1 single day so you can complete paperwork, inspect your rig, and get on the road earning immediately.'
  },
  {
    category: 'drivers',
    question: 'Is there support available if I encounter issues on the road at night?',
    answer: 'Yes. Our dispatch and operations team is on call 24/7/365. You will always reach a real person who knows your route and load.'
  }
];
