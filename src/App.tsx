import Header from "./components/common/header/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { HeaderContextProvider } from "./store/HeaderContext";

function App() {
  return (
    <HeaderContextProvider>
      <Header />
      <RouterProvider router={router} />
    </HeaderContextProvider>
  );
}

export default App;
