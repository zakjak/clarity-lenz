import Image from "next/image";
import React from "react";

type SlateNode = {
  type?: string;
  children: SlateNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontFamily?: string;
  align?: string;
  lineHeight?: string;
  url?: string; // for links
  indent?: number; // for indentation
  listStyleType?: string;
};

type TextAlign = "start" | "center" | "end" | "justify";

export const plateToHtml = (
  nodes: SlateNode[],
  images?: string[],
  titles?: string[],
) => {
  const components: React.ReactNode[] = [];
  let paragraphCount = 0;
  let imageIndex = 0;

  nodes.forEach((node, index) => {
    if (node.text !== undefined) {
      if (!node.text) {
        components.push(<React.Fragment key={`text-${index}`} />);
        return;
      }

      const style: React.CSSProperties = {
        color: node.color,
        backgroundColor: node.bgColor,
        fontSize: node.fontSize,
        fontFamily: node.fontFamily,
      };

      let text: React.ReactNode = node.text;

      if (node.code) {
        text = (
          <code
            style={{
              backgroundColor: "#f3f4f6",
              padding: "0.1em 0.35em",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "0.9em",
            }}
          >
            {text}
          </code>
        );
      }

      if (node.bold) text = <strong>{text}</strong>;
      if (node.italic) text = <em>{text}</em>;
      if (node.underline) text = <u>{text}</u>;
      if (node.strikethrough) text = <s>{text}</s>;
      if (node.code) text = <code>{text}</code>;
      if (node.superscript) text = <sup>{text}</sup>;
      if (node.subscript) text = <sub>{text}</sub>;

      if (Object.keys(style).length > 0) {
        text = <span style={style}>{text}</span>;
      }

      components.push(
        <React.Fragment key={`text-${index}`}>{text}</React.Fragment>,
      );
      return;
    }

    const children = plateToHtml(node.children || [], images, titles);

    const blockStyle: React.CSSProperties = {
      textAlign: (node.align as TextAlign) || undefined,
      lineHeight: node.lineHeight || undefined,
      ...(node.indent && { paddingLeft: `${node.indent * 1.5}rem` }),
    };

    switch (node.type) {
      case "p":
        paragraphCount++;

        if (node.listStyleType) {
          components.push(
            <ul
              key={`ul-${index}`}
              style={{
                listStyleType: node.listStyleType,
                paddingLeft: `${(node.indent || 1) * 1.5}rem`,
                marginTop: "0.3rem",
              }}
            >
              <li
                style={{
                  lineHeight: node.lineHeight || "normal",
                  textAlign: (node.align as TextAlign) || undefined,
                }}
              >
                {children}
              </li>
            </ul>,
          );
          break;
        }
        components.push(
          <p
            key={`p-${index}`}
            style={{
              marginTop: "0.8rem",
              listStyleType: node.listStyleType,
              ...blockStyle,
            }}
          >
            {children}
          </p>,
        );

        // 🖼️ Add an image after every 2nd paragraph
        if (
          images &&
          paragraphCount % 2 === 0 &&
          imageIndex < images.length &&
          titles
        ) {
          components.push(
            <div className="p-4">
              <div
                key={`img-${imageIndex}`}
                className="relative w-full h-100 max-w-3xl  mt-6"
              >
                <Image
                  src={images[imageIndex]}
                  alt={`Article image ${titles[imageIndex]} ${imageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover absolute"
                />
              </div>
              <h3 className="text-xs text-zinc-400 mt-2">
                {titles[imageIndex]}
              </h3>
            </div>,
          );
          imageIndex++;
        }
        break;

      case "blockquote":
        components.push(
          <blockquote
            key={`bq-${index}`}
            style={{
              fontFamily: node.fontFamily || "inherit",
              borderLeft: "4px solid #e5e7eb",
              paddingLeft: "1rem",
              fontStyle: "italic",
              fontSize: node.fontSize || "inherit",
              color: node.color || "inherit",
              ...blockStyle,
            }}
          >
            {children}
          </blockquote>,
        );
        break;

      case "h1":
        components.push(
          <h1 key={`h1-${index}`} style={blockStyle}>
            {children}
          </h1>,
        );
        break;
      case "h2":
        components.push(
          <h2
            key={`h2-${index}`}
            style={{
              fontSize: node.children[0].fontSize,
              fontWeight: node.children[0].bold ? "bold" : "",
              ...blockStyle,
            }}
          >
            {children}
          </h2>,
        );
        break;
      case "ul":
        components.push(
          <ul
            key={`ul-${index}`}
            style={{
              paddingLeft: "1.5rem",
              ...blockStyle,
            }}
          >
            {children}
          </ul>,
        );
        break;
      case "li":
        components.push(
          <li key={`li-${index}`} style={blockStyle}>
            {children}
          </li>,
        );
        break;
      case "a":
        components.push(
          <a
            className="text-black underline font-semibold dark:text-white"
            key={`a-${index}`}
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>,
        );
        break;
      case "code_block":
        components.push(
          <pre
            key={`cb-${index}`}
            style={{
              backgroundColor: "#1e1e1e",
              color: "#d4d4d4",
              padding: "1rem",
              borderRadius: "6px",
              overflowX: "auto",
              fontFamily: "monospace",
              fontSize: "0.875rem",
            }}
          >
            <code>{children}</code>
          </pre>,
        );
        break;
      default:
        components.push(
          <React.Fragment key={`frag-${index}`}>{children}</React.Fragment>,
        );
        break;
    }
  });

  return components;
};
