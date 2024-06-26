import { useHeaderContext } from "../../../hooks/HeaderContextHook";
import Spinner from "../spinner/Spinner";
import headerStyles from "./Header.module.scss";

export default function Header() {
  const { isLoading } = useHeaderContext();

  const handleHeaderClick = () => {
    window.location.href = "/music-podcasts-challenge/"; // Navigate to the root route
  };

  return (
    <div className={headerStyles.header} onClick={handleHeaderClick}>
      <h1>Podcaster</h1>
      {!!isLoading && <Spinner />}
    </div>
  );
}
