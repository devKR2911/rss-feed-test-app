import './FeedsList.module.css';
import {Alert, Card, Col, ListGroup, ListGroupItem, Row} from 'react-bootstrap';

export default function FeedList({feeds, onEdit, onDelete, onView}) {
  return (
    <div className="container container-fluid">
      {feeds?.length ? (
        /*     <div className=" mt-2 pt-2">
               <ListGroup>
                 {feeds.map((feed, i) => (
                   <ListGroup.Item key={i} className="d-flex  align-items-center list-item">
                     <span>{feed.feedUrl}</span>
                     <span className="flex-grow-1"/>
                     <div className="action-icons">
                     <span className=" ml-4 mr-3 flex-shrink-1 edit-btn"
                           title="Edit settings of feed" onClick={() => onEdit(feed)}>
                       <i className="fa fa-cog  icn-btn" />
                     </span>
                     <span className="mr-3 flex-shrink-1 view-btn"
                           title="View RSS feed" onClick={() => onView(feed._id)}>
                       <i className="fa fa-eye  icn-btn"/>
                     </span>
                     <span className="flex-shrink-1 delete-btn" title="Delete RSS feed" onClick={() => onDelete(feed._id)}>
                       <i className="fa fa-times  icn-btn"/>
                     </span>
                     </div>
                   </ListGroup.Item>
                 ))}
               </ListGroup>
             </div>*/
        <Row className=" mt-2 pt-2">
          {feeds.map((feed, i) => (
            <Col md={6} lg={4} xl={3} key={i} className="pb-4" style={{position: 'relative'}}>
              <Card style={{width: '100%'}}>
                <Card.Body>
                  <Card.Title className="feed-card-title"><a href={feed.feedUrl} target="_blank">{feed.feedUrl}</a></Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                </Card.Body>
                {/*<ListGroup className="list-group-flush">*/}
                {/*  <ListGroupItem>Cras justo odio</ListGroupItem>*/}
                {/*</ListGroup>*/}
                <Card.Body>
                  <div className="action-icons">
                              <span className="flex-shrink-1 view-btn"
                                    title="View RSS feed" onClick={() => onView(feed._id)}>
                  <i className="fa fa-eye  icn-btn"/>
                </span>
                    <span className=" flex-shrink-1 edit-btn"
                          title="Edit settings of feed" onClick={() => onEdit(feed)}>
                  <i className="fa fa-cog  icn-btn"/>
                </span>

                    <span className="flex-shrink-1 delete-btn" title="Delete RSS feed"
                          onClick={() => onDelete(feed._id)}>
                  <i className="fa fa-times  icn-btn"/>
                </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="mt-4">No saved RSS feed found</Alert>
      )}
    </div>
  );
}
