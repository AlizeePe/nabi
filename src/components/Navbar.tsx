import { Home, CreditCard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/flashcards", label: "Flashcards", icon: CreditCard },
];

export function Navbar() {
  return (
    <>
      <div className="hidden items-center justify-between border-b border-gray-200 bg-white px-8 py-4 md:flex">
        <Logo />
        <div className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              to={link.to}
              key={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-bold ${
                  isActive
                    ? "bg-gray-100 text-gray-800"
                    : "text-gray-500 hover:text-gray-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-200 bg-white/90 px-6 py-4 backdrop-blur-sm md:hidden">
        <Logo />
      </div>
      <div className="fixed right-0 bottom-0 left-0 z-50 flex border-t border-gray-100 bg-white/90 backdrop-blur-sm md:hidden">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-3 text-xs font-bold ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
}
