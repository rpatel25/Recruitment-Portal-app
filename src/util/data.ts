import { MenuItem } from "@/types/chat.type";
import { StatusType } from "@/types/project.type";

export const seniorityOptions: string[] = ["senior", "mid senior"];

export const projectStatusTypes: {
  key: StatusType;
  status: StatusType;
  color: string;
  icon: string;
}[] = [
  {
    key: "active",
    status: "active",
    color: "#B7EDC3",
    icon: "right_arrow_filled",
  },
  { key: "hold", status: "hold", color: "#F9E8B2", icon: "pause" },
  { key: "closed", status: "closed", color: "#B9D0F2", icon: "tick" },
];

export const colorMap: Record<string, string> = {
  active: "bg-green-200",
  hold: "bg-amber-100",
  closed: "bg-blue-200",
};

export const iconMap: Record<string, string> = {
  active: "right_arrow_filled",
  hold: "pause",
  closed: "tick",
};

export const menus: string[] = [
  "Recent Searches",
  "Saved Searches",
  // "Most Engaged Projects",
  // "Upcoming Interviews",
];

export const skillColors: string[] = [
  "bg-[#D6EAE7]",
  "bg-[#DAEDF3]",
  "bg-[#E1DBF5]",
  "bg-[#DAEDF3]",
  "bg-[#F9E4ED]",
  "bg-[#D6EAE7]",
  "bg-[#F9E4ED]",
  "bg-[#E1DBF5]",
];

export const loadingScreenContent = [
  "Luka is diving into the talent pool & Searching for the sharpest minds!",
  "Scanning portfolios, skills, projects, certifications, industry fit, and online presence… No detail escapes Luka!",
  "Evaluating, scoring, and ranking—only the best rise to the top!",
  "Luka is assembling the dream team… Your winning lineup is almost ready!",
  "Mission complete! Luka has handpicked your top talents!",
];

export const chatOptions: {
  key: number;
  icon: string;
  selectedIcon: string;
  label: string;
  tooltip: string;
}[] = [
  {
    key: 2,
    icon: "sourcing_icon",
    selectedIcon: "sourcing_icon_white",
    label: "Sourcing",
    tooltip: "AI-powered search for new candidates",
  },
  {
    key: 1,
    icon: "iFind_icon",
    selectedIcon: "iFind_icon_white",
    label: "",
    tooltip: "Quick Internet search in real time",
  },
  {
    key: -1,
    icon: "dFind_icon",
    selectedIcon: "dFind_icon_white",
    label: "",
    tooltip: "Dive deeper into the talent pool",
  },
];

export const industry_list = [
  "accounting",
  "airlines/aviation",
  "alternative dispute resolution",
  "alternative medicine",
  "animation",
  "apparel & fashion",
  "architecture & planning",
  "arts and crafts",
  "automotive",
  "aviation & aerospace",
  "banking",
  "biotechnology",
  "broadcast media",
  "building materials",
  "business supplies and equipment",
  "capital markets",
  "chemicals",
  "civic & social organization",
  "civil engineering",
  "commercial real estate",
  "computer & network security",
  "computer games",
  "computer hardware",
  "computer networking",
  "computer software",
  "construction",
  "consumer electronics",
  "consumer goods",
  "consumer services",
  "cosmetics",
  "dairy",
  "defense & space",
  "design",
  "e-learning",
  "education management",
  "electrical/electronic manufacturing",
  "entertainment",
  "environmental services",
  "events services",
  "executive office",
  "facilities services",
  "farming",
  "financial services",
  "fine art",
  "fishery",
  "food & beverages",
  "food production",
  "fund-raising",
  "furniture",
  "gambling & casinos",
  "glass, ceramics & concrete",
  "government administration",
  "government relations",
  "graphic design",
  "health, wellness and fitness",
  "higher education",
  "hospital & health care",
  "hospitality",
  "human resources",
  "import and export",
  "individual & family services",
  "industrial automation",
  "information services",
  "information technology and services",
  "insurance",
  "international affairs",
  "international trade and development",
  "internet",
  "investment banking",
  "investment management",
  "judiciary",
  "law enforcement",
  "law practice",
  "legal services",
  "legislative office",
  "leisure, travel & tourism",
  "libraries",
  "logistics and supply chain",
  "luxury goods & jewelry",
  "machinery",
  "management consulting",
  "maritime",
  "market research",
  "marketing and advertising",
  "mechanical or industrial engineering",
  "media production",
  "medical devices",
  "medical practice",
  "mental health care",
  "military",
  "mining & metals",
  "motion pictures and film",
  "museums and institutions",
  "music",
  "nanotechnology",
  "newspapers",
  "non-profit organization management",
  "oil & energy",
  "online media",
  "outsourcing/offshoring",
  "package/freight delivery",
  "packaging and containers",
  "paper & forest products",
  "   performing arts",
  "pharmaceuticals",
  "philanthropy",
  "photography",
  "plastics",
  "political organization",
  "primary/secondary education",
  "printing",
  "professional training & coaching",
  "program development",
  "public policy",
  "public relations and communications",
  "public safety",
  "publishing",
  "railroad manufacture",
  "ranching",
  "real estate",
  "recreational facilities and services",
  "religious institutions",
  "renewables & environment",
  "research",
  "restaurants",
  "retail",
  "security and investigations",
  "semiconductors",
  "shipbuilding",
  "sporting goods",
  "sports",
  "staffing and recruiting",
  "supermarkets",
  "telecommunications",
  "textiles",
  "think tanks",
  "tobacco",
  "translation and localization",
  "transportation/trucking/railroad",
  "utilities",
  "venture capital & private equity",
  "veterinary",
  "warehousing",
  "wholesale",
  "wine and spirits",
  "wireless",
  "writing and editing",
];

export const menuData: MenuItem[] = [
  {
    id: 0,
    label: "Search History",
    icon: "/icons/luca_menu_history.svg",
  },
  {
    id: 1,
    label: "Saved Searches",
    icon: "/icons/luca_menu_saved.svg",
  },
];

export const dropdownOptions = [
  { key: 3, label: "Contact info", icon: "contact_info" },
  { key: 4, label: "Ideal Candidate", icon: "ideal_candidate" },
  { key: 2, label: "Sourcing", icon: "sourcing_icon" },
];

export const candidateLoadingSteps: string[] = [
  "Analyzing",
  "Sourcing",
  "Filtering",
  "Ranking",
  "Delivery",
];

export const headerDropdownContent: {
  id: string;
  label: string;
  icon: string;
}[] = [
  {
    id: "account_settings",
    label: "Account Settings",
    icon: "/icons/header_dropdown/account_settings.svg",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "/icons/header_dropdown/notifications.svg",
  },
  {
    id: "visit_website",
    label: "Visit Website",
    icon: "/icons/header_dropdown/visit_website.svg",
  },
  {
    id: "support",
    label: "Support",
    icon: "/icons/header_dropdown/support.svg",
  },
  {
    id: "credits",
    label: "Credits",
    icon: "",
  },
  {
    id: "sign_out",
    label: "Sign Out",
    icon: "/icons/header_dropdown/sign_out.svg",
  },
];

export const integratedAccounts: {
  id: string;
  label: string;
  subLabel: string;
  icon: string;
}[] = [
  {
    id: "google",
    label: "Google",
    subLabel: "Calendars & Contacts",
    icon: "/icons/accounts/google.svg",
  },
  {
    id: "microsoft",
    label: "Microsoft",
    subLabel: "Calendars & Contacts",
    icon: "/icons/accounts/microsoft.svg",
  },
  {
    id: "zoom",
    label: "Zoom",
    subLabel: "Video Calls",
    icon: "/icons/accounts/zoom.svg",
  },
];

export const profileOptions: {
  id: string;
  label: string;
  icon: string;
}[] = [
  {
    id: "visit_website",
    label: "Visit Website",
    icon: "/icons/header_dropdown/visit_website.svg",
  },
  {
    id: "help_center",
    label: "Help Center",
    icon: "/icons/header_dropdown/help_center.svg",
  },
  {
    id: "sign_out",
    label: "Sign Out",
    icon: "/icons/header_dropdown/sign_out.svg",
  },
  {
    id: "delete_account",
    label: "Delete Account",
    icon: "/icons/header_dropdown/delete_account.svg",
  },
];
