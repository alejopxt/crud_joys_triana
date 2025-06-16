import React from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Panel de Control</h5>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Card.Header>
        <Card.Body>
          <Alert variant="success">
            ¡Bienvenido <strong>{username}</strong>!
          </Alert>
          <Card.Text>
            <strong>Rol:</strong> {role}
          </Card.Text>
          
          {/* Aquí puedes añadir más contenido según el rol */}
          <div className="mt-4">
            <h6>Acciones disponibles:</h6>
            <div className="d-flex gap-2 mt-2">
              <Button variant="outline-primary">Ver productos</Button>
              <Button variant="outline-secondary">Mi perfil</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;