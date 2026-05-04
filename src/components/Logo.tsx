import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img alt="Nabi mascot" src="/nabi/nabi.svg" className="h-8 w-8" />
      <span className="font-black text-gray-800">nabi</span>
      <span className="text-primary font-black">나비</span>
    </Link>
  );
}
