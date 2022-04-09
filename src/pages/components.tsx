// Modules
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactHtmlParser from "react-html-parser";

// SK Components
import {
  Button,
  Card,
  CardHeader,
  CardList,
  CardSupportingText,
  ChipRadioGroup,
  Header,
  LinkButton,
  ListLayout,
  ListSection,
  MainSection,
  MaterialIcon,
  Section,
  Title,
} from "@suankularb-components/react";

// Types
import {
  ComponentDetails,
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
    ComponentDetails | undefined
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
  });

  // Form controls
  const [language, setLanguage] = useState<"html" | "react">("html");

  return (
    <>
      <Head>
        <title>
          {selectedComponent ? selectedComponent.name : t("title")}
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

        <MainSection>
          {selectedComponent && (
            <>
              {/* Title */}
              <Section className="leading-snug">
                <h2 className="font-display text-4xl font-bold">
                  {selectedComponent.name}
                </h2>
                <p className="font-display text-xl text-on-surface-variant">
                  {selectedComponent.subtitle[locale] ||
                    selectedComponent.subtitle["en-US"]}
                </p>
              </Section>

              {/* Guidelines */}
              <Section className="flex flex-col gap-3">
                <Header
                  icon={<MaterialIcon icon="design_services" allowCustomSize />}
                  text={t("main.guidelines.title")}
                />

                {/* Body */}
                <div className="markdown">
                  <ReactMarkdown>
                    {selectedComponent.guidelines.body[locale] ||
                      selectedComponent.guidelines.body["en-US"]}
                  </ReactMarkdown>
                </div>

                {/* Check Material */}
                {selectedComponent.guidelines.resources?.material && (
                  <Card type="stacked" appearance="outlined">
                    <CardSupportingText>
                      <div className="flex flex-row items-center gap-4">
                        <p className="grow">
                          <Trans
                            i18nKey="main.guidelines.checkMaterial"
                            ns="components"
                          >
                            <span className="font-display text-lg font-bold">
                              For more details,
                            </span>{" "}
                            check out Material Design 3’s{" "}
                            {{
                              materialEquiv:
                                selectedComponent.guidelines.resources?.material
                                  ?.equiv,
                            }}
                            , which {{ componentName: selectedComponent.name }}{" "}
                            is based off of.
                          </Trans>
                        </p>
                        <LinkButton
                          name="Go to Material Design"
                          type="text"
                          iconOnly
                          icon={<MaterialIcon icon="open_in_new" />}
                          url={
                            selectedComponent.guidelines.resources?.material
                              ?.url
                          }
                          attr={{
                            target: "_blank",
                            rel: "noreferrer",
                          }}
                        />
                      </div>
                    </CardSupportingText>
                  </Card>
                )}
              </Section>

              {/* Implementation */}
              <Section className="flex flex-col gap-3">
                <Header
                  icon={<MaterialIcon icon="code" allowCustomSize />}
                  text={t("main.implementation.title")}
                />

                {/* Select language */}
                <ChipRadioGroup
                  choices={[
                    {
                      id: "html",
                      name: t("main.implementation.language.html"),
                    },
                    {
                      id: "react",
                      name: t("main.implementation.language.react"),
                    },
                  ]}
                  onChange={(e: "html" | "react") => setLanguage(e)}
                  value="html"
                  required
                />

                {/* Code Card */}
                <div className="grid aspect-[2/3] grid-rows-2 overflow-hidden rounded-lg shadow sm:aspect-[2/1] sm:grid-cols-2 sm:grid-rows-1">
                  {/* Preview */}
                  <div className="overflow-auto bg-surface">
                    <div className="flex min-h-full min-w-full flex-col items-center justify-center gap-2">
                      {ReactHtmlParser(selectedComponent.implementation.html)}
                    </div>
                  </div>

                  {/* Code */}
                  <div className="overflow-y-scroll bg-surface-1">
                    <code>
                      <pre className="whitespace-pre-wrap p-4 font-mono">
                        {selectedComponent.implementation[language]}
                      </pre>
                    </code>
                  </div>
                </div>
              </Section>
            </>
          )}
        </MainSection>
      </ListLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const componentList: ComponentList = [
    {
      groupName: { "en-US": "Button", th: "ปุ่ม" },
      content: [
        {
          id: 0,
          content: {
            name: "Button",
            subtitle: {
              "en-US": "Take action with Button.",
              th: "เริ่มการกระทำด้วย Button",
            },
          },
        },
        {
          id: 1,
          content: {
            name: "Link Button",
            subtitle: {
              "en-US": "This user is going places.",
              th: "พาผู้ใช้ไปหน้าต่างๆ",
            },
          },
        },
        {
          id: 2,
          content: {
            name: "FAB",
            subtitle: {
              "en-US": "A Page’s main action.",
              th: "การกระทำหลักของหน้า",
            },
          },
        },
      ],
    },
    {
      groupName: { "en-US": "Chip", th: "ชิป" },
      content: [
        {
          id: 3,
          content: {
            name: "Chip",
            subtitle: {
              "en-US": "Small buttons often together.",
              th: "ปุ่มน้อยๆ มักอยู่เป็นกลุ่ม",
            },
          },
        },
        {
          id: 4,
          content: {
            name: "Input Chip",
            subtitle: {
              "en-US": "Displayed user input.",
              th: "ชิปข้อมูลจากผู้ใช้",
            },
          },
        },
        {
          id: 5,
          content: {
            name: "Chip List",
            subtitle: {
              "en-US": "Chips together, at last.",
              th: "ชิปหลายๆ ภายใน Chip List",
            },
          },
        },
        {
          id: 6,
          content: {
            name: "Chip Radio Group",
            subtitle: {
              "en-US": "Choose your Chip.",
              th: "เลือกชิปที่ใช่",
            },
          },
        },
      ],
    },
  ];

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "components"])),
      componentList,
    },
  };
};

export default Components;
