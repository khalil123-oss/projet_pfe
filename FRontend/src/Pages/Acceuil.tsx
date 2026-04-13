import { Link } from 'react-router-dom';
import './Acceuil.css';

function Acceuil() {
    return (
        <div className="home-container">
            <header className="home-hero">
                <h1 className="hero-title">
                    Gagnez une voiture de rêve !
                </h1>
            </header>

            <section className="home-section about-section">
                <h2>À propos du jeu</h2>
                <p>
                    Topnet organise un grand tirage au sort exclusif ! Remplissez le formulaire en quelques clics
                    pour être inscrit automatiquement. Le gagnant recevra une voiture haut de gamme flambant neuve.
                </p>
            </section>

            <section className="home-section rules-section">
                <h2>Règles de participation</h2>
                <ul>
                    <li>Ouvert à toute personne majeure (+18 ans).</li>
                    <li>Une seule participation par personne et par foyer.</li>
                    <li>Informations exactes et vérifiables obligatoires.</li>
                    <li>Tirage au sort supervisé et transparent.</li>
                    <li>Le gagnant sera contacté par email ou téléphone dans les 30 jours.</li>
                </ul>
            </section>

            <div className="home-cta">
                <Link to="/formulaire" className="participate-button">
                    Je participe maintenant !
                </Link>
            </div>
        </div>
    );
}

export default Acceuil;