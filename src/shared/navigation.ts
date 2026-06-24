import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import type { SvgIconComponent } from "@mui/icons-material";

export type NavigationItem = {
  label: string;
  icon: SvgIconComponent;
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    icon: DashboardRoundedIcon,
  },
  {
    label: "Patients",
    icon: GroupsRoundedIcon,
  },
  {
    label: "Followups",
    icon: EventRepeatRoundedIcon,
  },
];
