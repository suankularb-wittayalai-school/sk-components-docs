// Modules
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useEffect, useState } from "react";

import { db } from "@utils/firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
  const [selectedID, setSelectedID] = useState<number>(0);

  // Main content control
  const [selectedComponent, setSelectedComponent] = useState<any>();

  // Fetch Component details when selected ID changes
  useEffect(() => {
    if (selectedID != undefined) {
      // Finds the reference string that matches the selected ID
      const componentRefString = componentList
        .map((item) => item.content)
        .flat()
        .find((item) => selectedID == item.id)?.componentRef;

      // Create a Firebase Reference with the reference string
      const componentRef = componentRefString
        ? doc(db, "component", componentRefString)
        : undefined;

      // Fetch from Firebase and set the selected Component if exists
      componentRef &&
        getDoc(componentRef).then((res) =>
          setSelectedComponent(res.exists() ? res.data() : undefined)
        );
    }
  }, [componentList, selectedID]);

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

        {selectedComponent ? (
          <ComponentDetails component={selectedComponent} />
        ) : (
          <MainSection>
            <p>{t("loading", { ns: "common" })}</p>
          </MainSection>
        )}
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
