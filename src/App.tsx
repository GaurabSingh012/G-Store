import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FilterProvider } from "./components/FilterContext";
import Layout from "./components/Layout";
import MainContent from "./components/MainContent";

const App = () => {
  return (
    <Router>
      <FilterProvider>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<MainContent />} />
          </Route>
        </Routes>
      </FilterProvider>
    </Router>
  );
};

export default App;