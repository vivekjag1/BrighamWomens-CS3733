import QRCode from "qrcode";
import { useState, useEffect } from "react";
import paths from "../common/paths.tsx";
import { DesignSystem } from "../common/StylingCommon.ts";

function QRCodeInsert(props: {
  startNodeID: string;
  endNodeID: string;
  algorithm: string;
  hasPath: boolean;
  setDisplayQRCode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //const canvas = document.getElementById('canvas');
  const [imgUrl, setImgUrl] = useState<string>("");

  let mobileURL: URL;
  if (props.hasPath) {
    mobileURL = new URL(paths.MOBILE_DIRECTIONS, window.location.origin);
    mobileURL.searchParams.append("start", props.startNodeID);
    mobileURL.searchParams.append("end", props.endNodeID);
    mobileURL.searchParams.append("algo", props.algorithm);
  }

  useEffect(() => {
    async function getURL() {
      let imgUrl: string = "";

      await QRCode.toDataURL(mobileURL.href, {
        color: {
          dark: DesignSystem.primaryColor,
          light: "#FFF",
        },
      }).then((res) => (imgUrl = res));
      return imgUrl;
    }

    getURL().then((res) => setImgUrl(res));
  });

  if (props.hasPath) {
    return (
      <img
        alt="qrcode"
        style={{
          border: "5px solid",
          color: DesignSystem.primaryColor,
        }}
        src={imgUrl}
        onClick={() => props.setDisplayQRCode(false)}
      ></img>
    );
  }
  return <></>;
}

export default QRCodeInsert;
