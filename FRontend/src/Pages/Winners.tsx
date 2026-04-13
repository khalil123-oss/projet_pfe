/*import { useEffect, useState } from 'react';
import './Winners.css';

interface Winner {
    id: number;
    participant: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    draw_at: string;
    is_confirmed?: boolean;
}

export default function Winners() {
    const [winners, setWinners] = useState<Winner[]>([]);
    const [latestWinner, setLatestWinner] = useState<Winner | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchWinners();
    }, []);

    const fetchWinners = async () => {
        try {
            setLoading(true);
            setError(null);

            // Latest winner
            try {
                const latestResponse = await fetch('/api/participants/winners/latest/', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                });

                if (latestResponse.ok) {
                    const latestData = await latestResponse.json();
                    setLatestWinner(latestData);
                }
            } catch (e) {
                console.error('Erreur latest winner:', e);
            }

            // All winners
            const response = await fetch('/api/participants/winners/', {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setWinners(Array.isArray(data) ? data : []);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Impossible de charger les gagnants';
            console.error('Erreur fetch winners:', err);
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="winners-container">
            <div className="winners-header">
                <h1>🏆 Nos Gagnants 🏆</h1>
                <p>Découvrez les heureux gagnants de notre tirage au sort</p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <p>Chargement des gagnants...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <p>❌ {error}</p>
                    <button onClick={fetchWinners} className="retry-button">
                        Réessayer
                    </button>
                </div>
            ) : (
                <>
                    {latestWinner && (
                        <section className="latest-winner-section">
                            <h2>🌟 Dernier Gagnant 🌟</h2>
                            <div className="latest-winner-card">
                                <div className="winner-name">
                                    {latestWinner.participant.firstName} {latestWinner.participant.lastName}
                                </div>
                                <div className="winner-details">
                                    <p><strong>Email:</strong> {latestWinner.participant.email}</p>
                                    <p><strong>Téléphone:</strong> {latestWinner.participant.phone}</p>
                                    <p>
                                        <strong>Date du tirage:</strong>{' '}
                                        {new Date(latestWinner.draw_at).toLocaleString('fr-TN', {
                                            dateStyle: 'long',
                                            timeStyle: 'short',
                                        })}
                                    </p>
                                    {latestWinner.is_confirmed && (
                                        <p className="confirmed-badge">✅ Victoire confirmée</p>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="all-winners-section">
                        <h2>📋 Tous les Gagnants</h2>
                        {winners.length === 0 ? (
                            <div className="no-winners">
                                <p>Aucun gagnant pour le moment...</p>
                                <p>Un tirage au sort sera bientôt effectué!</p>
                            </div>
                        ) : (
                            <div className="winners-grid">
                                {winners.map((winner, index) => (
                                    <div key={winner.id} className="winner-item">
                                        <div className="winner-rank">#{index + 1}</div>
                                        <h3>
                                            {winner.participant.firstName} {winner.participant.lastName}
                                        </h3>
                                        <p className="winner-email">{winner.participant.email}</p>
                                        <p className="winner-date">
                                            {new Date(winner.draw_at).toLocaleDateString('fr-TN', {
                                                dateStyle: 'medium',
                                            })}
                                        </p>
                                        {winner.is_confirmed && (
                                            <span className="badge-confirmed">Confirmé</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}*/