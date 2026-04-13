import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizStart.css';

interface Answer {
    id: string;
    text: string;
    is_correct: boolean;
}

interface Question {
    id: string;
    text: string;
    image_url?: string;
    answers: Answer[];
}

export default function QuizStart() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        // URL relative → nginx redirige vers Django
        fetch('/api/quiz/questions/')
            .then((res) => {
                if (!res.ok) throw new Error('Erreur lors du chargement des questions');
                return res.json();
            })
            .then((data: Question[]) => {
                setQuestions(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Impossible de charger les questions.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Chargement des questions...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (questions.length === 0) return <div className="no-questions">Aucune question disponible.</div>;

    const currentQuestion = questions[currentIndex];
    const selectedAnswer = userAnswers[currentQuestion.id];

    const handleSelect = (answerId: string) => {
        setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerId }));
        const correctId = currentQuestion.answers.find((a) => a.is_correct)?.id;
        if (answerId === correctId) setScore((prev) => prev + 1);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate('/quiz/result', { state: { score, total: questions.length } });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    return (
        <div className="quiz-page">
            <div className="quiz-card">
                <div className="progress">
                    Question {currentIndex + 1} sur {questions.length}
                    <div className="progress-bar">
                        <div className="progress-fill"
                            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
                    </div>
                </div>
                {currentQuestion.image_url && (
                    <img src={currentQuestion.image_url} alt="Illustration" className="question-img" />
                )}
                <h2 className="question-text">{currentQuestion.text}</h2>
                <div className="answers">
                    {currentQuestion.answers.map((ans) => (
                        <button key={ans.id}
                            className={`answer-btn ${selectedAnswer === ans.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(ans.id)}>
                            {ans.text}
                        </button>
                    ))}
                </div>
                <div className="nav-buttons">
                    <button className="btn prev-btn" onClick={handlePrevious} disabled={currentIndex === 0}>
                        Précédent
                    </button>
                    <button className="btn next-btn" onClick={handleNext} disabled={!selectedAnswer}>
                        {currentIndex === questions.length - 1 ? 'Voir le résultat' : 'Suivant'}
                    </button>
                </div>
            </div>
        </div>
    );
}