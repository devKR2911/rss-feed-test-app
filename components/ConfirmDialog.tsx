import { Button, Modal } from 'react-bootstrap';

export default function ConfirmDialog({ show, onHide, body, onConfirm }) {
  return (
    <Modal show={show} onHide={ () => onHide(false)}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{body}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button size="sm" variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
