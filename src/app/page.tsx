"use client";

import {
  motion,
  type MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  Database,
  Layers,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const featureVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";

const featureCards = [
  {
    number: "01",
    title: "State Engine.",
    icon: Database,
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
    items: [
      "Raw input becomes durable evidence.",
      "Goals, events, decisions and metrics stay linked.",
      "The system remembers what actually happened.",
      "Future AI starts from structured context.",
    ],
  },
  {
    number: "02",
    title: "Operator Layer.",
    icon: Sparkles,
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
    items: [
      "AI reads the whole life context.",
      "Typed tools update real database state.",
      "Reviews synthesize progress and drift.",
    ],
  },
  {
    number: "03",
    title: "Workspace Capsules.",
    icon: Waypoints,
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
    items: [
      "Spanish feels like a language lab.",
      "Strategy work becomes a decision dossier.",
      "Reading, health and finance get custom surfaces.",
    ],
  },
];

function WordsPullUp({
  text,
  showAsterisk = false,
  className = "",
}: {
  text: string;
  showAsterisk?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => {
        const isLast = index === words.length - 1;

        return (
          <motion.span
            aria-hidden="true"
            className="relative inline-block overflow-hidden pr-[0.04em]"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.9, delay: index * 0.08, ease }}
            key={`${word}-${index}`}
          >
            {word}
            {showAsterisk && isLast ? (
              <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">
                *
              </span>
            ) : null}
          </motion.span>
        );
      })}
      <span className="sr-only">{text}</span>
    </div>
  );
}

function WordsPullUpMultiStyle({
  segments,
  className = "",
}: {
  segments: { text: string; className?: string }[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const words = segments.flatMap((segment) =>
    segment.text.split(" ").map((word) => ({
      word,
      className: segment.className,
    })),
  );

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map(({ word, className: wordClassName }, index) => (
        <span className="overflow-hidden pr-[0.22em]" key={`${word}-${index}`}>
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.85, delay: index * 0.08, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function AnimatedLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1],
  );

  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

function AboutTextReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = Array.from(text);

  return (
    <p
      ref={ref}
      className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:text-base"
    >
      {chars.map((char, index) => (
        <AnimatedLetter
          char={char}
          index={index}
          progress={scrollYProgress}
          total={chars.length}
          key={`${char}-${index}`}
        />
      ))}
    </p>
  );
}

export default function Home() {
  const navItems = [
    { label: "Signal", href: "#signal" },
    { label: "Workspaces", href: "#workspaces" },
    { label: "Memory", href: "#memory" },
    { label: "Reviews", href: "#reviews" },
    { label: "Enter", href: "/dashboard" },
  ];

  return (
    <main className="bg-black text-[#E1E0CC]">
      <section className="h-screen p-4 md:p-6">
        <div className="relative h-full overflow-hidden rounded-2xl bg-black md:rounded-[2rem]">
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            src={heroVideo}
          />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/75" />

          <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
            <div className="rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
              <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
                {navItems.map((item) => (
                  <a
                    className="whitespace-nowrap text-[10px] text-[rgba(225,224,204,0.8)] transition-colors hover:text-[#E1E0CC] sm:text-xs md:text-sm"
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-7 sm:px-7 md:px-10 md:pb-10 lg:px-12">
            <div className="grid items-end gap-7 md:grid-cols-12 md:gap-6">
              <WordsPullUp
                text="Me OS"
                showAsterisk
                className="col-span-8 text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] sm:text-[24vw] md:text-[20vw] lg:text-[16vw] xl:text-[14vw] 2xl:text-[13vw]"
              />

              <div className="col-span-4 mb-1 max-w-md md:mb-6">
                <motion.p
                  className="text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.5, ease }}
                >
                  A private operating system for turning raw life input into
                  state, evidence, decisions, and next action.
                </motion.p>
                <motion.a
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                  href="/dashboard"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.7, ease }}
                >
                  Enter the system
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-[#E1E0CC]" />
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Features />
    </main>
  );
}

function About() {
  return (
    <section
      className="bg-black px-4 py-16 sm:px-6 md:py-24"
      id="signal"
    >
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-[#101010] px-5 py-16 text-center sm:px-8 md:px-12 md:py-24">
        <div className="text-[10px] text-primary sm:text-xs">Private state</div>
        <h2 className="mx-auto mt-8 max-w-3xl text-3xl font-normal leading-[0.95] text-[#E1E0CC] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: "Not a todo app," },
              {
                text: "a living instrument panel.",
                className: "font-serif italic",
              },
              { text: "Every important signal becomes durable state." },
            ]}
          />
        </h2>
        <AboutTextReveal text="Me OS is built around one premise: your life should not be scattered across notes, tasks, metrics, memories and AI chats. Say what happened, what changed, or what you are deciding, and the system turns it into evidence that can compound." />
      </div>
    </section>
  );
}

function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-black px-4 py-16 sm:px-6 md:py-24"
      id="workspaces"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <h2 className="text-xl font-normal leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
            <WordsPullUpMultiStyle
              className="justify-start text-left"
              segments={[
                {
                  text: "Studio-grade workflows for a high-agency life.",
                  className: "text-[#E1E0CC]",
                },
                {
                  text: "Built for memory. Powered by evidence.",
                  className: "text-gray-500",
                },
              ]}
            />
          </h2>
        </header>

        <div
          ref={ref}
          id="memory"
          className="mt-12 grid gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4"
        >
          <motion.article
            className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[#212121] lg:min-h-0"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              aria-hidden="true"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              src={featureVideo}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/80">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl leading-none text-[#E1E0CC]">
                Your private command canvas.
              </p>
            </div>
          </motion.article>

          {featureCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                className="flex min-h-[360px] flex-col rounded-2xl bg-[#212121] p-5 lg:min-h-0"
                id={index === featureCards.length - 1 ? "reviews" : undefined}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : undefined}
                transition={{
                  duration: 0.75,
                  delay: (index + 1) * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                key={card.title}
              >
                <div className="flex items-center justify-between">
                  <img
                    alt=""
                    className="h-10 w-10 rounded-xl object-cover sm:h-12 sm:w-12"
                    src={card.image}
                  />
                  <Icon className="h-5 w-5 text-primary/70" />
                </div>
                <div className="mt-8 flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl leading-none text-[#E1E0CC]">
                    {card.title}
                  </h3>
                  <span className="text-xs text-gray-500">{card.number}</span>
                </div>
                <div className="mt-8 space-y-4">
                  {card.items.map((item) => (
                    <div className="flex gap-3" key={item}>
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="text-sm leading-snug text-gray-400">{item}</p>
                    </div>
                  ))}
                </div>
                <a
                  className="mt-auto inline-flex items-center gap-2 pt-10 text-sm text-primary"
                  href="/dashboard"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
