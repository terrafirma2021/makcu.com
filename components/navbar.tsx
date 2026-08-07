"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { AudioToggle } from "@/components/audio-toggle";
import { MakcuConnectionButton } from "./makcu-connection-button";

import { SheetLeftbar } from "./leftbar";
import { SheetClose } from "@/components/ui/sheet";
import LangSelect from "./lang-select";
import { Dictionary } from "@/lib/dictionaries";
import LocalizedLink from "./localized-link";
import SearchBar from "./search-bar";
import { DeviceInfoDisplay } from "./device-info-display";

export function Navbar({ dict }: { dict: Dictionary }) {
  return (
    <nav className="makcu-navbar">
      <div className="makcu-navbar-inner">
        <div className="makcu-navbar-leading">
          <SheetLeftbar dict={dict} />
          <div className="makcu-navbar-brand-group">
            <div className="makcu-desktop-logo">
              <Logo />
            </div>
            <div className="makcu-primary-nav">
              <NavMenu dict={dict} />
            </div>
          </div>
        </div>

        <div className="makcu-navbar-actions">
          <div className="makcu-navbar-search">
            <SearchBar />
          </div>
          <div className="makcu-navbar-device-info">
            <DeviceInfoDisplay />
          </div>
          <div className="makcu-navbar-tools">
            <div className="makcu-navbar-toggles">
              <LangSelect />
              <ModeToggle dict={dict} />
            </div>
          </div>
          <MakcuConnectionButton dict={dict} />
          <div className="makcu-navbar-audio">
            <AudioToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <LocalizedLink href="/" className="makcu-brand" aria-label="MAKCU home">
      <span className="makcu-brand-word" aria-hidden="true">
        <span>MAK</span><strong>CU</strong>
      </span>
      <span className="makcu-brand-signature">INPUT SYSTEMS</span>
    </LocalizedLink>
  );
}
export function NavMenu({
  isSheet = false,
  dict,
}: {
  isSheet?: boolean;
  dict: Dictionary;
}) {

  const NAVLINKS = [
    {
      title: "api",
      href: "/api",
    },
    {
      title: "discord",
      href: "/discord",
      target: "_blank",
    },
    {
      title: "information",
      href: "/information",
    },
    {
      title: "setup",
      href: "/setup",
    },
    {
      title: "device_control",
      href: "/device-control",
    },
    {
      title: "xim",
      href: "/xim",
    },
    {
      title: "troubleshooting",
      href: "/troubleshooting",
    },
  ];
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <LocalizedLink
            key={item.title + item.href}
            className="makcu-nav-link"
            activeClassName={item.href ? "makcu-nav-link-active" : ""}
            href={item.href ?? ""}
            target={item.target}
          >
            {dict.navbar.links[item.title as keyof typeof dict.navbar.links]}
          </LocalizedLink>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
