import { Alert, ListGroup } from 'react-bootstrap';

export default function FeedList({
                                   feeds, onEdit, onDelete, onView,
                                 }) {
  return (<>
    {feeds?.length ? (
      <div className="container ">
        <ListGroup>
          {feeds.map(feed => (
            <ListGroup.Item className="d-flex  align-items-center">
              <span>{feed.feedUrl}</span>
              <span className="flex-grow-1"></span>
              <span
                className=" ml-4 mr-2 flex-shrink-1"
                title="Edit settings of feed"
                onClick={() => onEdit(feed)}
              >
                  <i className="fa fa-cog  icn-btn"></i>
                </span>
              <span
                className="mr-2 flex-shrink-1"
                title="View RSS feed"
                onClick={() => onView(feed._id)}>
                  <i className="fa fa-eye  icn-btn"></i>
                </span>
              <span
                className="flex-shrink-1"
                title="Delete RSS feed"
                onClick={() => onDelete(feed._id)}>
                  <i className="fa fa-times  icn-btn"></i>
                </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    ) : (
      <Alert variant="info">No saved RSS feed found</Alert>
    )}
  </>);
}
