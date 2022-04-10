// Modules
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useState } from "react";

// SK Components
import {
  Card,
  CardHeader,
  CardList,
  ListLayout,
  ListSection,
  MainSection,
  MaterialIcon,
  Title,
} from "@suankularb-components/react";

// Types
import {
  ComponentDetails,
  ComponentList,
  ComponentListItem,
} from "@utils/types";

// Page
const Layouts: NextPage<{ layoutList: ComponentList }> = ({ layoutList }) => {
  const { t } = useTranslation(["layouts", "common"]);
  const locale = useRouter().locale == "th" ? "th" : "en-US";

  // List Layout control
  const [showMain, setShowMain] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number | undefined>();

  // Main content control
  const [selectedComponent, setSelectedComponent] = useState<
    ComponentDetails | undefined
  >();

  return (
    <>
      <Head>
        <title>
          {showMain
            ? selectedComponent
              ? selectedComponent.name
              : t("title")
            : t("title")}
          {" - "}
          {t("brand.name", { ns: "common" })}
        </title>
      </Head>
      <ListLayout
        Title={
          <Title
            name={{ title: t("title") }}
            pageIcon={<MaterialIcon icon="vertical_split" />}
            backGoesTo={showMain ? () => setShowMain(false) : "/"}
            LinkElement={Link}
          />
        }
        show={showMain}
      >
        <ListSection>
          <CardList
            listGroups={layoutList.map((layoutGroup) => ({
              ...layoutGroup,
              groupName:
                layoutGroup.groupName[locale] || layoutGroup.groupName["en-US"],
            }))}
            ListItem={({
              content,
              className,
              onClick,
            }: {
              content: ComponentListItem["content"];
              className: string;
              onClick: () => void;
            }) => (
              <button
                className="w-full"
                onClick={() => {
                  onClick();
                  setShowMain(true);
                }}
              >
                <Card
                  type="horizontal"
                  appearance="tonal"
                  className={className}
                >
                  <CardHeader
                    title={
                      <h3 className="text-lg font-bold">{content.name}</h3>
                    }
                    label={content.subtitle[locale]}
                    className="font-display"
                  />
                </Card>
              </button>
            )}
            onChange={(id) => setSelectedID(id)}
          />
        </ListSection>
        <MainSection>{selectedComponent && <p>Layout</p>}</MainSection>
      </ListLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const layoutList: ComponentList = [
    {
      groupName: { "en-US": "Page Layout" },
      content: [
        {
          id: 0,
          content: {
            name: "Page Layout",
            subtitle: { "en-US": "The layout for all pages." },
          },
        },
      ],
    },
    {
      groupName: { "en-US": "Content Layout" },
      content: [
        {
          id: 1,
          content: {
            name: "Content Layout",
            subtitle: { "en-US": "Page with sections." },
          },
        },
      ],
    },
    {
      groupName: { "en-US": "List Layout" },
      content: [
        {
          id: 2,
          content: {
            name: "List Layout",
            subtitle: { "en-US": "Choose one to learn more." },
          },
        },
        {
          id: 3,
          content: {
            name: "List Section",
            subtitle: { "en-US": "All the Cards!" },
          },
        },
        {
          id: 4,
          content: {
            name: "Main Section",
            subtitle: { "en-US": "All the details!" },
          },
        },
      ],
    },
  ];

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "layouts",
      ])),
      layoutList,
    },
  };
};

export default Layouts;
