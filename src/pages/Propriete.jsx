import React, { useState } from 'react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import './Propriete.css';
import { useNavigate } from 'react-router-dom';

const Propriete = () => {
  const [selectedCity, setSelectedCity] = useState('Tous');
  const [selectedType, setSelectedType] = useState('Tous');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      image: img1,
      title: "Villa de luxe à Casablanca",
      details: "3 chambres · 2 salles de bain · 250 m²",
      price: 2500000,
      city: "Casablanca",
      type: "Villa",
      surface: 250,
      rooms: 3,
      bathrooms: 2,
      description: "Magnifique villa contemporaine avec piscine et jardin paysager",
      features: ["Piscine", "Jardin", "Garage", "Sécurité"]
    },
    {
      id: 2,
      image: img2,
      title: "Appartement moderne à Rabat",
      details: "2 chambres · 1 salle de bain · 100 m²",
      price: 1200000,
      city: "Rabat",
      type: "Appartement",
      surface: 100,
      rooms: 2,
      bathrooms: 1,
      description: "Bel appartement rénové au cœur de Rabat",
      features: ["Ascenseur", "Balcon", "Parking"]
    },
    {
      id: 3,
      image: img3,
      title: "Studio cosy à Marrakech",
      details: "1 chambre · 1 salle de bain · 60 m²",
      price: 800000,
      city: "Marrakech",
      type: "Studio",
      surface: 60,
      rooms: 1,
      bathrooms: 1,
      description: "Studio moderne idéal pour investissement",
      features: ["Meublé", "Climatisation", "Internet"]
    },
    {
      id: 4,
      image: img4,
      title: "Appartement familial à Tanger",
      details: "5 chambres · 2 salles de bain · 90 m²",
      price: 1500000,
      city: "Tanger",
      type: "Appartement",
      surface: 90,
      rooms: 5,
      bathrooms: 2,
      description: "Grand appartement familial avec vue sur la mer",
      features: ["Vue mer", "Terrasse", "Cuisine équipée"]
    },
    {
      id: 5,
      image: img5,
      title: "Studio moderne à Rabat",
      details: "5 chambres · 3 salles de bain · 120 m²",
      price: 1800000,
      city: "Rabat",
      type: "Studio",
      surface: 120,
      rooms: 5,
      bathrooms: 3,
      description: "Studio de standing dans un quartier résidentiel",
      features: ["Domotique", "Parking", "Sécurité"]
    },
    {
      id: 6,
      image: img6,
      title: "Appartement de luxe à Chefchaouen",
      details: "7 chambres · 6 salles de bain · 150 m²",
      price: 2200000,
      city: "Chefchaouen",
      type: "Appartement",
      surface: 150,
      rooms: 7,
      bathrooms: 6,
      description: "Magnifique appartement avec vue panoramique",
      features: ["Vue panoramique", "Jardin", "Piscine"]
    }
  ];

  const cities = ['Tous', ...new Set(properties.map(prop => prop.city))];
  const types = ['Tous', ...new Set(properties.map(prop => prop.type))];

  const filteredProperties = properties
    .filter(property => {
      const cityMatch = selectedCity === 'Tous' || property.city === selectedCity;
      const typeMatch = selectedType === 'Tous' || property.type === selectedType;
      const priceMatch = property.price >= priceRange[0] && property.price <= priceRange[1];
      const surfaceMatch = property.surface >= surfaceRange[0] && property.surface <= surfaceRange[1];
      return cityMatch && typeMatch && priceMatch && surfaceMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'surface-asc':
          return a.surface - b.surface;
        case 'surface-desc':
          return b.surface - a.surface;
        default:
          return 0;
      }
    });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleReservation = (property) => {
    navigate('/reservation', { state: { property } });
  };

  return (
    <div className="properties-page">
      <div className="properties-header">
        <h1>Nos Propriétés</h1>
        <p>Découvrez notre sélection de biens immobiliers</p>
      </div>

      <div className="properties-container">
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Filtres</h3>
            
            <div className="filter-group">
              <label>Ville</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Type de bien</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Prix (MAD)</label>
              <div className="range-inputs">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Surface (m²)</label>
              <div className="range-inputs">
                <input
                  type="number"
                  value={surfaceRange[0]}
                  onChange={(e) => setSurfaceRange([Number(e.target.value), surfaceRange[1]])}
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={surfaceRange[1]}
                  onChange={(e) => setSurfaceRange([surfaceRange[0], Number(e.target.value)])}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </aside>

        <main className="properties-main">
          <div className="properties-toolbar">
            <div className="sort-options">
              <label>Trier par:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="surface-asc">Surface croissante</option>
                <option value="surface-desc">Surface décroissante</option>
              </select>
            </div>

            <div className="view-options">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th"></i>
              </button>
              
            </div>
          </div>

          <div className={`properties-grid ${viewMode}`}>
            {filteredProperties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  <div className="property-type">{property.type}</div>
                </div>
                <div className="property-content">
                  <h3>{property.title}</h3>
                  <p className="property-price">{formatPrice(property.price)}</p>
                  <p className="property-details">{property.details}</p>
                  <p className="property-description">{property.description}</p>
                  <div className="property-features">
                    {property.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <button 
                    className="property-btn"
                    onClick={() => handleReservation(property)}
                  >
                    <i className="fas fa-calendar-check"></i>
                    Réserver une visite
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="no-results">
              <p>Aucune propriété ne correspond à vos critères de recherche.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Propriete; 