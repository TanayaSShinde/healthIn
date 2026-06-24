import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import type { SvgIconComponent } from "@mui/icons-material";

export type PageId = "dashboard" | "patients" | "followups";

export type NavigationItem = {
  id: PageId;
  label: string;
  icon: SvgIconComponent;
};

export const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardRoundedIcon,
  },
  {
    id: "patients",
    label: "Patients",
    icon: GroupsRoundedIcon,
  },
  {
    id: "followups",
    label: "Followups",
    icon: EventRepeatRoundedIcon,
  },
];
