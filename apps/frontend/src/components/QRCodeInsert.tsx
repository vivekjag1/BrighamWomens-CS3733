import QRCode from "qrcode";
import { useState, useEffect } from "react";

function QRCodeInsert(props: {
  startNodeID: string;
  endNodeID: string;
  algorithm: string;
  hasPath: boolean;
}) {
  //const canvas = document.getElementById('canvas');
  const [url, setURL] = useState<string>("");

  useEffect(() => {
    async function getURL() {
      let url: string = "";
      await QRCode.toDataURL(
        props.startNodeID + " " + props.endNodeID + " " + props.algorithm,
      ).then((res) => (url = res));
      return url;
    }
    getURL().then((res) => setURL(res));
  }, [props]);

  console.log(url);
  if (props.hasPath) {
    return (
      <img
        style={{ border: "5px solid", boxShadow: "5px 5px 5px" }}
        src={url}
      ></img>
    );
  }
  return <></>;
}

export default QRCodeInsert;
