import { useLocation, useNavigate } from 'react-router-dom';
import './QuizResult.css';

export default function QuizResult() {
    const { state } = useLocation();
    const { score = 0, total = 10 } = state || {};

    const navigate = useNavigate();

    let message = 'Essaie encore ! 📚';
    let emoji = '😅';

    if (score >= 8) {
        message = 'Excellent travail ! 🏆';
        emoji = '🎉';
    } else if (score >= 5) {
        message = 'Pas mal du tout 💪';
        emoji = '👍';
    }

    const percentage = Math.round((score / total) * 100);

    return (
        <div className="result-page">
            <div className="result-card">
                <h1>Résultat du Quiz</h1>

                <div className="score-display">
                    <span className="score">{score}</span>
                    <span className="total"> / {total}</span>
                    <div className="percentage">({percentage}%)</div>
                </div>

                <p className="result-emoji">{emoji}</p>
                <p className="result-message">{message}</p>

                <button
                    className="replay-button"
                    onClick={() => navigate('/quiz')}
                >
                    Rejouer le Quiz
                </button>
            </div>
        </div>
    );
}