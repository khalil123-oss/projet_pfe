import { Link } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
    return (
        <div className="confirmation-root">
            <div className="confirmation-card">
                <div className="conf-icon">🎉</div>
                <h1>Félicitations !</h1>
                <p>le participation au tirage a été enregistrée.</p>
                <Link to="/" className="btn btn-primary">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
export default Confirmation;