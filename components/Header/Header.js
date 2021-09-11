import TopBar from "./TopBar";
import Menu from "./Menu";

export default function Header() {
  return (
    <div>
      <div className="header">
        <TopBar />
        <Menu />
      </div>
    </div>
  );
}
