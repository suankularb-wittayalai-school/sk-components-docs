// Modules
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useState } from "react";

import { db } from "@utils/firebase-config";
import { collection, getDocs } from "firebase/firestore";

// SK Components
import {
  Card,
  CardHeader,
  CardList,
  ListLayout,
  ListSection,
  MaterialIcon,
  Title,
} from "@suankularb-components/react";

// Components
import ComponentDetails from "@components/ComponentDetails";

// Types
import {
  ComponentDetails as ComponentDetailsType,
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
    ComponentDetailsType | undefined
  >({
    id: 0,
    name: "Button",
    subtitle: {
      "en-US": "Take action with Button.",
      th: "เริ่มการกระทำด้วย Button",
    },
    guidelines: {
      body: {
        "en-US":
          "Buttons help people **initiate actions**, from sending an email, to sharing a document, to liking a post.\n\nChoose the **type of button** based on the importance of the action. The more important the action is, the more emphasis its button should have.",
        th: "ปุ่มช่วยให้ผู้ใช้**เริ่มต้นการกระทำ**ตั้งแต่การส่งอีเมล ไปจนถึงการแชร์เอกสาร ไปจนถึงการกดถูกใจโพสต์\n\nเลือก**ประเภทของปุ่ม**ตามความสำคัญของการกระทำ การกระทำยิ่งสำคัญคือยิ่งปุ่มเน้นย้ำมากขึ้นเท่านั้น",
      },
      resources: {
        material: {
          equiv: "Button",
          url: "https://m3.material.io/components/buttons/overview",
        },
      },
    },
    structure:
      "<ListLayout\n  // ...\n>\n  <ListSection>\n    <CardList\n      // ...\n    />\n  </ListSection>\n  <MainSection>\n    <Section>\n      ...\n    </Section>\n    <Section>\n      ...\n    </Section>\n  </MainSection>\n</ListLayout>",
    properties: [
      {
        id: 0,
        name: "Title",
        type: "Title",
        required: true,
        desc: {
          "en-US": "Title element",
        },
      },
      {
        id: 1,
        name: "show",
        type: "boolean",
        required: true,
        desc: {
          "en-US": "If the Main Section is currently visible on mobile or not",
        },
      },
      {
        id: 2,
        name: "children",
        type: "boolean",
        required: true,
        desc: {
          "en-US": "Must consist of `ListSection` and `MainSection`",
        },
      },
    ],
  });

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

        <ComponentDetails component={selectedComponent} />
      </ListLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const layoutListRef = collection(db, "layout_group");
  const layoutList = (await getDocs(layoutListRef)).docs
    .map((group) => group.data())

    // Sort Layout Group
    .sort((a, b) => a.id - b.id)

    // Sort Layout List in every Layout Group
    .map((group) => ({
      ...group,
      content: group.content.sort(
        (a: ComponentListItem, b: ComponentListItem) => a.id - b.id
      ),
    }));

  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "components",
        "layouts",
      ])),
      layoutList,
    },
  };
};

export default Layouts;
