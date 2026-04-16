"use client";

import type { ReactNode } from "react";
import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { ModemFooter } from "@/components/ui/ModemFooter";
import {
  contactEmail,
  whatsappUrl,
  isWhatsappConfigured,
  isEmailConfigured,
} from "@/config/contact";

/**
 * SiteFooter — VINCENT-branded wrapper around ModemFooter.
 * Used at the bottom of / and /care.
 */
type SocialLink = {
  icon: ReactNode;
  href: string;
  label: string;
};

export default function SiteFooter() {
  const socialLinks: SocialLink[] = [];

  if (isWhatsappConfigured()) {
    socialLinks.push({
      icon: <MessageCircle className="w-6 h-6" />,
      href: whatsappUrl(),
      label: "WhatsApp",
    });
  }
  if (isEmailConfigured() && contactEmail) {
    socialLinks.push({
      icon: <Mail className="w-6 h-6" />,
      href: `mailto:${contactEmail}`,
      label: "Correo",
    });
  }
  socialLinks.push({
    icon: <Instagram className="w-6 h-6" />,
    href: "https://instagram.com/vincent.mx",
    label: "Instagram",
  });
  socialLinks.push({
    icon: <Linkedin className="w-6 h-6" />,
    href: "https://linkedin.com/company/vincent-growth",
    label: "LinkedIn",
  });

  const navLinks = [
    { label: "Oferta", href: "/#offers" },
    { label: "Secuencia", href: "/#sequence" },
    { label: "Casos", href: "/#work" },
    { label: "Foco salud", href: "/#health-focus" },
    { label: "Vincent Care", href: "/care" },
    { label: "Founders", href: "/#nosotros" },
    { label: "Preguntas", href: "/#faq" },
    { label: "Brief", href: "/#brief" },
  ];

  return (
    <ModemFooter
      brandName="VINCENT"
      brandDescription="Pintamos con código y con IA para que tu marca trabaje de noche y tú recuperes el día."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="Vincent"
      creatorUrl="https://vincent.mx"
    />
  );
}
