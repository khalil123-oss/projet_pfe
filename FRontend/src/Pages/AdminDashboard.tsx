import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [totalParticipants, setTotalParticipants] = useState<number | null>(null);
    const [winner, setWinner] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = async () => {
        setLoading(true);
        setError(null);
        try {
            // URL relative → nginx redirige vers Django
            const res = await fetch('/api/participants/dashboard/', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Accept': 'application/json' },
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    navigate('/login');
                    return;
                }
                throw new Error(`Erreur ${res.status}`);
            }
            const data = await res.json();
            setTotalParticipants(data.total_participants);
            setWinner(data.winner);
        } catch (err: any) {
            setError(err.message || 'Impossible de charger le tableau de bord');
        } finally {
            setLoading(false);
        }
    };

    const handleDraw = async () => {
        if (!confirm('Confirmer le lancement du tirage ?')) return;
        try {
            // DrawView a @csrf_exempt → pas besoin de token
            const res = await fetch('/api/participants/draw/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    navigate('/login');
                    return;
                }
                throw new Error(`Erreur ${res.status}`);
            }
            await res.json();
            fetchDashboard();
            alert('Tirage effectué avec succès !');
        } catch (err: any) {
            alert('Échec du tirage : ' + (err.message || 'Erreur inconnue'));
        }
    };

    useEffect(() => { fetchDashboard(); }, []);

    if (loading) return (
        <div className="dashboard-loading">
            <div className="spinner"></div>
            <p>Chargement du tableau de bord...</p>
        </div>
    );

    if (error) return (
        <div className="dashboard-error">
            <p>{error}</p>
            <button onClick={fetchDashboard} className="retry-btn">Réessayer</button>
        </div>
    );

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div className="logo-container">
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4D0BAQG7-kyJceggqA/company-logo_200_200/company-logo_200_200/0/1685352201589/topnet_tunisie_logo?e=2147483647&v=beta&t=KiXDaqh0jpE1B20-COORYWsZYrgGtveiW0dKFzkb8nU"
                        alt="Logo Admin" className="dashboard-logo" />
                    <h1 className="dashboard-title">Tableau de bord Administration</h1>
                </div>
            </div>
            <div className="dashboard-container">
                <div className="stats-grid">
                    <div className="stat-card participants">
                        <h3>Participants inscrits</h3>
                        <div className="stat-value">{totalParticipants !== null ? totalParticipants : '—'}</div>
                    </div>
                    <div className="stat-card winner">
                        <h3>Gagnant actuel</h3>
                        {winner ? (
                            <div className="winner-info">
                                <div className="winner-name">
                                    {winner.participant?.first_name} {winner.participant?.last_name}
                                </div>
                                <div className="winner-email">{winner.participant?.email}</div>
                                <div className="winner-date">
                                    Tirage du {new Date(winner.draw_at).toLocaleString('fr-FR', {
                                        dateStyle: 'medium', timeStyle: 'short'
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="no-winner">Aucun tirage effectué pour le moment</div>
                        )}
                    </div>
                </div>
                <div className="action-zone">
                    <button onClick={handleDraw}
                        className={`draw-button ${loading ? 'loading' : ''}`}
                        disabled={loading}>
                        {loading ? 'Traitement...' : 'Lancer le tirage maintenant'}
                    </button>
                </div>
            </div>
        </div>
    );
}