"use client";

import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { X } from "lucide-react";
import { SnapchatLogo, TiktokLogo } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useParams, useSearchParams } from "next/navigation";

interface Props {}

const TopNav: React.FC<Props> = () => {
  const t = useTranslations();

  const router = useRouter();

  const pathname = usePathname();

  const params = useParams();

  const searchParams = useSearchParams();

  const locale = useLocale();

  function onSelectChange() {
    // @ts-expect-error -- TypeScript will validate that only known `params`
    // are used in combination with a given `pathname`. Since the two will
    // always match for the current route, we can skip runtime checks.
    router.replace({ pathname, params, query: searchParams }, { locale });
  }

  return (
    <>
      <div
        className={"top-nav md:h-[44px] h-[30px] border-b border-line bg-white"}
      >
        <div className="container mx-auto h-full">
          <div className="top-nav-main flex justify-between max-md:justify-center h-full">
            <div className="left-content flex items-center">
              <ul className="flex items-center gap-5">
                <li>
                  <Link
                    href={"/pages/about"}
                    className="caption2 hover:underline"
                  >
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/pages/contact"}
                    className="caption2 hover:underline"
                  >
                    {t("contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/pages/faqs"}
                    className="caption2 hover:underline"
                  >
                    {t("faqs")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="right-content flex items-center gap-5 max-md:hidden">
              <button
                className="choose-type choose-language flex items-center gap-1.5"
                onClick={() => {}}
              >
                <Icon.Globe size={16} />
                <p className="selected caption2 cursor-pointer">{"language"}</p>
              </button>

              <Link
                href={"https://www.facebook.com/kafaratpluss"}
                target="_blank"
              >
                <i className="icon-facebook text-black"></i>
              </Link>
              <Link
                href={"https://www.instagram.com/kafaratplus"}
                target="_blank"
              >
                <i className="icon-instagram text-black"></i>
              </Link>
              <Link
                href={
                  "https://www.youtube.com/@%D9%83%D9%81%D8%B1%D8%A7%D8%AA%D8%A8%D9%84%D8%B3"
                }
                target="_blank"
              >
                <i className="icon-youtube text-black"></i>
              </Link>
              <Link href={"https://x.com/kafaratplus"} target="_blank">
                <X />
              </Link>
              <Link
                href={"https://www.tiktok.com/@kafaratplus_ksa"}
                target="_blank"
              >
                <TiktokLogo />
              </Link>
              <Link
                href={"https://www.snapchat.com/add/kafaratplus"}
                target="_blank"
              >
                <SnapchatLogo />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
