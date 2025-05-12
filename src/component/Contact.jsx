import React, { useState } from 'react';
import './Contact.css';


const RealEstateContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    message: '',
    contactPreference: 'email',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const propertyTypes = [
    'Appartement',
    'Maison',
    'Villa',
    'Terrain',
    'Commerce',
    'Bureau',
    'Autre'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^[0-9+\s()-]{8,20}$/.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide';
    }
    
    if (!formData.propertyType) newErrors.propertyType = 'Veuillez sélectionner un type de bien';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Vous devez accepter les conditions';
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Form is valid, submit it
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Here you would typically send the data to your backend or API
    // For example: axios.post('/api/contact', formData)
  };

  if (isSubmitted) {
    return (
      <div className="form-container success-container">
        <div className="success-message">
          <h2>Merci pour votre demande!</h2>
          <p>Nous vous contacterons bientôt concernant votre recherche immobilière.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                propertyType: '',
                budget: '',
                location: '',
                bedrooms: '',
                bathrooms: '',
                message: '',
                contactPreference: 'email',
                agreeToTerms: false
              });
              setIsSubmitted(false);
            }}
          >
            Soumettre une nouvelle demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Formulaire de Contact Immobilier</h2>
      <p className="form-subtitle">Complétez ce formulaire pour nous faire part de votre projet immobilier</p>
      
      <form onSubmit={handleSubmit} className="real-estate-form">
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
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="propertyType">Type de bien *</label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className={errors.propertyType ? 'error' : ''}
            >
              <option value="">Sélectionnez un type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.propertyType && <span className="error-message">{errors.propertyType}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="ex: 200000€"
            />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="location">Localisation</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ville ou code postal"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bedrooms">Chambres</label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
            >
              <option value="">Sélectionnez</option>
              {[1, 2, 3, 4, 5, '6+'].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="bathrooms">Salles de bain</label>
            <select
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
            >
              <option value="">Sélectionnez</option>
              {[1, 2, 3, 4, '5+'].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="message">Votre message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Décrivez votre projet immobilier ou posez-nous vos questions"
          ></textarea>
        </div>
        
        <div className="form-group full-width">
          <label className="contact-preference-label">Méthode de contact préférée:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="contactPreference"
                value="email"
                checked={formData.contactPreference === 'email'}
                onChange={handleChange}
              />
              Email
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="contactPreference"
                value="phone"
                checked={formData.contactPreference === 'phone'}
                onChange={handleChange}
              />
              Téléphone
            </label>
          </div>
        </div>
        
        <div className="form-group full-width">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className={errors.agreeToTerms ? 'error' : ''}
            />
            J'accepte que mes données soient traitées conformément à la politique de confidentialité *
          </label>
          {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
        </div>
        
        <div className="form-group full-width">
          <button type="submit" className="submit-button">
            Envoyer ma demande
          </button>
        </div>
      </form>
    </div>
  );
};

export default RealEstateContactForm;