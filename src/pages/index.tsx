// Modules
import { NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// SK Components
import {
  Header,
  MaterialIcon,
  RegularLayout,
  Section,
  Title,
} from "@suankularb-components/react";
import Link from "next/link";

// Page
const Index: NextPage = () => {
  const { t } = useTranslation(["home", "common"]);

  return (
    <>
      <Head>
        <title>{t("brand.name", { ns: "common" })}</title>
      </Head>
      <RegularLayout
        Title={
          <Title
            name={{ title: t("title") }}
            pageIcon={<MaterialIcon icon="home" />}
            backGoesTo="/"
          />
        }
      >
        <Section labelledBy="menu">
          <h2 className="sr-only" id="menu">
            Menu
          </h2>
          <div className="layout-grid-cols-2">
            <Link href="/layouts">
              <a
                className="container-secondary has-action--secondary flex aspect-[3/1] items-center justify-center gap-2 rounded-8xl
                  font-display text-3xl font-bold before:rounded-8xl"
              >
                <div className="text-6xl text-secondary">
                  <MaterialIcon icon="vertical_split" allowCustomSize />
                </div>
                <span>Layouts</span>
              </a>
            </Link>
            <Link href="/components">
              <a
                className="container-tertiary has-action--tertiary flex aspect-[3/1] items-center justify-center gap-2 rounded-8xl
                  font-display text-3xl font-bold before:rounded-8xl"
              >
                <div className="text-6xl text-tertiary">
                  <MaterialIcon icon="widgets" allowCustomSize />
                </div>
                <span>Components</span>
              </a>
            </Link>
          </div>
        </Section>
      </RegularLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home"])),
  },
});

export default Index;
