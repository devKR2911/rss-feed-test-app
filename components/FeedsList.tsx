import './FeedsList.module.css';
import { Alert, ListGroup } from 'react-bootstrap';

export default function FeedList({ feeds, onEdit, onDelete, onView }) {
  return (
    <>
      {feeds?.length ? (
        <div className="container mt-2 pt-2">
          <ListGroup>
            {feeds.map((feed, i) => (
              <ListGroup.Item key={i} className="d-flex  align-items-center list-item">
                <span>{feed.feedUrl}</span>
                <span className="flex-grow-1"/>
                <div className="action-icons">
                <span className=" ml-4 mr-2 flex-shrink-1" title="Edit settings of feed" onClick={() => onEdit(feed)}>
                  <i className="fa fa-cog  icn-btn"/>
                </span>
                <span className="mr-2 flex-shrink-1" title="View RSS feed" onClick={() => onView(feed._id)}>
                  <i className="fa fa-eye  icn-btn"/>
                </span>
                <span className="flex-shrink-1" title="Delete RSS feed" onClick={() => onDelete(feed._id)}>
                  <i className="fa fa-times  icn-btn"/>
                </span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <Alert variant="info" className="mt-4">No saved RSS feed found</Alert>
      )}
    </>
  );
}
