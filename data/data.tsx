import Shuhrat from "../public/shuhrat.jpg"
import Dusmurod from "../public/dusmurod.jpg"
import User from "../public/user.png"
import { CalendarCheckIcon, HandshakeIcon, NewspaperIcon, RssIcon } from "lucide-react";

export const navbar = [
    { icon: <RssIcon />, name: "Yangiliklar", slug: "/news" },
    { icon: <NewspaperIcon />, name: "Loyihalar", slug: "/projects" },
    { icon: <HandshakeIcon />, name: "Hamkorlar", slug: "/partners" },
    { icon: <CalendarCheckIcon />, name: "Tadbirlar", slug: "/events" },
    // { icon: <NewspaperIcon />, name: "Tashabbuskorlar", slug: "/initiators" },
    { icon: <NewspaperIcon />, name: "Xizmatlar", slug: "/services" },
    // { icon: <NewspaperIcon />, name: "Aql Markazi", slug: "/center_mind" },
    // { icon: <NewspaperIcon />, name: "Ilmiy etika", slug: "/ilmiy_etika" },
];

export const stats = [
    { companies: 92 },
    { winners: 27 },
    { consulting: 25 },
    { clients: 187 }
];
