import './FeedsList.module.css';
import { Alert, Card, Col, Row } from 'react-bootstrap';

export default function FeedList({ feeds, onEdit, onDelete, onView }) {
  const getDomain = (host) => {
    return host.match(/https?:\/\/([^\/]+)/)?.[1];
  };

  return (
    <div className="container container-fluid">
      {feeds?.length ? (
        <Row className=" mt-2 pt-2 d-flex align-items-stretch">
          {feeds.map((feed, i) => (
            <Col md={6} lg={4} xl={4} key={i} className="pb-4" style={{ position: 'relative' }}>
              <Card className="feed-card">
                <Card.Body>
                  <Card.Body className="d-flex align-items-center" style={{ height: '200px' }}>
                    <Card.Img src={feed.image} />
                  </Card.Body>
                  <Card.Title className="feed-card-title">
                    <a href={feed.feedUrl} target="_blank">
                      {getDomain(feed.feedUrl)}
                    </a>
                  </Card.Title>
                  <Card.Text>{feed.description}</Card.Text>
                </Card.Body>
                <Card.Body className="d-flex align-items-end p-0">
                  <div className="action-icons">
                    <span className="flex-shrink-1 view-btn" title="View RSS feed" onClick={() => onView(feed._id)}>
                      <i className="fa fa-eye  icn-btn" />
                    </span>
                    <span className="seperator"></span>
                    <span
                      className=" flex-shrink-1 edit-btn"
                      title="Edit settings of feed"
                      onClick={() => onEdit(feed)}
                    >
                      <i className="fa fa-cog  icn-btn" />
                    </span>
                    <span className="seperator"></span>

                    <span
                      className="flex-shrink-1 delete-btn"
                      title="Delete RSS feed"
                      onClick={() => onDelete(feed._id)}
                    >
                      <i className="fa fa-times  icn-btn" />
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="mt-4">
          No saved RSS feed found
        </Alert>
      )}
    </div>
  );
}
