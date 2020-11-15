import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-nextjs-toast';

export default function SettingsModal({ selectedSettings, onSave, show, onHide, onSettingsUpdate }) {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    setValidated(false);
  }, [show]);

  const saveSettings = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (!(formRef?.current as HTMLFormElement)?.checkValidity()) return;
    // await fetch(selectedSettings._id ? `/api/feeds/${selectedSettings._id}` : '/api/feeds', {
    //   method: selectedSettings._id ? 'PUT' : 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(selectedSettings),
    // });

    let query;
    let variables;
    if (selectedSettings._id) {
      query = `mutation($id: String!, $feed: FeedInput!) {
           FeedUpdate(id: $id,  feed: $feed){
               _id
           }
        }`;
      variables = { id: selectedSettings._id, feed:selectedSettings };
    } else {
      query = `mutation ($feed: FeedInput!) {
           FeedInsert(feed: $feed){
               _id
           }
        }`;
      variables = { feed:selectedSettings };
    }

    await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables
      }),
    });

    onHide(false);
    toast.notify('Feeds saved successfully', {
      duration: 3,
      type: 'success',
    });
    if (onSave) await onSave();
  };

  return (
    <>
      {selectedSettings && (
        <Modal show={show} onHide={() => onHide(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Feed Settings</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form noValidate ref={formRef} validated={validated}>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Rss Feed URL</Form.Label>
                    <Form.Control
                      required
                      size="sm"
                      type="url"
                      placeholder="Feed URL"
                      value={selectedSettings.feedUrl || ''}
                      onInput={(e) =>
                        onSettingsUpdate({
                          ...selectedSettings,
                          feedUrl: e.target.value,
                        })
                      }
                    />

                    <Form.Control.Feedback type="invalid">Please enter a valid url.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Header Font Size</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Header Font size"
                      value={selectedSettings.headerFontSize || ''}
                      onInput={(e) =>
                        onSettingsUpdate({
                          ...selectedSettings,
                          headerFontSize: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Content Font Size</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Content Font size"
                      value={selectedSettings.contentFontSize || ''}
                      onInput={(e) =>
                        onSettingsUpdate({
                          ...selectedSettings,
                          contentFontSize: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Block Height</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      placeholder="Block Height"
                      value={selectedSettings.height || ''}
                      onInput={(e) =>
                        onSettingsUpdate({
                          ...selectedSettings,
                          height: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Block Width</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      placeholder="Block Width"
                      value={selectedSettings.width || ''}
                      onInput={(e) =>
                        onSettingsUpdate({
                          ...selectedSettings,
                          width: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Header Color</Form.Label>
                    <Form.Control
                      size="sm"
                      type="color"
                      placeholder="Select Header Color"
                      value={selectedSettings.headerColor || '#000000'}
                      onInput={(e) =>
                        onSettingsUpdate({
                          ...selectedSettings,
                          headerColor: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Content Color</Form.Label>
                    <Form.Control
                      size="sm"
                      type="color"
                      placeholder="Select Content Color"
                      value={selectedSettings.contentColor || '#000000'}
                      onInput={(e) =>
                        onSettingsUpdate({
                          ...selectedSettings,
                          contentColor: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Background Color</Form.Label>
                    <Form.Control
                      size="sm"
                      type="color"
                      placeholder="Select Background Color"
                      value={selectedSettings.backgroundColor || '#ffffff'}
                      onInput={(e) =>
                        onSettingsUpdate({
                          ...selectedSettings,
                          backgroundColor: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={() => onHide(false)}>
              Close
            </Button>
            <Button onClick={saveSettings} variant="primary" size="sm">
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
