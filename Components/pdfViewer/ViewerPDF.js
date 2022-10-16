import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import {
  DownArrowIcon,
  NextIcon,
  PreviousIcon,
  UpArrowIcon,
} from "@react-pdf-viewer/page-navigation";
import { ProgressBar } from "@react-pdf-viewer/core";

export default function ViewerPDF({ url }) {
  const pageNavigationPluginInstance = pageNavigationPlugin(
    DownArrowIcon,
    NextIcon,
    PreviousIcon,
    UpArrowIcon
  );

  const {
    CurrentPageInput,
    GoToFirstPageButton,
    GoToLastPageButton,
    GoToNextPageButton,
    GoToPreviousPage,
  } = pageNavigationPluginInstance;

  const [urlEncoded, setUrlEncoded] = React.useState("");

  React.useEffect(() => {
    setUrlEncoded(encodeURIComponent(url));
  }, [url]);

  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js"></Worker>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#eeeeee",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            padding: "4px",
          }}
        >
          <GoToFirstPageButton />
          <GoToPreviousPage />
          <CurrentPageInput />
          <GoToNextPageButton />
          <GoToLastPageButton />
        </div>
        <Viewer
          plugins={[pageNavigationPluginInstance]}
          theme="dark"
          renderLoader={(percentages) => (
            <div style={{ width: "80%" }}>
              <ProgressBar progress={Math.round(percentages)} />
            </div>
          )}
          fileUrl={"/api/downloadFile/?url=" + urlEncoded}
        />
      </div>
    </>
  );
}
