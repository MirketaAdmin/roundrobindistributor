import { createElement } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarX,
  Check,
  CircleCheck,
  Clock,
  Cloud,
  Eye,
  History,
  LockKeyhole,
  Moon,
  Play,
  Rocket,
  SendHorizontal,
  ShoppingBag,
  Star,
  TimerOff,
  Zap,
} from 'lucide-react';
import militaryTech from '../../assets/icons/icon-military-tech.png';
import payments from '../../assets/icons/icon-payments.png';
import personOff from '../../assets/icons/icon-person-off.png';
import precisionManufacturing from '../../assets/icons/icon-precision-manufacturing.png';
import psychology from '../../assets/icons/icon-psychology.png';
import screenSettings from '../../assets/icons/icon-screen-settings.png';
import stackedWindows from '../../assets/icons/icon-stacked-windows.png';

// Approved icon library: lucide-react. Only icons that match the Figma glyphs are registered.
const ICONS = {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarX,
  Check,
  CircleCheck,
  Clock,
  Cloud,
  Eye,
  History,
  LockKeyhole,
  Moon,
  Play,
  Rocket,
  SendHorizontal,
  ShoppingBag,
  Star,
  TimerOff,
  Zap,
};

// Figma icons with no approved Lucide equivalent: transparent PNGs recovered from the
// 1x PNG reference by scripts/extract-png-assets.py (each crop spans its full tile/slot).
const IMAGE_ICONS = {
  'icon-military-tech': militaryTech,
  'icon-payments': payments,
  'icon-person-off': personOff,
  'icon-precision-manufacturing': precisionManufacturing,
  'icon-psychology': psychology,
  'icon-screen-settings': screenSettings,
  'icon-stacked-windows': stackedWindows,
};

/** Renders a Lucide icon by name, or an `img:<name>` raster icon recovered from the reference. */
export default function Icon({ name, className = '', ...rest }) {
  if (name.startsWith('img:')) {
    const src = IMAGE_ICONS[name.slice('img:'.length)];
    if (!src) throw new Error(`Image icon "${name}" is not registered`);
    return <img src={src} alt="" aria-hidden="true" className={`${className} icon-img`.trim()} />;
  }
  const component = ICONS[name];
  if (!component) throw new Error(`Icon "${name}" is not registered`);
  return createElement(component, { className, 'aria-hidden': true, ...rest });
}
