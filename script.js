// Inicializar Firestore
const db = firebase.firestore();

let playerScore = 0;
const rankingContent = document.getElementById("ranking-content");

function updateRanking() {
    rankingContent.innerHTML = `Puntuación: ${playerScore}`;
    // Guardar la puntuación en Firebase
    db.collection("players").doc("player1").set({
        score: playerScore
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        alert("¡Correcto!");
        playerScore += 10;
        document.body.classList.add("correct-answer");
        setTimeout(() => {
            document.body.classList.remove("correct-answer");
        }, 1000);
    } else {
        alert(`Incorrecto. La respuesta correcta es ${correct}.`);
        document.body.classList.add("incorrect-answer");
        setTimeout(() => {
            document.body.classList.remove("incorrect-answer");
        }, 1000);
    }
    updateRanking();
}

// Llamar a updateRanking() después de cargar la página para mostrar la puntuación inicial
document.addEventListener("DOMContentLoaded", function() {
    updateRanking();
});

const mapPoints = document.querySelectorAll(".map-point");
const infoContent = document.getElementById("info-content");

const pointsInfo = {
    universidad: {
        title: "Universidad del Valle - Sede Buga",
        description: "Lugar de encuentro de la educación superior en Buga.",
        questions: [
            {
                question: "¿En qué año se fundó la Universidad del Valle?",
                options: ["1945", "1950", "1965", "1970"],
                answer: "1945"
            },
            {
                question: "¿Cuál es el lema de la Universidad del Valle?",
                options: ["Sapientia Aedificavit", "Saber es Poder", "Lux et Veritas", "Educación para Todos"],
                answer: "Sapientia Aedificavit"
            }
        ]
    },
    teatro: {
        title: "Teatro Municipal",
        description: "Centro cultural y artístico de Buga.",
        questions: [
            {
                question: "¿Cuál fue la primera obra presentada en el Teatro Municipal?",
                options: ["El Gran Galeoto", "Don Juan Tenorio", "La Casa de Bernarda Alba", "Hamlet"],
                answer: "El Gran Galeoto"
            }
        ]
    },
    cultura: {
        title: "Casa de la Cultura",
        description: "Espacio dedicado a la promoción de la cultura en Buga.",
        questions: [
            {
                question: "¿Qué importante evento cultural se celebra anualmente en la Casa de la Cultura?",
                options: ["Festival de Música Andina Colombiana", "Festival de Teatro", "Encuentro de Poetas", "Feria del Libro"],
                answer: "Festival de Música Andina Colombiana"
            }
        ]
    },
    academia: {
        title: "Academia de Historia",
        description: "Institución dedicada al estudio y preservación de la historia de Buga.",
        questions: [
            {
                question: "¿Quién fue el fundador de la Academia de Historia de Buga?",
                options: ["Jorge Isaacs", "Simón Bolívar", "Francisco de Paula Santander", "José María Cabal"],
                answer: "Jorge Isaacs"
            }
        ]
    },
    plazoleta: {
        title: "Plazoleta de la Revolución",
        description: "Espacio histórico que conmemora eventos revolucionarios.",
        questions: [
            {
                question: "¿Qué evento histórico se conmemora en la Plazoleta de la Revolución?",
                options: ["Independencia de Colombia", "Revolución de los Comuneros", "Batalla de Boyacá", "Grito de Independencia"],
                answer: "Revolución de los Comuneros"
            }
        ]
    },
    puente: {
        title: "Puente de la Libertad",
        description: "Referencia histórica de la época colonial en Buga.",
        questions: [
            {
                question: "¿En qué siglo fue construido el Puente de la Libertad?",
                options: ["XVII", "XVIII", "XIX", "XX"],
                answer: "XVIII"
            }
        ]
    }
};

mapPoints.forEach(point => {
    point.addEventListener("click", () => {
        const pointKey = point.getAttribute("data-point");
        const pointInfo = pointsInfo[pointKey];
        if (pointInfo) {
            displayInfo(pointInfo);
        }
    });
});

function displayInfo(info) {
    infoContent.innerHTML = `
        <h3>${info.title}</h3>
        <p>${info.description}</p>
        <h4>Preguntas</h4>
        <ul>
            ${info.questions.map(q => `
                <li>
                    <p>${q.question}</p>
                    ${q.options.map(opt => `
                        <button onclick="checkAnswer('${opt}', '${q.answer}')">${opt}</button>
                    `).join('')}
                </li>
            `).join('')}
        </ul>
    `;
}