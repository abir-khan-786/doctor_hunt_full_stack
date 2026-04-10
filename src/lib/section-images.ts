/** Unsplash — healthcare / people (format optimized for next/image). */
const q = "auto=format&fit=crop";

export const sectionImages = {
  hero: `https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?${q}&w=960&q=80`,
  features: [
    `https://images.unsplash.com/photo-1576091160550-e3a01e7730b0?${q}&w=640&q=80`,
    `https://images.unsplash.com/photo-1516549655169-df83a0774514?${q}&w=640&q=80`,
    `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?${q}&w=640&q=80`,
  ],
  howItWorks: [
    `https://images.unsplash.com/photo-1579684385127-1ef15d508118?${q}&w=480&q=80`,
    `https://images.unsplash.com/photo-1506126613408-eca07ce68773?${q}&w=480&q=80`,
    `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?${q}&w=480&q=80`,
  ],
  reviews: [
    `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?${q}&w=128&q=80`,
    `https://images.unsplash.com/photo-1494790108377-be9c29b29330?${q}&w=128&q=80`,
    `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?${q}&w=128&q=80`,
    `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?${q}&w=128&q=80`,
  ],
  cta: `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?${q}&w=1200&q=80`,
} as const;

export const doctorFallbackImages = [
  `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?${q}&w=400&q=80`,
  `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?${q}&w=400&q=80`,
  `https://images.unsplash.com/photo-1594824476967-48c8b964273f?${q}&w=400&q=80`,
] as const;
