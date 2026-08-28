"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SocialIcons } from "@/components/ui/social-icons";
import { EASE_OUT_SOFT } from "@/lib/animations";
import type { TeamMember } from "@/types";

interface TeamGridProps {
  members: TeamMember[];
}

/**
 * Meet the team.
 */
export function TeamGrid({ members }: TeamGridProps) {
  const reduceMotion = useReducedMotion();
  const isSingle = members.length === 1;

  return (
    <section className="section-y bg-secondary/40">
      <Container>
        <AnimatedSection>
          <SectionHeading
            align="center"
            eyebrow="Our founder"
            title="The person behind the vision"
            description="Crafting stories with intention, emotion, and a deep appreciation for the people behind every moment."
            className="mx-auto items-center"
          />
        </AnimatedSection>

        <div
          className={
            isSingle
              ? "mt-14"
              : "mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {members.map((member, index) => (
            <motion.article
              key={member.id}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: EASE_OUT_SOFT,
              }}
              className={
                isSingle
                  ? "group grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-500 hover:shadow-md sm:grid-cols-[2fr_3fr]"
                  : "group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-500 hover:shadow-md"
              }
            >
              <div
                className={
                  isSingle
                    ? "relative aspect-4/5 self-start overflow-hidden bg-secondary"
                    : "relative aspect-4/5 overflow-hidden bg-secondary"
                }
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  sizes={
                    isSingle
                      ? "(max-width: 640px) 100vw, 40vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div
                className={
                  isSingle
                    ? "flex min-h-0 flex-col justify-start overflow-y-auto px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12"
                    : "p-6 md:p-8"
                }
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  {member.role}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">
                  {member.name}
                </h3>
                <div className="mt-3 space-y-3">
                  {member.bio.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {member.specialties?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {member.specialties.map((specialty) => (
                      <li
                        key={specialty}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {specialty}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {member.socials?.length ? (
                  <SocialIcons
                    links={member.socials}
                    size="sm"
                    className="mt-6"
                  />
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
