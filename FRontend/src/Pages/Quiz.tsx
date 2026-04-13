import { Link } from 'react-router-dom';
/*import './Acceuil.css';
import './Form.css';*/
import './Quiz.css';

function Quiz() {
    return (
        <div className="home-container">
            <header className="home-hero">
                <h1 className="hero-title">
                    Quiz Tunisie <span className="highlight">🎯</span>
                </h1>
                
            </header>

            <section className="home-presentation">
                <div className="form-wrapper" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center' }}>Règles du Quiz</h2>
                    <p style={{ textAlign: 'center', color: 'var(--text)' }}>
                        10 questions • Une seule réponse • 1 point par bonne réponse
                    </p>

                    <ul style={{ marginTop: '1rem' }}>
                        <li>🧠 10 questions à choix multiples</li>
                        <li>⚡ Une seule  réponse ou plusieurs par question</li>
                        <li>⏱️ Pas de limite de temps</li>
                        <li>🏆 Résultats détaillés à la fin</li>
                    </ul>

                    <div style={{ marginTop: '1.6rem' }}>
                        <Link to="/quiz/start" className="participate-button">
                            Commencer le Quiz
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Quiz;