export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    text: string;
    image?: string; // optionnel
    answers: Answer[];
}

export const questions: Question[] = [
    {
        id: "q1",
        text: "Quelle est la capitale de la Tunisie ?",
        image: "https://www.worldtravelguide.net/wp-content/uploads/2017/03/shu-Tunisia-SidiBouSaid-760300645-1440x823.jpg",
        answers: [
            { id: "a1", text: "Tunis", isCorrect: true },
            { id: "a2", text: "Sfax", isCorrect: false },
            { id: "a3", text: "Sousse", isCorrect: false },
        ],
    },
    {
        id: "q2",
        text: "Quel est le plus grand désert du monde ?",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b3badb0?auto=format&fit=crop&w=800&q=80",
        answers: [
            { id: "b1", text: "Gobi", isCorrect: false },
            { id: "b2", text: "Sahara", isCorrect: true },
            { id: "b3", text: "Antarctique", isCorrect: false },
        ],
    },
    {
        id: "q3",
        text: "Combien de gouvernorats compte la Tunisie ?",
        answers: [
            { id: "c1", text: "24", isCorrect: true },
            { id: "c2", text: "18", isCorrect: false },
            { id: "c3", text: "30", isCorrect: false },
        ],
        
    },
    {
        id: "q4",
        text: "Quel est le plus grand continent du monde en superficie ?",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764ce7?auto=format&fit=crop&w=800&q=80",
        answers: [
            { id: "a1", text: "Afrique", isCorrect: false },
            { id: "a2", text: "Asie", isCorrect: true },
            { id: "a3", text: "Europe", isCorrect: false },
        ],
    },
    {
        id: "q5",
        text: "Combien de planètes compte le système solaire ?",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
        answers: [
            { id: "b1", text: "9", isCorrect: false },
            { id: "b2", text: "8", isCorrect: true },
            { id: "b3", text: "7", isCorrect: false },
        ],
    },
    {
        id: "q6",
        text: "Quel est le plus long fleuve du monde ?",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
        answers: [
            { id: "c1", text: "L’Amazone", isCorrect: false },
            { id: "c2", text: "Le Nil", isCorrect: true },
            { id: "c3", text: "Le Danube", isCorrect: false },
        ],
    },
    {
        id: "q7",
        text: "Dans quel pays se trouve la tour Eiffel ?",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        answers: [
            { id: "d1", text: "Espagne", isCorrect: false },
            { id: "d2", text: "France", isCorrect: true },
            { id: "d3", text: "Italie", isCorrect: false },
        ],
    },
    {
        id: "q8",
        text: "Quelle est la langue la plus parlée dans le monde ?",
        image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=80",
        answers: [
            { id: "e1", text: "Anglais", isCorrect: false },
            { id: "e2", text: "Espagnol", isCorrect: false },
            { id: "e3", text: "Chinois mandarin", isCorrect: true },
            
        ],},
    {
        id: "q9",
        text: "Quel est l’océan le plus vaste du monde ?",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        answers: [
            { id: "f1", text: "Océan Atlantique", isCorrect: false },
            { id: "f2", text: "Océan Pacifique", isCorrect: true },
            { id: "f3", text: "Océan Indien", isCorrect: false },
        ],
    },
    {
        id: "q10",
        text: "Qui a peint la célèbre œuvre « La Joconde » ?",
        image: "https://www.izoa.fr/img/cms/le%20cri%20edward%20munch.jpg",
        answers: [
            { id: "g1", text: "Pablo Picasso", isCorrect: false },
            { id: "g2", text: "Léonard de Vinci", isCorrect: true },
            { id: "g3", text: "Vincent van Gogh", isCorrect: false },
        ],
    },
    
];