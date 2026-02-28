import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Calendar, Users, ExternalLink, MapPin, Sparkles, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion, useInView, useAnimation } from "framer-motion";

/**
 * QatAIyef: AI Engineering Nights - Event Registration Website
 * Design Philosophy: Heritage Modern Ramadan + Tech
 * - Deep maroon/dark backgrounds with golden accents
 * - Ramadan decorations: lanterns, crescent moon, stars, fawanees
 * - Speaker photos with golden border frames
 * - Islamic geometric patterns + tech circuit overlays
 * - Animated floating elements and scroll animations
 */

interface Speaker {
  name: string;
  role: string;
  company: string;
  country: string;
  linkedinUrl: string;
  imageUrl?: string;
}

interface DaySchedule {
  day: number;
  date: string;
  title: string;
  description: string;
  speakers: Speaker[];
  isPanel?: boolean;
}

const schedule: DaySchedule[] = [
  {
    day: 1,
    date: "March 8, 2026",
    title: "Build a Secure GenAI App",
    description:
      "From Idea to Production — Learn modern GenAI application architecture, internal data flows, and security best practices to build robust AI products.",
    speakers: [
      {
        name: "Bady Ammar",
        role: "Creative Strategist",
        company: "Independent / Consultant",
        country: "🇸🇦 Saudi Arabia",
        linkedinUrl: "https://sa.linkedin.com/in/bady-ammar",
        imageUrl: "/images/speakers/bady-ammar.jpg",
      },
    ],
  },
  {
    day: 2,
    date: "March 9, 2026",
    title: "RAG that Actually Works",
    description:
      "Master Retrieval-Augmented Generation with practical methodologies for integrating LLMs with private datasets and building scalable retrieval pipelines.",
    speakers: [
      {
        name: "Abdelrahman Hafrag",
        role: "Co-Founder",
        company: "Almach AI",
        country: "🇺🇸 United States",
        linkedinUrl: "https://www.linkedin.com/in/abdulhafrag/",
        imageUrl: "/images/speakers/abdelrahman-hafrag.jpg",
      },
    ],
  },
  {
    day: 3,
    date: "March 10, 2026",
    title: "From Repo to Production",
    description:
      "Deploying AI Apps the Right Way — Strategic deployment, version control, and scalable management while balancing cost, reliability, and performance.",
    speakers: [
      {
        name: "Hany Saad",
        role: "Senior Software Engineering Manager",
        company: "ITWorx",
        country: "🇪🇬 Egypt",
        linkedinUrl: "https://eg.linkedin.com/in/hanysaad",
        imageUrl: "/images/speakers/hany-saad.jpg",
      },
    ],
  },
  {
    day: 4,
    date: "March 11, 2026",
    title: "Agentic AI, Tools, MCPs",
    description:
      "Beyond Chatbots — Discover how AI agents engage in multi-step reasoning, integrate external tools, and orchestrate complex workflows.",
    speakers: [
      {
        name: "Ayman Mostafa",
        role: "AI Engineer & Host of AI World Podcast",
        company: "Bits & Bytes AI",
        country: "🇪🇬 Egypt",
        linkedinUrl: "https://www.linkedin.com/in/ayman-hamed-moustafa",
        imageUrl: "/images/speakers/ayman-mostafa.jpg",
      },
    ],
  },
  {
    day: 5,
    date: "March 12, 2026",
    title: "Evaluating, Monitoring & Trusting LLM Systems",
    description:
      "Foster trust in AI systems by rigorously evaluating LLM outputs, monitoring production behavior, and implementing effective feedback loops.",
    speakers: [
      {
        name: "Fam Louiz",
        role: "HPC & AI Software Engineer",
        company: "Deutsche Bahn",
        country: "🇩🇪 Germany",
        linkedinUrl: "https://www.linkedin.com/in/famalouiz/",
        imageUrl: "/images/speakers/fam-louiz.jpg",
      },
    ],
  },
  {
    day: 6,
    date: "March 13, 2026",
    title: "Intensive Career Night: AI & Engineering Paths",
    description:
      "PANEL DAY — Gain invaluable insights into recruitment practices, role expectations, learning trajectories, and career pathways in AI, DevOps, and cybersecurity.",
    speakers: [
      {
        name: "Dr. Marwa El Hefnawy",
        role: "AI and 5G/6G System Engineering Expert",
        company: "Apple, Intel, Huawei",
        country: "🇪🇬 Egypt",
        linkedinUrl: "https://www.linkedin.com/in/marwa-el-hefnawy-ph-d-06267373/",
        imageUrl: "/images/speakers/marwa-el-hefnawy.jpg",
      },
      {
        name: "Omar Samir",
        role: "AI & Data Consultant",
        company: "EY",
        country: "🇪🇬 Egypt",
        linkedinUrl: "https://eg.linkedin.com/in/omar-samir-8415b2285",
        imageUrl: "/images/speakers/omar-samir.jpg",
      },
      {
        name: "Ayman Saber",
        role: "GenAI Engineer",
        company: "VOIS",
        country: "🇪🇬 Egypt",
        linkedinUrl: "https://eg.linkedin.com/in/ayrosa",
        imageUrl: "/images/speakers/ayman-saber.jpg",
      },
    ],
    isPanel: true,
  },
  {
    day: 7,
    date: "March 14, 2026",
    title: "Entrepreneurship Night: Ship a Successful AI Product",
    description:
      "PANEL DAY — A pragmatic guide to validating ideas, defining MVPs, constructing product roadmaps, and launching reliable AI-powered solutions.",
    speakers: [
      {
        name: "Dr. Amani Eissa",
        role: "VP of Artificial Intelligence",
        company: "Keheilan",
        country: "🇪🇬 Egypt",
        linkedinUrl: "https://eg.linkedin.com/in/amany-h-b-eissa-a9108b52",
        imageUrl: "/images/speakers/amani-eissa.jpg",
      },
      {
        name: "Ahmed Abdelhamid",
        role: "Investor - Deeptech",
        company: "Keheilan",
        country: "🇪🇬 Egypt",
        linkedinUrl: "https://be.linkedin.com/in/ahmedabdelhamid",
        imageUrl: "/images/speakers/ahmed-abdelhamid.jpg",
      },
    ],
    isPanel: true,
  },
];

/* ───── Animated section wrapper ───── */
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───── Floating decoration component ───── */
function FloatingDecoration({ src, className, duration = 6, delay = 0 }: { src: string; className: string; duration?: number; delay?: number }) {
  return (
    <motion.img
      src={src}
      className={`absolute pointer-events-none select-none ${className}`}
      animate={{
        y: [0, -15, 0, 10, 0],
        rotate: [0, 2, -2, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      alt=""
    />
  );
}

/* ───── Speaker avatar with golden frame ───── */
function SpeakerAvatar({ speaker, size = "md" }: { speaker: Speaker; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-28 h-28",
    lg: "w-36 h-36",
  };
  const initials = speaker.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={`${sizeClasses[size]} rounded-full ring-3 ring-[#B58D53] ring-offset-2 ring-offset-[#631616] overflow-hidden flex-shrink-0`}>
      {speaker.imageUrl ? (
        <img
          src={speaker.imageUrl}
          alt={speaker.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
          }}
        />
      ) : null}
      <div
        className={`${speaker.imageUrl ? "hidden" : ""} w-full h-full bg-gradient-to-br from-[#B58D53] to-[#96542E] flex items-center justify-center text-white font-bold ${size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-base"}`}
      >
        {initials}
      </div>
    </div>
  );
}

/* ───── Twinkling stars background ───── */
function TwinklingStars() {
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-[#B58D53]"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    position: "",
    ieeeStatus: "",
    ieeeMembershipId: "",
    resumeUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-()]{7,20}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.university.trim()) errors.university = "University/Organization is required";
    if (!formData.position.trim()) errors.position = "Current position is required";
    if (formData.ieeeStatus && formData.ieeeStatus !== "not-member" && !formData.ieeeMembershipId.trim()) {
      errors.ieeeMembershipId = "Please enter your IEEE membership ID";
    }
    if (formData.resumeUrl && !/^https?:\/\/.+/.test(formData.resumeUrl)) {
      errors.resumeUrl = "Please enter a valid URL starting with http:// or https://";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the highlighted errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const formBody = new FormData();
      formBody.append("name", formData.name);
      formBody.append("email", formData.email);
      formBody.append("phone", formData.phone);
      formBody.append("university", formData.university);
      formBody.append("position", formData.position);
      formBody.append("ieeeStatus", formData.ieeeStatus || "N/A");
      formBody.append("ieeeMembershipId", formData.ieeeMembershipId || "N/A");
      formBody.append("resumeUrl", formData.resumeUrl || "N/A");

      await fetch(
        "https://script.google.com/macros/s/AKfycbxAF7Tb8VRJmrII_8OzdBmv3a49Ver8x5YKvUBmYlq2A5tw5z9QJFnXsK_Z4B3Olec/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: formBody,
        }
      );

      toast.success("Registration submitted successfully! We'll be in touch soon. 🎉");
      setFormData({
        name: "",
        email: "",
        phone: "",
        university: "",
        position: "",
        ieeeStatus: "",
        ieeeMembershipId: "",
        resumeUrl: "",
      });
      setFormErrors({});
    } catch (error) {
      toast.error("Failed to submit registration. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2A0F0F]">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <header className="sticky top-0 z-50 bg-[#3D2317]/95 backdrop-blur-md border-b border-[#B58D53]/30 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/brand/qataiyef-logo.jpeg"
              alt="QatAIyef Logo"
              className="h-11 w-11 rounded-full ring-2 ring-[#B58D53]/50 object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-[#FDF0C4] tracking-wide">QatAIyef</h1>
              <p className="text-[10px] text-[#B58D53] uppercase tracking-widest">AI Engineering Nights</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            {[
              { href: "#agenda", label: "Agenda" },
              { href: "#speakers", label: "Speakers" },
              { href: "#register", label: "Register" },
              { href: "#partnerships", label: "Partners" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#FDF0C4]/80 hover:text-[#B58D53] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B58D53] transition-all group-hover:w-full" />
              </a>
            ))}
            <Button
              size="sm"
              className="bg-[#B58D53] hover:bg-[#B58D53]/80 text-[#3D2317] font-bold px-5"
              onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
            >
              Register Now
            </Button>
          </nav>
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-[#B58D53]"
            onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
          >
            Register
          </Button>
        </div>
      </header>

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/ramadan-hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A0F0F]/40 via-[#2A0F0F]/30 to-[#2A0F0F]" />

        {/* Floating decorations */}
        <FloatingDecoration
          src="/images/decorations/lantern.png"
          className="top-4 left-4 md:left-16 w-16 md:w-24 opacity-80"
          duration={5}
        />
        <FloatingDecoration
          src="/images/decorations/lantern.png"
          className="top-8 right-8 md:right-20 w-12 md:w-20 opacity-60"
          duration={7}
          delay={1}
        />
        <FloatingDecoration
          src="/images/decorations/star.png"
          className="top-[30%] left-[10%] w-10 md:w-14 opacity-50"
          duration={4}
          delay={2}
        />
        <FloatingDecoration
          src="/images/decorations/star-ai.png"
          className="bottom-[30%] right-[5%] w-12 md:w-16 opacity-40"
          duration={6}
          delay={0.5}
        />
        <FloatingDecoration
          src="/images/decorations/moon.png"
          className="top-[15%] right-[30%] w-14 md:w-20 opacity-60"
          duration={8}
          delay={1.5}
        />

        {/* Decorative bunting at top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <img
            src="/images/decorations/decorations.png"
            alt=""
            className="w-32 md:w-48 opacity-70"
          />
        </div>

        <TwinklingStars />

        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <motion.div
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B58D53]/20 border border-[#B58D53]/40 rounded-full backdrop-blur-sm"
                animate={{ boxShadow: ["0 0 20px rgba(181,141,83,0.1)", "0 0 30px rgba(181,141,83,0.3)", "0 0 20px rgba(181,141,83,0.1)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Calendar className="w-4 h-4 text-[#B58D53]" />
                <span className="text-sm font-semibold text-[#FDF0C4]">
                  March 8–14, 2026 • 9 PM – 11 PM Cairo Time
                </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/images/brand/qataiyef-logo-circle.png"
              alt="QatAIyef Logo"
              className="w-48 h-48 md:w-40 md:h-40 mx-auto mb-6 rounded-full ring-4 ring-[#B58D53]/60 shadow-2xl shadow-[#B58D53]/20"
            />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
            style={{
              background: "linear-gradient(135deg, #FDF0C4 0%, #B58D53 50%, #FDF0C4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            QatAIyef
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[#B58D53] mb-3 font-semibold tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            AI Engineering Nights
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-[#FDF0C4]/80 mb-4 max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            From GenAI Apps to Production &amp; Careers
          </motion.p>

          <motion.p
            className="text-sm text-[#FDF0C4]/60 mb-10 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            A distinguished 7-day online technical event by IEEE EUI Computer Society,
            guiding you through secure GenAI development, production deployment, and career pathways in AI engineering.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-[#B58D53] hover:bg-[#B58D53]/90 text-[#3D2317] font-bold px-10 py-6 text-lg shadow-lg shadow-[#B58D53]/30 hover:shadow-xl hover:shadow-[#B58D53]/40 transition-all"
              onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
            >
              ✨ Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#B58D53]/60 text-[#FDF0C4] hover:bg-[#B58D53]/10 hover:border-[#B58D53] font-semibold px-8 py-6 text-lg transition-all"
              onClick={() => document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Agenda
            </Button>
          </motion.div>

          {/* Organizer logos */}
          <motion.div
            className="flex items-center justify-center gap-6 mt-12 opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="text-xs text-[#FDF0C4]/50 uppercase tracking-wider">Organized by</span>
            <img src="/images/brand/ieee-logo.jpg" alt="IEEE EUI" className="h-10 object-contain rounded" />
            <img src="/images/brand/ieee-cs-eui.png" alt="IEEE EUI CS" className="h-10 object-contain rounded" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#B58D53]/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#B58D53]/70 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ EVENT INFO CARDS ═══════════════════ */}
      <section className="py-16 bg-[#3D2317] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/ramadan-pattern-bg.png')", backgroundSize: "cover" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Calendar className="w-10 h-10 text-[#B58D53]" />,
                title: "7 Nights of AI",
                desc: "March 8–14, 2026 • 9 PM – 11 PM Cairo Time",
              },
              {
                icon: <Users className="w-10 h-10 text-[#B58D53]" />,
                title: "10+ Expert Speakers",
                desc: "Industry leaders from across the globe",
              },
              {
                icon: <Sparkles className="w-10 h-10 text-[#B58D53]" />,
                title: "Free Online Event",
                desc: "Register now and join from anywhere",
              },
            ].map((card, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <Card className="p-6 bg-[#2A0F0F]/80 border border-[#B58D53]/20 hover:border-[#B58D53]/50 transition-all hover:shadow-lg hover:shadow-[#B58D53]/10 backdrop-blur-sm group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#B58D53]/10 group-hover:bg-[#B58D53]/20 transition-colors">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#FDF0C4] mb-1">{card.title}</h3>
                      <p className="text-[#FDF0C4]/70 text-sm">{card.desc}</p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ AGENDA SECTION ═══════════════════ */}
      <section id="agenda" className="py-20 bg-[#2A0F0F] relative overflow-hidden">
        {/* Decorative elements */}
        <FloatingDecoration
          src="/images/decorations/star.png"
          className="top-20 right-10 w-12 opacity-30"
          duration={5}
        />
        <FloatingDecoration
          src="/images/decorations/dec2.png"
          className="bottom-20 left-5 w-20 opacity-20"
          duration={7}
          delay={1}
        />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src="/images/decorations/star-ai.png" alt="" className="w-8 h-8 opacity-70" />
                <h2 className="text-4xl md:text-5xl font-bold text-[#FDF0C4]">
                  Event Agenda
                </h2>
                <img src="/images/decorations/star-ai.png" alt="" className="w-8 h-8 opacity-70" />
              </div>
              <p className="text-[#FDF0C4]/60 max-w-2xl mx-auto">
                7 nights of deep-dive sessions covering the full AI engineering lifecycle — from secure GenAI development to entrepreneurship.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8 max-w-5xl mx-auto">
            {schedule.map((daySchedule, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                {daySchedule.isPanel ? (
                  /* ──── PANEL DISCUSSION CARD ──── */
                  <div className="group relative rounded-2xl overflow-hidden border-2 border-[#B58D53]/30 hover:border-[#B58D53]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#B58D53]/15" style={{ background: "linear-gradient(135deg, #3D2317 0%, #2A0F0F 50%, #631616/40 100%)" }}>
                    {/* Top gold accent bar */}
                    <div className="h-1.5 bg-gradient-to-r from-[#B58D53] via-[#FDF0C4] to-[#B58D53]" />

                    <div className="p-8">
                      {/* Panel header */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B58D53] to-[#96542E] text-[#3D2317] px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg">
                          <img src="/images/decorations/moon.png" alt="" className="w-4 h-4" />
                          Night {daySchedule.day}
                        </span>
                        <span className="text-[#B58D53]/80 text-sm">{daySchedule.date}</span>
                        <span className="inline-flex items-center gap-1.5 bg-[#FDF0C4]/10 border border-[#B58D53]/40 text-[#FDF0C4] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                          <Users className="w-3.5 h-3.5" />
                          Panel Discussion
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-[#FDF0C4] mb-3 group-hover:text-[#B58D53] transition-colors">
                        {daySchedule.title}
                      </h3>
                      <p className="text-[#FDF0C4]/60 text-sm mb-8 leading-relaxed max-w-3xl">{daySchedule.description}</p>

                      {/* Panel speakers grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {daySchedule.speakers.map((speaker, si) => (
                          <a
                            key={si}
                            href={speaker.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-[#2A0F0F]/60 rounded-xl border border-[#B58D53]/10 hover:border-[#B58D53]/40 hover:bg-[#2A0F0F]/80 transition-all group/card hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#B58D53]/10"
                          >
                            <SpeakerAvatar speaker={speaker} size="md" />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-[#FDF0C4] group-hover/card:text-[#B58D53] transition-colors truncate">
                                {speaker.name}
                              </p>
                              <p className="text-xs text-[#B58D53] mt-0.5">{speaker.role}</p>
                              <p className="text-xs text-[#FDF0C4]/40 mt-0.5">{speaker.company}</p>
                              <p className="text-xs text-[#FDF0C4]/30">{speaker.country}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[#B58D53]/40 group-hover/card:text-[#B58D53] transition-colors flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ──── REGULAR SESSION CARD ──── */
                  <div className="group relative bg-gradient-to-r from-[#3D2317] to-[#3D2317]/80 rounded-xl overflow-hidden border border-[#B58D53]/15 hover:border-[#B58D53]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#B58D53]/10">
                    {/* Gold accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B58D53] to-[#96542E]" />

                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Speaker photo - LEFT side */}
                        <div className="flex md:flex-col items-center gap-3 md:min-w-[160px]">
                          {daySchedule.speakers.map((speaker, si) => (
                            <SpeakerAvatar key={si} speaker={speaker} size="lg" />
                          ))}
                        </div>

                        {/* Content - RIGHT side */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="inline-flex items-center gap-1.5 bg-[#B58D53] text-[#3D2317] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
                              <img src="/images/decorations/moon.png" alt="" className="w-3.5 h-3.5" />
                              Night {daySchedule.day}
                            </span>
                            <span className="text-[#B58D53]/80 text-sm">{daySchedule.date}</span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold text-[#FDF0C4] mb-2 group-hover:text-[#B58D53] transition-colors">
                            {daySchedule.title}
                          </h3>
                          <p className="text-[#FDF0C4]/60 text-sm mb-4 leading-relaxed">{daySchedule.description}</p>

                          {/* Speaker info */}
                          <div className="flex flex-wrap gap-4">
                            {daySchedule.speakers.map((speaker, si) => (
                              <a
                                key={si}
                                href={speaker.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-2 bg-[#2A0F0F]/60 rounded-lg hover:bg-[#B58D53]/10 transition-colors group/link"
                              >
                                <div>
                                  <p className="text-sm font-semibold text-[#FDF0C4] group-hover/link:text-[#B58D53] transition-colors">
                                    {speaker.name}
                                  </p>
                                  <p className="text-xs text-[#FDF0C4]/50">
                                    {speaker.role} • {speaker.company}
                                  </p>
                                  <p className="text-xs text-[#B58D53]/70">{speaker.country}</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-[#B58D53]/50 group-hover/link:text-[#B58D53] transition-colors flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SPEAKERS SECTION ═══════════════════ */}
      <section id="speakers" className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #3D2317 0%, #2A0F0F 100%)" }}>
        {/* Decorative lanterns */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-8 pointer-events-none">
          <FloatingDecoration
            src="/images/decorations/lantern.png"
            className="w-14 opacity-40 !relative"
            duration={6}
          />
          <FloatingDecoration
            src="/images/decorations/lantern.png"
            className="w-10 opacity-30 !relative"
            duration={5}
            delay={1.5}
          />
          <FloatingDecoration
            src="/images/decorations/lantern.png"
            className="w-16 opacity-35 !relative"
            duration={7}
            delay={0.5}
          />
          <FloatingDecoration
            src="/images/decorations/lantern.png"
            className="w-12 opacity-25 !relative hidden md:block"
            duration={5.5}
            delay={2}
          />
        </div>

        <TwinklingStars />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src="/images/decorations/moon.png" alt="" className="w-10 h-10 opacity-60" />
                <h2 className="text-4xl md:text-5xl font-bold text-[#FDF0C4]">
                  Our Speakers
                </h2>
                <img src="/images/decorations/moon.png" alt="" className="w-10 h-10 opacity-60 scale-x-[-1]" />
              </div>
              <p className="text-[#FDF0C4]/60 max-w-2xl mx-auto">
                Learn from industry experts and thought leaders in AI engineering, DevOps, cybersecurity, and entrepreneurship.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {schedule.flatMap((day) =>
              day.speakers.map((speaker, index) => (
                <AnimatedSection key={`${day.day}-${index}`} delay={index * 0.1}>
                  <a
                    href={speaker.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="overflow-hidden bg-[#2A0F0F]/80 border border-[#B58D53]/15 hover:border-[#B58D53]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#B58D53]/15 group backdrop-blur-sm hover:-translate-y-1">
                      {/* Speaker image area */}
                      <div className="h-48 bg-gradient-to-br from-[#631616]/40 to-[#3D2317] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/ramadan-pattern-bg.png')", backgroundSize: "cover" }} />
                        <SpeakerAvatar speaker={speaker} size="lg" />
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-[#B58D53]/0 group-hover:bg-[#B58D53]/5 transition-colors duration-300" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-bold text-[#FDF0C4] mb-1 group-hover:text-[#B58D53] transition-colors">
                          {speaker.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#B58D53] mb-2">{speaker.role}</p>
                        <p className="text-xs text-[#FDF0C4]/50">{speaker.company}</p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-[#FDF0C4]/40">{speaker.country}</p>
                          <div className="flex items-center gap-1 text-[#B58D53]/60 group-hover:text-[#B58D53] transition-colors">
                            <span className="text-xs">LinkedIn</span>
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                        {/* Day indicator */}
                        <div className="mt-3 pt-3 border-t border-[#B58D53]/10">
                          <span className="text-[10px] text-[#B58D53]/50 uppercase tracking-wider">
                            Night {day.day} • {day.date}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </a>
                </AnimatedSection>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ REGISTRATION SECTION ═══════════════════ */}
      <section
        id="register"
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #631616 0%, #3D2317 50%, #2A0F0F 100%)" }}
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/images/ramadan-pattern-bg.png')", backgroundSize: "cover" }} />

        {/* Corner decorations */}
        <FloatingDecoration
          src="/images/decorations/lantern.png"
          className="top-10 left-10 w-16 opacity-30"
          duration={6}
        />
        <FloatingDecoration
          src="/images/decorations/star.png"
          className="bottom-10 right-10 w-12 opacity-25"
          duration={5}
          delay={1}
        />

        <TwinklingStars />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src="/images/decorations/star.png" alt="" className="w-8 h-8 opacity-60" />
                <h2 className="text-4xl md:text-5xl font-bold text-[#FDF0C4]">
                  Register Now
                </h2>
                <img src="/images/decorations/star.png" alt="" className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-[#FDF0C4]/70 max-w-xl mx-auto">
                Secure your spot at QatAIyef: AI Engineering Nights. Free registration, limited seats.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="max-w-2xl mx-auto bg-[#3D2317]/80 rounded-2xl p-8 md:p-10 border border-[#B58D53]/20 shadow-2xl backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="text-[#FDF0C4] font-semibold text-sm">
                      Full Name <span className="text-[#B58D53]">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className={`mt-1.5 bg-[#2A0F0F]/60 border-[#B58D53]/20 text-[#FDF0C4] placeholder:text-[#FDF0C4]/30 focus:border-[#B58D53] focus:ring-[#B58D53]/30 ${formErrors.name ? 'border-red-500' : ''}`}
                    />
                    {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#FDF0C4] font-semibold text-sm">
                      Email <span className="text-[#B58D53]">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                      className={`mt-1.5 bg-[#2A0F0F]/60 border-[#B58D53]/20 text-[#FDF0C4] placeholder:text-[#FDF0C4]/30 focus:border-[#B58D53] focus:ring-[#B58D53]/30 ${formErrors.email ? 'border-red-500' : ''}`}
                    />
                    {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="phone" className="text-[#FDF0C4] font-semibold text-sm">
                      Phone Number <span className="text-[#B58D53]">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+20 XXX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => handleFormChange("phone", e.target.value)}
                      className={`mt-1.5 bg-[#2A0F0F]/60 border-[#B58D53]/20 text-[#FDF0C4] placeholder:text-[#FDF0C4]/30 focus:border-[#B58D53] focus:ring-[#B58D53]/30 ${formErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="university" className="text-[#FDF0C4] font-semibold text-sm">
                      University/Org <span className="text-[#B58D53]">*</span>
                    </Label>
                    <Input
                      id="university"
                      placeholder="Your university or org"
                      value={formData.university}
                      onChange={(e) => handleFormChange("university", e.target.value)}
                      className={`mt-1.5 bg-[#2A0F0F]/60 border-[#B58D53]/20 text-[#FDF0C4] placeholder:text-[#FDF0C4]/30 focus:border-[#B58D53] focus:ring-[#B58D53]/30 ${formErrors.university ? 'border-red-500' : ''}`}
                    />
                    {formErrors.university && <p className="text-red-400 text-xs mt-1">{formErrors.university}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="position" className="text-[#FDF0C4] font-semibold text-sm">
                    Current Position <span className="text-[#B58D53]">*</span>
                  </Label>
                  <Input
                    id="position"
                    placeholder="e.g., Student, Software Engineer, Data Scientist"
                    value={formData.position}
                    onChange={(e) => handleFormChange("position", e.target.value)}
                    className={`mt-1.5 bg-[#2A0F0F]/60 border-[#B58D53]/20 text-[#FDF0C4] placeholder:text-[#FDF0C4]/30 focus:border-[#B58D53] focus:ring-[#B58D53]/30 ${formErrors.position ? 'border-red-500' : ''}`}
                  />
                  {formErrors.position && <p className="text-red-400 text-xs mt-1">{formErrors.position}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="ieeeStatus" className="text-[#FDF0C4] font-semibold text-sm">
                      IEEE Membership
                    </Label>
                    <Select value={formData.ieeeStatus} onValueChange={(value) => handleFormChange("ieeeStatus", value)}>
                      <SelectTrigger className="mt-1.5 bg-[#2A0F0F]/60 border-[#B58D53]/20 text-[#FDF0C4] focus:border-[#B58D53]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#3D2317] border-[#B58D53]/30">
                        <SelectItem value="not-member" className="text-[#FDF0C4] focus:bg-[#B58D53]/20">Not a Member</SelectItem>
                        <SelectItem value="student-member" className="text-[#FDF0C4] focus:bg-[#B58D53]/20">Student Member</SelectItem>
                        <SelectItem value="professional-member" className="text-[#FDF0C4] focus:bg-[#B58D53]/20">Professional Member</SelectItem>
                        <SelectItem value="ieee-cs-member" className="text-[#FDF0C4] focus:bg-[#B58D53]/20">IEEE CS Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="resumeUrl" className="text-[#FDF0C4] font-semibold text-sm">
                      Resume URL <span className="text-[#FDF0C4]/40 text-xs">(optional)</span>
                    </Label>
                    <Input
                      id="resumeUrl"
                      type="url"
                      placeholder="https://..."
                      value={formData.resumeUrl}
                      onChange={(e) => handleFormChange("resumeUrl", e.target.value)}
                      className={`mt-1.5 bg-[#2A0F0F]/60 border-[#B58D53]/20 text-[#FDF0C4] placeholder:text-[#FDF0C4]/30 focus:border-[#B58D53] focus:ring-[#B58D53]/30 ${formErrors.resumeUrl ? 'border-red-500' : ''}`}
                    />
                    {formErrors.resumeUrl && <p className="text-red-400 text-xs mt-1">{formErrors.resumeUrl}</p>}
                  </div>
                </div>

                {/* IEEE Membership ID - conditional */}
                {formData.ieeeStatus && formData.ieeeStatus !== "not-member" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="ieeeMembershipId" className="text-[#FDF0C4] font-semibold text-sm">
                      IEEE Membership ID <span className="text-[#B58D53]">*</span>
                    </Label>
                    <Input
                      id="ieeeMembershipId"
                      placeholder="Enter your IEEE membership ID"
                      value={formData.ieeeMembershipId}
                      onChange={(e) => handleFormChange("ieeeMembershipId", e.target.value)}
                      className={`mt-1.5 bg-[#2A0F0F]/60 border-[#B58D53]/20 text-[#FDF0C4] placeholder:text-[#FDF0C4]/30 focus:border-[#B58D53] focus:ring-[#B58D53]/30 ${formErrors.ieeeMembershipId ? 'border-red-500' : ''}`}
                    />
                    {formErrors.ieeeMembershipId && <p className="text-red-400 text-xs mt-1">{formErrors.ieeeMembershipId}</p>}
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#B58D53] hover:bg-[#B58D53]/90 text-[#3D2317] font-bold py-6 text-lg shadow-lg shadow-[#B58D53]/20 hover:shadow-xl hover:shadow-[#B58D53]/30 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ✦
                        </motion.div>
                        Submitting...
                      </span>
                    ) : (
                      "✨ Register for QatAIyef"
                    )}
                  </Button>
                </motion.div>

                <p className="text-xs text-[#FDF0C4]/40 text-center">
                  Your information is securely submitted and used only for event communication.
                </p>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════ PARTNERSHIPS SECTION ═══════════════════ */}
      <section id="partnerships" className="py-20 bg-[#2A0F0F] relative overflow-hidden">
        <TwinklingStars />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src="/images/decorations/dec2.png" alt="" className="w-10 h-8 opacity-50" />
                <h2 className="text-4xl md:text-5xl font-bold text-[#FDF0C4]">
                  Partnerships
                </h2>
                <img src="/images/decorations/dec2.png" alt="" className="w-10 h-8 opacity-50 scale-x-[-1]" />
              </div>
              <p className="text-[#FDF0C4]/60 max-w-lg mx-auto text-lg">
                Stay tuned for exciting partnership announcements! 🌟
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* IEEE */}
              <Card className="p-8 bg-[#3D2317]/60 border border-[#B58D53]/15 hover:border-[#B58D53]/40 transition-all group backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <img
                    src="/images/brand/ieee-logo.jpg"
                    alt="IEEE"
                    className="h-20 object-contain mb-4 rounded group-hover:scale-105 transition-transform"
                  />
                  <h3 className="text-lg font-bold text-[#FDF0C4]">IEEE</h3>
                  <p className="text-xs text-[#FDF0C4]/40 mt-1">EUI Student Branch</p>
                </div>
              </Card>

              {/* IEEE Computer Society */}
              <Card className="p-8 bg-[#3D2317]/60 border border-[#B58D53]/15 hover:border-[#B58D53]/40 transition-all group backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <img
                    src="/images/brand/ieee-cs-eui.png"
                    alt="IEEE Computer Society"
                    className="h-20 object-contain mb-4 rounded group-hover:scale-105 transition-transform"
                  />
                  <h3 className="text-lg font-bold text-[#FDF0C4]">IEEE Computer Society</h3>
                  <p className="text-xs text-[#FDF0C4]/40 mt-1">EUI Chapter</p>
                </div>
              </Card>

              {/* More Coming */}
              <Card className="p-8 bg-[#3D2317]/60 border-2 border-dashed border-[#B58D53]/20 hover:border-[#B58D53]/40 transition-all group backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-4xl mb-4"
                  >
                    ✨
                  </motion.div>
                  <h3 className="text-lg font-bold text-[#B58D53]">More Coming Soon</h3>
                  <p className="text-xs text-[#FDF0C4]/40 mt-1">Stay tuned!</p>
                </div>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #1a0808 0%, #0d0404 100%)" }}>
        {/* Decorative top border */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#B58D53] to-transparent" />

        {/* Decorative bunting */}
        <div className="flex justify-center -mt-1">
          <img src="/images/decorations/decorations.png" alt="" className="w-40 opacity-40" />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/brand/qataiyef-logo-circle.png" alt="QatAIyef" className="h-12 w-12 rounded-full ring-2 ring-[#B58D53]/40" />
                <div>
                  <h3 className="text-xl font-bold text-[#FDF0C4]">QatAIyef</h3>
                  <p className="text-xs text-[#B58D53] uppercase tracking-widest">AI Engineering Nights</p>
                </div>
              </div>
              <p className="text-[#FDF0C4]/60 text-sm leading-relaxed max-w-sm">
                A comprehensive 7-day online technical event organized by IEEE EUI Computer Society,
                guiding you through the full AI engineering journey.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#B58D53] mb-4 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2.5">
                {["Agenda", "Speakers", "Register", "Partnerships"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm text-[#FDF0C4]/60 hover:text-[#B58D53] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#B58D53] mb-4 uppercase tracking-wider">Contact</h3>
              <div className="space-y-3">
                <a
                  href="mailto:ieee-eui-sb@eui.edu.eg"
                  className="flex items-center gap-2 text-sm text-[#FDF0C4]/60 hover:text-[#B58D53] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#B58D53]" />
                  ieee-eui-sb@eui.edu.eg
                </a>
                <p className="flex items-center gap-2 text-sm text-[#FDF0C4]/60">
                  <Calendar className="w-4 h-4 text-[#B58D53]" />
                  March 8–14, 2026
                </p>
                <p className="flex items-center gap-2 text-sm text-[#FDF0C4]/60">
                  <MapPin className="w-4 h-4 text-[#B58D53]" />
                  Online Event
                </p>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-t border-[#B58D53]/15 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#FDF0C4]/40">
              © 2026 QatAIyef: AI Engineering Nights. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img src="/images/brand/ieee-logo.jpg" alt="IEEE" className="h-7 object-contain rounded opacity-60 hover:opacity-100 transition-opacity" />
              <img src="/images/brand/ieee-cs-eui.png" alt="IEEE CS" className="h-7 object-contain rounded opacity-60 hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-[#FDF0C4]/40">
              Organized by IEEE EUI Computer Society Student Branch
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
