import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
function SortBy({ sort, onHandleSort }) {
  const handleChange = (selectedSort) => {
    onHandleSort(selectedSort);
  };
  return (
    <div className="pt-3">
      <Dropdown onSelect={handleChange}>
        <Dropdown.Toggle variant="success" className="bg-green-600">
          {sort}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="relevancy">relevancy</Dropdown.Item>
          <Dropdown.Item eventKey="popularity">popularity</Dropdown.Item>
          <Dropdown.Item eventKey="publishedAt">publishedAt</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default SortBy;
