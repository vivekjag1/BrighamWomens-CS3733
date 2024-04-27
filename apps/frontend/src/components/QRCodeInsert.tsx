import QRCode from "qrcode";
import { useState, useEffect } from "react";
import paths from "../common/paths.tsx";
import { DesignSystem } from "../common/StylingCommon.ts";

function QRCodeInsert(props: {
  startNodeID: string;
  endNodeID: string;
  algorithm: string;
  hasPath: boolean;
}) {
  //const canvas = document.getElementById('canvas');
  const [imgUrl, setImgUrl] = useState<string>("");

  let mobileURL: URL;
  if (props.hasPath) {
    mobileURL = new URL(paths.MOBILE_DIRECTIONS, window.location.origin);
    mobileURL.searchParams.append("startNodeID", props.startNodeID);
    mobileURL.searchParams.append("endNodeID", props.endNodeID);
    mobileURL.searchParams.append("algorithm", props.algorithm);
    console.log(mobileURL.href);
  }

  useEffect(() => {
    async function getURL() {
      let imgUrl: string = "";
      await QRCode.toDataURL(mobileURL.href).then((res) => (imgUrl = res));
      return imgUrl;
    }
    getURL().then((res) => setImgUrl(res));
  });

  if (props.hasPath) {
    return (
      <img
        style={{
          border: "5px solid",
          boxShadow: "5px 5px 5px",
          color: DesignSystem.primaryColor,
        }}
        src={imgUrl}
      ></img>
    );
  }
  return <></>;
}

export default QRCodeInsert;
