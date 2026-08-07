"use client";

import InfoCard from "@/components/info-card";
import LocalizedLink from "@/components/localized-link";
import { buttonVariants } from "@/components/ui/button";
import { Cpu, UsersRound, Mouse } from "lucide-react";
import { ArrowRight, Cable, Radio, TerminalSquare } from "lucide-react";
import { DiscordCard } from "@/components/discord";
import { useDictionary } from "@/components/contexts/dictionary-provider";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import HomeSidebar from "@/components/home-sidebar";
import useLocale from "@/components/hooks/useLocale";
import Image from "next/image";
import makcuDevice from "@/assets/makcu.png";

export default function Home() {
  const dict = useDictionary();
  const lang = useLocale();
  const memberCount = useSelector(
    (state: RootState) => state.discord.data?.member_count
  );

  const iconMap = {
    users_round: UsersRound,
    mouse: Mouse,
    cpu: Cpu,
  };

  const hero = lang === "cn"
    ? {
        eyebrow: "双芯 USB 输入桥接器",
        title: "每一个输入，尽在掌控。",
        description: "在一个精确、快速的工作台中连接、测试、刷写并探索 MAKCU。",
        primary: "打开设备控制",
        secondary: "开始设置",
        ready: "网页工具已就绪",
        serial: "Web Serial",
        firmware: "固件刷写",
        terminal: "实时终端",
      }
    : {
        eyebrow: "DUAL-CORE USB INPUT BRIDGE",
        title: "Control every signal.",
        description: "Connect, test, flash, and explore MAKCU from one precise, fast workspace.",
        primary: "Open device control",
        secondary: "Start setup",
        ready: "Web tools ready",
        serial: "Web Serial",
        firmware: "Firmware flashing",
        terminal: "Live terminal",
      };

  return (
    <div className="makcu-home">
      <section className="makcu-hero">
        <div className="makcu-hero-copy">
          <div className="makcu-kicker"><i />{hero.eyebrow}</div>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <div className="makcu-hero-actions">
            <LocalizedLink href="/device-control" className={buttonVariants({ variant: "default", size: "lg", className: "makcu-hero-primary" })}>
              {hero.primary}<ArrowRight aria-hidden="true" />
            </LocalizedLink>
            <LocalizedLink href="/setup" className={buttonVariants({ variant: "outline", size: "lg", className: "makcu-hero-secondary" })}>
              {hero.secondary}
            </LocalizedLink>
          </div>
          <div className="makcu-hero-ready"><span><i />{hero.ready}</span><strong>MAKCU // WEB</strong></div>
        </div>

        <div className="makcu-device-stage">
          <div className="makcu-device-halo" />
          <div className="makcu-device-index">UNIT_01</div>
          <Image src={makcuDevice} priority alt="MAKCU USB input bridge" className="makcu-device-image" />
          <div className="makcu-device-line" />
          <div className="makcu-device-capabilities">
            <span><Cable aria-hidden="true" />{hero.serial}</span>
            <span><Radio aria-hidden="true" />{hero.firmware}</span>
            <span><TerminalSquare aria-hidden="true" />{hero.terminal}</span>
          </div>
        </div>
      </section>

      <div className="makcu-home-layout">
        <HomeSidebar lang={lang} dict={dict} />
        <div className="makcu-home-content">
          <section className="makcu-proof-section">
            <div className="makcu-section-heading">
              <span>01</span>
              <div>
                <small>MAKCU NETWORK</small>
                <h2>{dict.info.title}</h2>
              </div>
            </div>

            <div className="makcu-proof-grid">
              {dict.info.list.map((item: { icon: string; title: string; number: string; description: string | string[] }, index: number) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                const number = item.icon === "users_round" ? memberCount?.toString() ?? "--" : item.number;
                return (
                  <InfoCard
                    key={index}
                    Icon={IconComponent}
                    title={item.title}
                    number={number}
                    description={Array.isArray(item.description) ? item.description : [item.description]}
                  />
                );
              })}
            </div>
          </section>

          <DiscordCard />
        </div>
      </div>
    </div>
  );
}
