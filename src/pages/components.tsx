// Modules
import { GetServerSideProps, NextPage } from "next";
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
const Components: NextPage<{ componentList: ComponentList }> = ({
  componentList,
}) => {
  const { t } = useTranslation(["components", "common"]);
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
    implementation: {
      html: '<button\n  aria-label="button"\n  class="btn--filled"\n>\n  <span>Filled button</span>\n</button>\n<button\n  aria-label="button"\n  class="btn--tonal"\n>\n  <span>Tonal button</span>\n</button>\n<button\n  aria-label="button"\n  class="btn--outlined"\n>\n  <span>Outlined button</span>\n</button>\n<button\n  aria-label="button"\n  class="btn--text"\n>\n  <span>Text button</span>\n</button>',
      react:
        '<Button\n  name="button"\n  label="Filled button"\n  type="filled"\n/>\n<Button\n  name="button"\n  label="Tonal button"\n  type="tonal"\n/>\n<Button\n  name="button"\n  label="Outlined button"\n  type="outlined"\n/>\n<Button\n  name="button"\n  label="Text button"\n  type="text"\n/>',
    },
    properties: [
      {
        id: 0,
        name: "name",
        type: "string",
        defaultValue: '""',
        desc: {
          "en-US": "The text label for screenreaders",
        },
      },
      {
        id: 1,
        name: "label",
        type: "string",
        defaultValue: '""',
        desc: {
          "en-US": "The text in the button",
        },
      },
      {
        id: 2,
        name: "type",
        type: '"filled" | "outlined" | "text"',
        required: true,
        desc: {
          "en-US": "The type of the button",
        },
      },
      {
        id: 3,
        name: "iconOnly",
        type: "boolean",
        defaultValue: "false",
        desc: {
          "en-US": "Has only icon",
        },
      },
      {
        id: 4,
        name: "icon",
        type: "JSX.Element",
        required: false,
        desc: {
          "en-US":
            "An icon in the form of a JSX Element, will be placed in front of the text",
        },
      },
      {
        id: 5,
        name: "isDangerous",
        type: "boolean",
        defaultValue: "false",
        desc: {
          "en-US":
            "If the button triggers some dangerous action, makes Button have danger color",
        },
      },
      {
        id: 6,
        name: "onClick",
        type: "() => void",
        required: false,
        desc: {
          "en-US": "Triggered on click",
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
            pageIcon={<MaterialIcon icon="widgets" />}
            backGoesTo={showMain ? () => setShowMain(false) : "/"}
            LinkElement={Link}
          />
        }
        show={showMain}
      >
        <ListSection>
          <CardList
            listGroups={componentList.map((componentGroup) => ({
              ...componentGroup,
              groupName:
                componentGroup.groupName[locale] ||
                componentGroup.groupName["en-US"],
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
                  hasAction
                >
                  <div className="card__media" />
                  <CardHeader
                    title={
                      <h3 className="text-lg font-bold">{content.name}</h3>
                    }
                    label={
                      content.subtitle[locale] || content.subtitle["en-US"]
                    }
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const componentListRef = collection(db, "component_group");
  const componentList = (await getDocs(componentListRef)).docs
    .map((group) => group.data())

    // Sort Component Group
    .sort((a, b) => a.id - b.id)

    // Sort Component List in every Component Group
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
      ])),
      componentList,
    },
  };
};

export default Components;
