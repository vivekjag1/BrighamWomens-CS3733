import QRCode from "qrcode";
import { useState, useEffect } from "react";

function QRCodeInsert() {
  //const canvas = document.getElementById('canvas');
  const [url, setURL] = useState<string>("");

  useEffect(() => {
    async function getURL() {
      let url: string = "";
      await QRCode.toDataURL(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      ).then((res) => (url = res));
      return url;
    }
    getURL().then((res) => setURL(res));
  }, []);

  console.log(url);
  return <img src={url}></img>;
}

export default QRCodeInsert;
