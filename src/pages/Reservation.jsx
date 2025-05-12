import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Reservation.css';
import axios from 'axios';


const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;

  useEffect(() => {
    if (!property) {
      navigate('/properties');
    }
  }, [property, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    visitDate: '',
    visitTime: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Le numéro de téléphone n\'est pas valide';
    }
    if (!formData.visitDate) newErrors.visitDate = 'La date de visite est requise';
    if (!formData.visitTime) newErrors.visitTime = 'L\'heure de visite est requise';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await axios.post('http://localhost:3001/api/visits', {
        ...formData,
        propertyId: property._id
      });
  
      if (response.status === 201) {
        setSubmitSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          visitDate: '',
          visitTime: '',
          message: ''
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert(error.response?.data?.message || "Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!property) return null;

  return (
    <div className="reservation-page">
      <div className="reservation-header">
        <h1>Réserver une visite</h1>
        <p>Complétez le formulaire ci-dessous pour réserver une visite de ce bien</p>
      </div>

      <div className="reservation-container">
        <div className="property-summary">
          <div className="property-image">
            <img src={property.image} alt={property.title} />
          </div>
          <div className="property-details">
            <h2>{property.title}</h2>
            <p className="property-price">{property.price} MAD</p>
            <p className="property-location">
              <i className="fas fa-map-marker-alt"></i> {property.city}
            </p>
            <div className="property-features">
              <span><i className="fas fa-bed"></i> {property.rooms} chambres</span>
              <span><i className="fas fa-bath"></i> {property.bathrooms} sdb</span>
              <span><i className="fas fa-ruler-combined"></i> {property.surface} m²</span>
            </div>
          </div>
        </div>

        <div className="reservation-form-container">
          {submitSuccess ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h3>Réservation confirmée !</h3>
              <p>Nous vous contacterons dans les plus brefs délais pour confirmer votre visite.</p>
              <button 
                className="new-reservation-btn"
                onClick={() => navigate('/properties')}
              >
                Retour aux propriétés
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reservation-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="06 12 34 56 78"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="visitDate">Date de visite *</label>
                  <input
                    type="date"
                    id="visitDate"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className={errors.visitDate ? 'error' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.visitDate && <span className="error-message">{errors.visitDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="visitTime">Heure de visite *</label>
                  <select
                    id="visitTime"
                    name="visitTime"
                    value={formData.visitTime}
                    onChange={handleChange}
                    className={errors.visitTime ? 'error' : ''}
                  >
                    <option value="">Sélectionnez une heure</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                  {errors.visitTime && <span className="error-message">{errors.visitTime}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message (optionnel)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Précisez vos préférences ou questions..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calendar-check"></i>
                    Confirmer la réservation
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation; 