import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import AddTodo from "./AddTodo/AddTodo";
import { Header } from "./App.styled";
import Details from "./Details/Details";
import List from "./List/List";
import NotFound from "./NotFound/NotFound";

export const App = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  useEffect(() => {
    setPreviousPage(currentPage);
    setCurrentPage(location.pathname);
    // eslint-disable-next-line
  }, [location]);

  return (
    <div>
      <Header>
        <nav>
          <NavLink to="/" activeclassname="active" end>
            Create
          </NavLink>
          <NavLink to="/list" activeclassname="active">
            List
          </NavLink>
        </nav>
        <div>
          <p>Current Page: {currentPage}</p>
          <p>Previous Page:{previousPage}</p>
        </div>
      </Header>

      <Routes>
        <Route path="/" element={<AddTodo />} />
        <Route path="/list" element={<List />} />
        <Route path="/list/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
