"use client";

import { Card } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useRef, useState } from "react";
import type { Member } from "@/store/discordSlice";

// Fisher-Yates shuffle algorithm for proper randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const DiscordCard = () => {
  const discordStore = useSelector((state: RootState) => state.discord);
  const [randomizedMembers, setRandomizedMembers] = useState<Member[]>([]);
  const [isFading, setIsFading] = useState(false);
  const fadeTimeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const FADE_DURATION = 400; // ms

  // Function to randomize members
  const randomizeMembers = (withFade = true) => {
    const members = discordStore?.data?.members;
    if (!members || members.length === 0) {
      setRandomizedMembers([]);
      return;
    }
    
    // Always shuffle and take up to 72 unique members (8 rows x 9 columns)
    // This ensures no duplicates and random order
    const shuffled = shuffleArray(members).slice(0, 72);

    // Optional fade transition between sets
    const applyShuffle = () => {
      setRandomizedMembers(shuffled);
      setIsFading(false);
    };

    if (withFade) {
      setIsFading(true);
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
      // Wait for fade-out to complete before swapping, then fade back in
      fadeTimeoutRef.current = window.setTimeout(applyShuffle, FADE_DURATION);
    } else {
      applyShuffle();
    }
  };

  // Randomize when data changes and keep rotating the visible set
  useEffect(() => {
    const members = discordStore?.data?.members;
    if (!members || members.length === 0) {
      setRandomizedMembers([]);
      return;
    }

    // Initial randomization for the current mount/data load (no fade to avoid flash)
    randomizeMembers(false);

    // If we have more than one full grid, rotate every 12 seconds
    const shouldRotate = members.length > 72;
    if (shouldRotate) {
      intervalRef.current = window.setInterval(() => randomizeMembers(true), 12000);
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discordStore?.data?.members]);

  return (
    <section className="makcu-community-section">
      <div className="makcu-section-heading makcu-community-heading">
        <span>02</span>
        <div>
          <small>LIVE COMMUNITY</small>
          <h2>Online Customer <em>{discordStore?.data?.presence_count ?? "--"}</em></h2>
        </div>
      </div>

      <div
        className={`makcu-community-grid transition-opacity ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        style={{ transitionDuration: `${FADE_DURATION}ms` }}
      >
        {randomizedMembers.map((member, index) => (
          <Card
            className="makcu-community-card"
            key={`${member.id}-${index}`}
          >
            <span>
              {member.username}
            </span>
            <Avatar className="makcu-community-avatar">
              <AvatarImage src={member.avatar_url} />
            </Avatar>
          </Card>
        ))}
      </div>
    </section>
  );
};
