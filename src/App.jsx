import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';
import img4 from './assets/img4.jpg';
import img5 from './assets/img5.jpg';
import img6 from './assets/img6.jpg';
import img7 from './assets/img7.jpg';
import img8 from './assets/img8.jpg';
import img9 from './assets/img9.jpg';
import img10 from './assets/img10.jpg';
import img11 from './assets/img11.jpg';
import img12 from './assets/img12.jpg';
import Navbar from './component/Navbar.jsx';
import Footer from './component/Footer.jsx';
import { Button } from "./component/ui/Button";
import Contact from './pages/Contact.jsx';
import APropos from './pages/APropos.jsx';
import Propriete from './pages/Propriete.jsx';
import Reservation from './pages/Reservation';

// Fonction bouton séparée
function ButtonDemo() {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/properties")}>Découvrir</Button>;
}

// Composant Home
function Home() {
  return (
    <div className="app">
      <section className="hero" id="home">
        <div className="overlay"></div>
        <h2>Trouvez la maison de vos rêves</h2>
        <p>Explorez des centaines de biens immobiliers à vendre ou à louer.</p>
        <ButtonDemo />
      </section>

      <section className="featured" id="properties">
        <h3>Biens en vedette</h3>
        <div className="properties">
          <div className="property-card">
            <img src={img1} alt="Maison 1" />
            <h4>Villa à Casablanca</h4>
            <p>3 chambres · 2 salles de bain · 250 m²</p>
          </div>
          <div className="property-card">
            <img src={img2} alt="Maison 2" />
            <h4>Appartement à Rabat</h4>
            <p>2 chambres · 1 salle de bain · 100 m²</p>
          </div>
          <div className="property-card">
            <img src={img3} alt="Maison 3" />
            <h4>Studio à Marrakech</h4>
            <p>1 chambre · 1 salle de bain · 60 m²</p>
          </div>
          <div className="property-card">
            <img src={img4} alt="Maison 4" />
            <h4>Appartement à Tanger</h4>
            <p>5 chambres · 2 salles de bain · 90 m²</p>
          </div>
          <div className="property-card">
            <img src={img5} alt="Maison 5" />
            <h4>Studio à Rabat</h4>
            <p>5 chambres · 3 salles de bain · 120 m²</p>
          </div>
          <div className="property-card">
            <img src={img6} alt="Maison 6" />
            <h4>Appartement à Chefchaouen</h4>
            <p>7 chambres · 6 salles de bain · 150 m²</p>
          </div>
          <div className="property-card">
            <img src={img7} alt="Maison 7" />
            <h4>Studio à Casablanca</h4>
            <p>6 chambres · 2 salles de bain · 80 m²</p>
          </div>
          <div className="property-card">
            <img src={img8} alt="Maison 8" />
            <h4>Appartement à Taghazout</h4>
            <p>7 chambres · 1 salle de bain · 90 m²</p>
          </div>
          <div className="property-card">
            <img src={img9} alt="Maison 9" />
            <h4>Appartement à Casablanca</h4>
            <p>1 chambre · 1 salle de bain · 60 m²</p>
          </div>
          <div className="property-card">
            <img src={img10} alt="Maison 10" />
            <h4>Appartement à Rabat</h4>
            <p>1 chambre · 1 salle de bain · 60 m²</p>
          </div>
          <div className="property-card">
            <img src={img11} alt="Maison 11" />
            <h4>Appartement à Casablanca</h4>
            <p>8 chambres · 1 salle de bain · 60 m²</p>
          </div>
          <div className="property-card">
            <img src={img12} alt="Maison 12" />
            <h4>Appartement à Rabat</h4>
            <p>9 chambres · 4 salles de bain · 200 m²</p>
          </div>
        </div>
      </section>
      
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<APropos />} />
            <Route path="/properties" element={<Propriete />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
