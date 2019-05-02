import { ReactElement } from "react";
import { Helmet as HelmetType } from "react-helmet";
import { renderToString as renderToStringOrigin } from "react-dom/server";

export function renderToString(
  jsx: ReactElement,
  Helmet: typeof HelmetType
): string {
  const body = renderToStringOrigin(jsx);
  const helmet = Helmet.renderStatic();
  const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        ${body}
      </body>
    </html>
  `.trim();

  return html;
}
