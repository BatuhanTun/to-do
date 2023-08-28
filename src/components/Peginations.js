import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginations = ({ pages, setCurrentPage,currentTodos,todos }) => {

  const numOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="hint-text"><b>{todos.length}</b> veri arasından <b>{currentTodos.length}</b> tanesi gösteriliyor</span>
      <Pagination style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination.Prev className={`${currentButton === 1 ? 'me-2 disabled' : 'me-2 '}`} onClick={() =>
          setCurrentButton((prev) => prev === 1 ? prev : prev - 1)} />
        <Pagination.Item active>
          {currentButton}
        </Pagination.Item>
        <Pagination.Next className={`${currentButton === numOfPages.length ? 'ms-2 disabled' : 'ms-2'}`} onClick={() =>
          setCurrentButton((prev) => prev === numOfPages.length ? prev : prev + 1)} />
      </Pagination>
    </div>
  )
}

export default Paginations;