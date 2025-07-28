import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

const HostPage = () => {
  const localVideo = useRef();
  const remoteVideo = useRef();
  const pc = useRef(null);
  const dataChannel = useRef(null);

  const [offer, setOffer] = useState('');
  const [answerInput, setAnswerInput] = useState('');

  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState('');

  const startConnection = async () => {
    dataChannel.current = pc.current.createDataChannel("chat");

    dataChannel.current.onopen = () => {
      console.log("Data channel open on Host");
    };

    dataChannel.current.onmessage = (event) => {
      setChat(prev => [...prev, { from: "Joiner", text: event.data }]);
    };

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    setOffer(JSON.stringify(offer));
  };

  const handleSetAnswer = async () => {
    try {
      const answer = JSON.parse(answerInput);
      await pc.current.setRemoteDescription(answer);
      alert("Answer set!");
    } catch {
      alert("Invalid JSON");
    }
  };

  const sendMessage = () => {
    if (dataChannel.current?.readyState === "open") {
      dataChannel.current.send(msg);
      setChat(prev => [...prev, { from: "Host", text: msg }]);
      setMsg('');
    }
  };

  useEffect(() => {
    pc.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      localVideo.current.srcObject = stream;
      stream.getTracks().forEach(track => pc.current.addTrack(track, stream));
    });

    pc.current.ontrack = (e) => {
      remoteVideo.current.srcObject = e.streams[0];
    };
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🎥 Host Video Chat</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Local Video</Card.Title>
              <video ref={localVideo} autoPlay muted playsInline width="100%" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Remote Video</Card.Title>
              <video ref={remoteVideo} autoPlay playsInline width="100%" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Offer / Answer Exchange</Card.Title>
          <Button variant="primary" onClick={startConnection}>Create Offer</Button>
          <Form.Group className="mt-3">
            <Form.Label>Offer (send to Joiner)</Form.Label>
            <Form.Control as="textarea" rows={4} value={offer} readOnly />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Paste Answer (from Joiner)</Form.Label>
            <Form.Control as="textarea" rows={4} value={answerInput} onChange={e => setAnswerInput(e.target.value)} />
          </Form.Group>
          <Button variant="success" onClick={handleSetAnswer} className="mt-2">Set Answer</Button>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body>
          <Card.Title>💬 Chat</Card.Title>
          <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ddd', padding: 10 }}>
            {chat.map((c, i) => <div key={i}><strong>{c.from}:</strong> {c.text}</div>)}
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

export default HostPage;
