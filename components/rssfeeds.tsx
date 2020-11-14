import {Card, ListGroup} from "react-bootstrap";

export default function RssFeeds() {
  return (
    <div className="container d-flex justify-content-center">
      <div>
        <Card>
          <Card.Header as="h6">RSS FEED</Card.Header>
          <Card.Body>
          </Card.Body>
        </Card>
        <Card className="mt-2">
          <Card.Header as="h6">RSS FEED</Card.Header>
          <Card.Body>+-
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}