// Modules
import { GetStaticProps, NextPage } from "next";
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
const Layouts: NextPage<{ layoutList: ComponentList }> = ({ layoutList }) => {
  const { t } = useTranslation(["layouts", "common"]);
  const locale = useRouter().locale == "th" ? "th" : "en-US";

  // List Layout control
  const [showMain, setShowMain] = useState<boolean>(false);
  const [selectedID, setSelectedID] = useState<number>(0);

  // Main content control
  const [selectedComponent, setSelectedComponent] = useState<
    ComponentDetailsType | undefined
  >();

  // Fetch Layout details when selected ID changes
  useEffect(() => {
    // Finds the reference string that matches the selected ID
    const layoutRefString = layoutList
      .map((item) => item.content)
      .flat()
      .find((item) => selectedID == item.id)?.layoutRef;

    // Create a Firebase Reference with the reference string
    const layoutRef = layoutRefString
      ? doc(db, "layout", layoutRefString)
      : undefined;

    // Fetch from Firebase and set the selected Component if exists
    layoutRef
      ? getDoc(layoutRef).then((res) =>
          setSelectedComponent(
            res.exists()
              ? (res.data() as unknown as ComponentDetailsType)
              : undefined
          )
        )
      : setSelectedComponent(undefined);
  }, [layoutList, selectedID]);

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
