import { Inter, Montserrat, Poppins, Roboto } from "next/font/google";

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
