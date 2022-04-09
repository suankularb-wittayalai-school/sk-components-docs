export type ComponentList = Array<ComponentGroup>;

export type ComponentGroup = {
  groupName: {
    "en-US": string;
    th?: string;
  };
  content: Array<ComponentListItem>;
};

export type ComponentListItem = {
  id: number;
  content: {
    name: string;
    subtitle: {
      "en-US": string;
      th?: string;
    };
  };
};
