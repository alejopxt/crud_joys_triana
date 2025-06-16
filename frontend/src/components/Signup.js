import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(''); // Estado para errores
  const [loading, setLoading] = useState(false); // Estado para carga
  const navigate = useNavigate(); // Hook para navegación

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validación: contraseñas coincidentes
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true); // Activar estado de carga
      
      // PASO 1: Registrar al usuario (endpoint público alternativo)
      const response = await axios.post('/api/auth/public/signup', {
        username: formData.username.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      });

      // PASO 2: Iniciar sesión automáticamente con el nuevo usuario
      const loginResponse = await axios.post('/api/auth/signin', {
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      });

      // Guardar datos de autenticación en localStorage
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('role', loginResponse.data.user.role);
      localStorage.setItem('userId', loginResponse.data.user._id);
      localStorage.setItem('username', loginResponse.data.user.username);
      
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (err) {
      // Manejo de errores
      console.error('Error en registro:', err.response?.data);
      
      // Mensajes de error específicos
      if (err.response?.data?.message === 'El email ya está en uso') {
        setError('Este correo electrónico ya está registrado');
      } else if (err.response?.data?.message === 'El username ya está en uso') {
        setError('Este nombre de usuario ya está en uso');
      } else {
        setError(err.response?.data?.message || 'Error al registrar usuario');
      }
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '450px' }} className="shadow-lg">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="text-primary">Crear Cuenta</h2>
            <p className="text-muted">Completa el formulario para registrarte</p>
          </div>
          
          {/* Mostrar errores */}
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Ingrese su nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="ejemplo@dominio.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Repita su contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={6}
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Registrando...
                </>
              ) : (
                'Registrarse'
              )}
            </Button>
          </Form>
          
          <div className="text-center mt-3">
            <span className="text-muted">¿Ya tienes una cuenta? </span>
            <Link to="/" className="text-decoration-none">Inicia sesión aquí</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;