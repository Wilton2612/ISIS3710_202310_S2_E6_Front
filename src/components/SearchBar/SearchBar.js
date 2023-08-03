import "./SearchBar.css";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

export default function SearchBar({ onSearch, onFilter }) {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("course");

  const handleSearch = () => {
    onSearch(searchValue);
    onFilter(filterValue);
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <MDBDropdown>
          <MDBDropdownToggle>
            <FormattedMessage id="filter_by" />
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link onClick={() => setFilterValue("course")}>
              <FormattedMessage id="course" />
            </MDBDropdownItem>
            <MDBDropdownItem link onClick={() => setFilterValue("date")}>
              <FormattedMessage id="date" />
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={handleSearch}
      >
        <FormattedMessage id="search" />
      </button>
    </div>
  );
}
