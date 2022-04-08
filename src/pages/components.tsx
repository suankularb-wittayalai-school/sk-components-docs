// Modules
import { NextPage } from "next";
import Link from "next/link";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useState } from "react";

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
import ReactMarkdown from "react-markdown";

// Page
const Components: NextPage = () => {
  const [showMain, setShowMain] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number>();

  return (
    <ListLayout
      Title={
        <Title
          name={{ title: "Components" }}
          pageIcon={<MaterialIcon icon="widgets" />}
          backGoesTo={showMain ? () => setShowMain(false) : "/"}
          LinkElement={Link}
        />
      }
      show={showMain}
    >
      <ListSection>
        <CardList
          listGroups={[
            {
              groupName: "Button",
              content: [
                {
                  id: 0,
                  content: {
                    name: "Button",
                    subtitle: "Take action with Button.",
                  },
                },
                {
                  id: 1,
                  content: {
                    name: "FAB",
                    subtitle: "A Page’s main action.",
                  },
                },
              ],
            },
            {
              groupName: "Chip",
              content: [
                {
                  id: 2,
                  content: {
                    name: "Chip",
                    subtitle: "Small buttons often together.",
                  },
                },
                {
                  id: 3,
                  content: {
                    name: "Input Chip",
                    subtitle: "Displayed user input.",
                  },
                },
              ],
            },
          ]}
          ListItem={({ content, className, onClick }) => (
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
                  title={<h3 className="text-lg font-bold">{content.name}</h3>}
                  label={content.subtitle}
                  className="font-display"
                />
              </Card>
            </button>
          )}
          onChange={(id) => setSelectedID(id)}
        />
      </ListSection>
      <MainSection>
        <Section>
          <h2 className="font-display text-4xl font-bold">Button</h2>
          <p className="font-display text-xl text-on-surface-variant">
            Take action with Button.
          </p>
        </Section>
        <Section>
          <Header
            icon={<MaterialIcon icon="design_services" allowCustomSize />}
            text="Guidelines"
          />
          <div className="markdown py-2">
            <ReactMarkdown>
              {
                "Buttons help people **initiate actions**, from sending an email, to sharing a document, to liking a post.\n\nChoose the **type of button** based on the _importance of the action_. The more important the action is, the more emphasis its button should have."
              }
            </ReactMarkdown>
          </div>
          <Card type="stacked" appearance="outlined">
            <CardSupportingText>
              <div className="flex flex-row items-center gap-2">
                <p className="grow">
                  <span className="font-display text-lg font-bold">
                    For more details,
                  </span>{" "}
                  check out Material Design 3’s Button, which Button is based
                  off of.
                </p>
                <LinkButton
                  name="Go to Material Design"
                  type="text"
                  iconOnly
                  icon={<MaterialIcon icon="open_in_new" />}
                  url="https://m3.material.io/components/buttons/overview"
                  attr={{
                    target: "_blank",
                    rel: "noreferrer",
                  }}
                />
              </div>
            </CardSupportingText>
          </Card>
        </Section>
        <Section>
          <Header
            icon={<MaterialIcon icon="code" allowCustomSize />}
            text="Implementation"
          />
          <ChipRadioGroup
            choices={[
              { id: "js", name: "JavaScript" },
              { id: "ts", name: "TypeScript" },
            ]}
            value="ts"
            required
          />
          <div className="grid aspect-[2/3] grid-rows-2 overflow-hidden rounded-lg shadow sm:aspect-[2/1] sm:grid-cols-2 sm:grid-rows-1">
            <div className="overflow-auto bg-surface">
              <div className="flex min-h-full min-w-full flex-col items-center justify-center gap-2">
                <Button name="button" label="Filled button" type="filled" />
                <Button name="button" label="Tonal button" type="tonal" />
                <Button name="button" label="Outlined button" type="outlined" />
                <Button name="button" label="Text button" type="text" />
              </div>
            </div>
            <div className="aspect-square overflow-y-scroll bg-surface-1 font-mono">
              <code>
                <pre className="whitespace-pre-wrap p-4">
                  {
                    '<Button name="button" label="Filled button" type="filled" />\n<Button name="button" label="Tonal button" type="tonal" />\n<Button name="button" label="Outlined button" type="outlined" />\n<Button name="button" label="Text button" type="text" />'
                  }
                </pre>
              </code>
            </div>
          </div>
        </Section>
      </MainSection>
    </ListLayout>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "layouts"])),
  },
});

export default Components;
