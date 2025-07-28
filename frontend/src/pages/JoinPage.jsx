import React, { useRef, useState, useEffect } from 'react';
import { Container, Button, Form, Card, Row, Col } from 'react-bootstrap';

const Join = () => {
  const pc = useRef(null);
  const dataChannel = useRef(null);

  const [offerInput, setOfferInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState('');

  // Paste offer and create answer
  const handleStartJoin = async () => {
    try {
      const offer = JSON.parse(offerInput);
      await pc.current.setRemoteDescription(offer);
      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);
      setAnswer(JSON.stringify(answer));
    } catch {
      alert("Invalid offer JSON");
    }
  };

  // Send chat message
  const sendMessage = () => {
    if (dataChannel.current?.readyState === "open") {
      dataChannel.current.send(msg);
      setChat(prev => [...prev, { from: "Joiner", text: msg }]);
      setMsg('');
    }
  };

  useEffect(() => {
    pc.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    pc.current.ondatachannel = (event) => {
      dataChannel.current = event.channel;
      dataChannel.current.onopen = () => {
        console.log("Data channel open on Joiner");
      };
      dataChannel.current.onmessage = (e) => {
        setChat(prev => [...prev, { from: "Host", text: e.data }]);
      };
    };
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">💬 Join Chat</h2>
      <Card>
        <Card.Body>
          <Card.Title>Offer / Answer Exchange</Card.Title>
          <Form.Group className="mb-3">
            <Form.Label>Paste Offer (from Host)</Form.Label>
            <Form.Control as="textarea" rows={4} value={offerInput} onChange={e => setOfferInput(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={handleStartJoin}>Set Offer and Create Answer</Button>
          <Form.Group className="mt-3">
            <Form.Label>Answer (send to Host)</Form.Label>
            <Form.Control as="textarea" rows={4} readOnly value={answer} />
          </Form.Group>
        </Card.Body>
      </Card>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Chat</Card.Title>
          <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ddd', padding: 10 }}>
            {chat.map((c, i) => (
              <div key={i}><strong>{c.from}:</strong> {c.text}</div>
            ))}
          </div>
          <Row className="mt-2">
            <Col>
              <Form.Control value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type message..." />
            </Col>
            <Col xs="auto">
              <Button variant="info" onClick={sendMessage}>Send</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Join;
