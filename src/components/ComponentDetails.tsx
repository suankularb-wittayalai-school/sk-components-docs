import { Trans, useTranslation } from "next-i18next";

import ReactMarkdown from "react-markdown";
import ReactHtmlParser from "react-html-parser";

import {
  Card,
  CardSupportingText,
  ChipRadioGroup,
  Header,
  LinkButton,
  MainSection,
  MaterialIcon,
  Search,
  Section,
  Table,
} from "@suankularb-components/react";

import { ComponentDetails as ComponentDetailsType } from "@utils/types";
import { useRouter } from "next/router";
import { useState } from "react";

// Guidelines section
const GuidelinesSection = ({
  component,
}: {
  component: ComponentDetailsType;
}): JSX.Element => {
  const { t } = useTranslation("components");
  const locale = useRouter().locale == "th" ? "th" : "en-US";

  return (
    <Section className="flex flex-col gap-3">
      <Header
        icon={<MaterialIcon icon="design_services" allowCustomSize />}
        text={t("main.guidelines.title")}
      />

      {/* Body */}
      <div className="markdown">
        <ReactMarkdown>
          {component.guidelines.body[locale] ||
            component.guidelines.body["en-US"]}
        </ReactMarkdown>
      </div>

      {/* Check Material */}
      {component.guidelines.resources?.material && (
        <Card type="stacked" appearance="outlined">
          <CardSupportingText>
            <div className="flex flex-row items-center gap-4">
              <p className="grow">
                <Trans i18nKey="main.guidelines.checkMaterial" ns="components">
                  <span className="font-display text-lg font-bold">
                    For more details,
                  </span>{" "}
                  check out Material Design 3’s{" "}
                  {{
                    materialEquiv:
                      component.guidelines.resources?.material?.equiv,
                  }}
                  , which {{ componentName: component.name }} is based off of.
                </Trans>
              </p>
              <LinkButton
                name="Go to Material Design"
                type="text"
                iconOnly
                icon={<MaterialIcon icon="open_in_new" />}
                url={component.guidelines.resources?.material?.url}
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
  );
};

// Implementation section
const ImplementationSection = ({
  component,
  language,
  setLanguage,
}: {
  component: ComponentDetailsType;
  language: "html" | "react";
  setLanguage: Function;
}): JSX.Element => {
  const { t } = useTranslation("components");
  const locale = useRouter().locale == "th" ? "th" : "en-US";

  return (
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
            {ReactHtmlParser(component.implementation.html)}
          </div>
        </div>

        {/* Code */}
        <div className="overflow-y-scroll bg-surface-1">
          <code>
            <pre className="whitespace-pre-wrap p-4 font-mono">
              {component.implementation[language]}
            </pre>
          </code>
        </div>
      </div>
    </Section>
  );
};

// Properties section
const PropertiesSection = ({
  component,
}: {
  component: ComponentDetailsType;
}): JSX.Element => {
  const { t } = useTranslation("components");
  const locale = useRouter().locale == "th" ? "th" : "en-US";

  return (
    <Section className="flex flex-col gap-3">
      <div className="layout-grid-cols-2 sm:items-end">
        <Header
          icon={<MaterialIcon icon="settings" allowCustomSize />}
          text={t("main.properties.title")}
        />
        <Search placeholder={t("main.properties.search")} />
      </div>
      <Table type="outlined" width={920}>
        <thead>
          <tr>
            <th className="w-2/12">{t("main.properties.table.name")}</th>
            <th className="w-2/12">{t("main.properties.table.type")}</th>
            <th className="w-2/12">{t("main.properties.table.default")}</th>
            <th className="w-6/12">{t("main.properties.table.desc")}</th>
          </tr>
        </thead>
        <tbody>
          {component.properties.map((property) => (
            <tr
              key={property.id}
              className={property.required ? "container-tertiary" : undefined}
            >
              <td className="font-mono" title={property.name}>
                {property.name}
              </td>
              <td className="font-mono" title={property.type}>
                <span className="max-lines-2">{property.type}</span>
              </td>
              <td className="font-mono" title={property.defaultValue}>
                <span className="max-lines-2">{property.defaultValue}</span>
              </td>
              <td className="!text-left">
                {property.desc[locale] || property.desc["en-US"]}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex flex-row items-center justify-start gap-2">
        <Trans i18nKey="main.properties.requiredFootnote" ns="components">
          <div className="h-6 w-6 rounded bg-tertiary-container" />
          <span>means required.</span>
        </Trans>
      </div>
    </Section>
  );
};

const ComponentDetails = ({
  component,
}: {
  component: ComponentDetailsType | undefined;
}): JSX.Element => {
  const { t } = useTranslation("components");
  const locale = useRouter().locale == "th" ? "th" : "en-US";

  // Form controls
  const [language, setLanguage] = useState<"html" | "react">("html");

  return (
    <MainSection>
      {component && (
        <>
          {/* Title */}
          <Section className="leading-snug">
            <h2 className="font-display text-4xl font-bold">
              {component.name}
            </h2>
            <p className="font-display text-xl text-on-surface-variant">
              {component.subtitle[locale] || component.subtitle["en-US"]}
            </p>
          </Section>
          {/* Guidelines */}
          <GuidelinesSection component={component} />
          {/* Implementation */}
          <ImplementationSection
            component={component}
            language={language}
            setLanguage={setLanguage}
          />
          {/* Properties */}
          <PropertiesSection component={component} />
        </>
      )}
      <Section>
        <Card type="stacked" appearance="outlined">
          <CardSupportingText>
            <div className="flex flex-row items-center gap-4">
              <p className="grow">
                <Trans i18nKey="main.report.text" ns="components">
                  <span className="font-display text-lg font-bold">
                    Found an issue?
                  </span>{" "}
                  Check out our GitHub and create an issue, if you wish. Thank
                  you for your contribution!
                </Trans>
              </p>
              <LinkButton
                name={t("main.report.buttonAlt")}
                type="text"
                iconOnly
                icon={<MaterialIcon icon="open_in_new" />}
                url="https://github.com/suankularb-wittayalai-school/sk-components-docs/issues/new/choose"
                attr={{
                  target: "_blank",
                  rel: "noreferrer",
                }}
              />
            </div>
          </CardSupportingText>
        </Card>
      </Section>
    </MainSection>
  );
};

export default ComponentDetails;
