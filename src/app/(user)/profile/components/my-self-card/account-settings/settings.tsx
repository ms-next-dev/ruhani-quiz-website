// Packages
import { User } from "@prisma/client";

interface SettingsProps {
  user: User;
}
const Settings: React.FC<SettingsProps> = ({ user }) => {
  return <div>Settings</div>;
};

export default Settings;
