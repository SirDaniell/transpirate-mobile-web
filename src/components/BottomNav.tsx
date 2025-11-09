import { Home, Grid3X3, PlusCircle, User, Video } from "lucide-react";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid3X3, label: "Explore", path: "/explore" },
    { icon: PlusCircle, label: "Create", path: "/create" },
    { icon: Video, label: "Vids", path: "/vids" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-muted-foreground transition-colors"
            )}
            activeClassName="text-primary"
          >
            <item.icon className="h-6 w-6" />
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
