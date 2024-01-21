import {
    Hind_Siliguri,
    Inter,
    Montserrat,
    Poppins,
    Roboto,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
});

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const montserrat = Montserrat({ subsets: ["latin"] });

export const hindSiliguri = Hind_Siliguri({
    subsets: ["latin", "bengali"],
    weight: ["300", "400", "500", "600", "700"],
});
