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
            eyebrow="Meet the team"
            title="The people behind the lens"
            description="The steady hand and eye behind every session — candid, unhurried, and focused on your story."
            className="mx-auto items-center"
          />
        </AnimatedSection>

        <div
          className={
            isSingle
              ? "mx-auto mt-14 max-w-sm"
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
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-500 hover:shadow-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  {member.role}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">
                  {member.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
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
