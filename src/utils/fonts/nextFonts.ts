import { IBM_Plex_Sans, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export { inter as BodyFont, ibmPlexSans as EditorFont };

