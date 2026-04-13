/*import { useEffect, useState } from "react";*/
import "./Navbar.css";


function Navbar() {


    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <img
                        src="https://media.licdn.com/dms/image/v2/D4D0BAQG7-kyJceggqA/company-logo_200_200/company-logo_200_200/0/1685352201589/topnet_tunisie_logo?e=2147483647&v=beta&t=KiXDaqh0jpE1B20-COORYWsZYrgGtveiW0dKFzkb8nU"
                        alt="Logo Topnet"
                    />
                    
                </div>

                <div className="nav-links">
                    <a href="/">Accueil</a>
                    <a href="/form">Participant</a>
                    <a href="/quiz">Quiz</a>
               

                   
                </div>
            </nav>
        </div>
    );
}

export default Navbar;