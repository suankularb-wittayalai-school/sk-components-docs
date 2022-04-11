// Modules
import { ReactNode } from "react-markdown/lib/react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({
  language,
  hasSharpCorners,
  children,
}: {
  language: string;
  hasSharpCorners?: boolean;
  children: ReactNode;
}): JSX.Element => (
  <SyntaxHighlighter
    language={language}
    style={vscDarkPlus}
    customStyle={{
      backgroundColor: "#1e2529",
      margin: 0,
      fontSize: "var(--text-base)",
      borderRadius: hasSharpCorners ? 0 : "var(--rounded-lg)",
      boxShadow: "var(--shadow)",
    }}
  >
    {children}
  </SyntaxHighlighter>
);

export default CodeBlock;
