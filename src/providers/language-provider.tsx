import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, setRequestLocale } from "next-intl/server";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default async function LanguageProvier({ children }: Props) {
  const locale = await getLocale();

  const messages = await getMessages();

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
