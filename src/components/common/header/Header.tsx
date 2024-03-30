import { useNavigate } from "react-router-dom";

export default function Header() {
  const handleHeaderClick = () => {
    window.location.href = "/"; // Navigate to the root route
  };

  return (
    <div onClick={handleHeaderClick}>
      <h1>Podcaster</h1>
    </div>
  );
}
