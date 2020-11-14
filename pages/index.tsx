import {Alert, Button, Form, ListGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";


export default function Home() {

  const router = useRouter()

  const [selectedSettings, setSelectedSettings]: [any, any] = useState(null);
  const [showSettingModal, setShowSettingModal]: [any, any] = useState(false);
  const [feeds, setFeeds]: [any[], any] = useState(null);

  const saveSettings = async () => {
    await fetch(selectedSettings._id ? '/api/feeds/' + selectedSettings._id : '/api/feeds', {
      method: selectedSettings._id ? 'PUT' : 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(selectedSettings)
    });
    setShowSettingModal(false);
    await getFeedList();
  }

  const deleteSettings = async (id) => {
    if (confirm('Do you really want to delete the feed?')) {
      await fetch('/api/feeds/' + id, {
        method: 'DELETE'
      })
      await getFeedList();
    }
  }

  const getFeedList = async () => {
    const data = await fetch('/api/feeds');
    setFeeds(await data.json());
  }

  useEffect(() => {
    getFeedList();
  }, [])

  return (
    <div className="container">
      <h3 className="text-center mt-2">RSS FEEDs</h3>
      {feeds?.length ?
        <div className="container ">
          <ListGroup>
            {feeds.map(feed => (
              <ListGroup.Item className="d-flex  align-items-center">
                <span>{feed.feedUrl}</span>
                <span className="flex-grow-1"></span>
                <span
                  className=" ml-4 mr-2 flex-shrink-1"
                  title="Edit settings of feed"
                  onClick={() => {
                    setSelectedSettings(feed);
                    setShowSettingModal(true);
                  }}>
                  <i className="fa fa-cog  icn-btn"></i></span>
                <span
                  className="mr-2 flex-shrink-1"
                  title="View RSS feed"
                  onClick={() => router.push(`/${feed._id}`)}>
                  <i className="fa fa-eye  icn-btn"></i>
                </span>
                <span
                  className="flex-shrink-1"
                  title="Delete RSS feed"
                  onClick={() => deleteSettings(feed._id)}>
                  <i className="fa fa-times  icn-btn"></i>
               </span>

              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : <Alert variant="info">No saved ESS feed found</Alert>}

      <div className="text-right mt-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setSelectedSettings({});
            setShowSettingModal(true);
          }}>
          <i className="fa fa-plus mr-1"></i>
          Add New Feed</Button>
      </div>
      {selectedSettings &&
      <Modal show={showSettingModal} onHide={() => setShowSettingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Feed Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rss Feed URL</Form.Label>
              <Form.Control size="sm" type="url" placeholder="Feed URL"
                            value={selectedSettings.feedUrl || ''}
                            onInput={e => setSelectedSettings({
                              ...selectedSettings,
                              feedUrl: e.target.value
                            })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Font Size</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Font size"
                            value={selectedSettings.fontSize || ''}
                            onInput={e => setSelectedSettings({
                              ...selectedSettings,
                              fontSize: e.target.value
                            })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Header Color</Form.Label>
              <Form.Control size="sm" type="color" placeholder="Select Header Color"
                            value={selectedSettings.headerColor || ''}
                            onInput={e => setSelectedSettings({
                              ...selectedSettings,
                              headerColor: e.target.value
                            })}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Content Color</Form.Label>
              <Form.Control size="sm" type="color" placeholder="Select Content Color"
                            value={selectedSettings.contentColor || ''}
                            onInput={e => setSelectedSettings({
                              ...selectedSettings,
                              contentColor: e.target.value
                            })}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Background Color</Form.Label>
              <Form.Control size="sm" type="color" placeholder="Select Background Color"
                            value={selectedSettings.backgroundColor || ''}
                            onInput={e => setSelectedSettings({
                              ...selectedSettings,
                              backgroundColor: e.target.value
                            })}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Block Width</Form.Label>
              <Form.Control size="sm" type="number" placeholder="Block Width"
                            value={selectedSettings.blockWidth || ''}
                            onInput={e => setSelectedSettings({
                              ...selectedSettings,
                              blockWidth: e.target.value
                            })}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Block Width</Form.Label>
              <Form.Control size="sm" type="number" placeholder="Block Height"
                            value={selectedSettings.blockHeight || ''}
                            onInput={e => setSelectedSettings({
                              ...selectedSettings,
                              blockHeight: e.target.value
                            })}/>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" size="sm"
                  onClick={() => setShowSettingModal(false)}
          >Close</Button>
          <Button variant="primary" size="sm"
                  onClick={saveSettings}
          >Save changes</Button>
        </Modal.Footer>
      </Modal>
      }

    </div>
  )
}
