import {
  AtSign,
  Calendar,
  Globe,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  MicVocal,
  PenLine,
  Phone,
  Radio,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { IconName } from "@/services/content/types";

const iconMap: Record<IconName, LucideIcon> = {
  mic: MicVocal,
  pen: PenLine,
  users: Users,
  radio: Radio,
  speaker: Megaphone,
  sparkles: Sparkles,
  star: Star,
  calendar: Calendar,
  map: MapPin,
  mail: Mail,
  phone: Phone,
  instagram: AtSign,
  facebook: Globe,
  whatsapp: MessageCircle,
};

type IconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

export function Icon({ name, className, strokeWidth = 1.5 }: IconProps) {
  const Component = iconMap[name];

  return <Component className={className} strokeWidth={strokeWidth} aria-hidden />;
}
