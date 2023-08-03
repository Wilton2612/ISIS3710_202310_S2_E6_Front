import { Col, Container, Row } from "react-bootstrap";
import "./NoteCard.css";
import { FormattedMessage } from 'react-intl';
import {Link} from "react-router-dom"


export default function NoteCard({ title, createdDate, noteLogo,id }) {
  const cardStyle = {
    width: "18rem",
  };

  return (
    <div class="card" style={cardStyle}>
      <img class="card-img-top" src={noteLogo} alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <Row>
          <p class="card-text"><FormattedMessage id="created_in" /> {createdDate}</p>
          <Link to= {`noteDetail/${id}`}class="btn btn-primary">
          <FormattedMessage id="go_to_note" />
          </Link>
        </Row>
      </div>
    </div>
  );
}
