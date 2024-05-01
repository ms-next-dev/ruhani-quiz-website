import { Hind_Siliguri, Montserrat, Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const montserrat = Montserrat({ subsets: ["latin"] });

export const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});
