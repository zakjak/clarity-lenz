import Image from "next/image";
import React from "react";

type SlateNode = {
  type?: string;
  children: SlateNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  align?: string;
  lineHeight?: string;
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
      let text: React.ReactNode = node.text;
      if (node.bold) text = <strong>{text}</strong>;
      if (node.italic) text = <em>{text}</em>;
      if (node.underline) text = <u>{text}</u>;
      components.push(
        <React.Fragment key={`text-${index}`}>{text}</React.Fragment>,
      );
      return;
    }

    const children = plateToHtml(node.children || [], images, titles);

    switch (node.type) {
      case "p":
        paragraphCount++;
        components.push(
          <p
            key={`p-${index}`}
            style={{
              lineHeight: node.lineHeight || "normal",
              textAlign: (node.align as TextAlign) || "start",
              marginTop: "0.6rem",
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
            <div
              key={`img-${imageIndex}`}
              className="relative w-full max-w-3xl mx-auto my-6"
            >
              <Image
                src={images[imageIndex]}
                alt={`Article image ${imageIndex + 1}`}
                width={800}
                height={500}
                className="rounded-lg object-cover"
              />
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
              fontSize: node.fontSize || "inherit",
              color: node.color || "inherit",
            }}
          >
            {children}
          </blockquote>,
        );
        break;

      case "h1":
        components.push(<h1 key={`h1-${index}`}>{children}</h1>);
        break;
      case "h2":
        components.push(<h2 key={`h2-${index}`}>{children}</h2>);
        break;
      case "ul":
        components.push(<ul key={`ul-${index}`}>{children}</ul>);
        break;
      case "li":
        components.push(<li key={`li-${index}`}>{children}</li>);
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
