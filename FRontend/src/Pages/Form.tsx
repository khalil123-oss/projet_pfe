import { useState } from 'react';
import './Form.css';

export default function Form() {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsSuccess(false);
        setLoading(true);

        try {
            // URL relative → nginx redirige vers Django
            const res = await fetch('/api/participants/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setMessage('Inscription enregistrée avec succès !');
                setIsSuccess(true);
                setForm({ first_name: '', last_name: '', email: '', phone: '' });
            } else {
                const errorData = await res.json();
                setMessage(errorData.detail || 'Erreur lors de l\'inscription');
                setIsSuccess(false);
            }
        } catch {
            setMessage('Erreur réseau - veuillez vérifier votre connexion');
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-title">Participer au tirage</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input id="first_name" name="first_name" placeholder=" "
                            value={form.first_name}
                            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                            required />
                        <label htmlFor="first_name">Votre prénom</label>
                    </div>
                    <div className="form-group">
                        <input id="last_name" name="last_name" placeholder=" "
                            value={form.last_name}
                            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                            required />
                        <label htmlFor="last_name">Votre nom</label>
                    </div>
                    <div className="form-group">
                        <input id="email" type="email" name="email" placeholder=" "
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required />
                        <label htmlFor="email">Votre email</label>
                    </div>
                    <div className="form-group">
                        <input id="phone" name="phone" placeholder=" "
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            required />
                        <label htmlFor="phone">Votre numéro de téléphone</label>
                    </div>
                    <button type="submit"
                        className={`submit-btn ${loading ? 'loading' : ''}`}
                        disabled={loading}>
                        {loading ? 'Envoi en cours...' : 'Envoyer ma participation'}
                    </button>
                </form>
                {message && (
                    <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}