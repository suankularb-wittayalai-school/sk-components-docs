// Modules
import { NextPage } from "next";
import Link from "next/link";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useState } from "react";

// SK Components
import {
  CardList,
  ListLayout,
  ListSection,
  MainSection,
  MaterialIcon,
  Title,
} from "@suankularb-components/react";

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
          listGroups={[]}
          ListItem={({ content, className }) => (
            <div className={className}></div>
          )}
          onChange={(id) => setSelectedID(id)}
        />
      </ListSection>
      <MainSection>
        <p>Component</p>
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
