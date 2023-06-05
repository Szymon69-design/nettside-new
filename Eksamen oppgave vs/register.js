// HER LEGGER DU INN INFOEN DIN FRÅ FIREBASE

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB7EBbeg31rWQ3lNYcuRikMzaJuHTI20CM",
    authDomain: "kunnskapsbasen-d7377.firebaseapp.com",
    projectId: "kunnskapsbasen-d7377",
    storageBucket: "kunnskapsbasen-d7377.appspot.com",
    messagingSenderId: "384396065305",
    appId: "1:384396065305:web:0d262928a3374176208888"
});
///////////////////////////////////////////////////////////

/* Firebase config */
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// Logger inn bruker med epost og passord 

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        // Sjekker om bruker er pålogga
        .then((userCredentials) => {
            // Oppretter ein sessionStorage variabel i nettlesaren. Denne brukes for å sjå om bruker er pålogga.
            sessionStorage.setItem("uid", userCredentials.user.uid)
            // Redirect to home.html 
            window.location.href = "./users.html"
        })
        .catch((error) => {
            console.error("Failed: " + error.message);
        })
}

// Oppretter bruker med epost og passord 

function signUp() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const address = document.getElementById("address").value;
    const zip = document.getElementById("zip").value;
    const city = document.getElementById("city").value;
    
    // Oppretter bruker som kan logge seg på firebase og få tilgang til nettstaden
    auth.createUserWithEmailAndPassword(email, password)
        // Lagrer også brukeren i collection "users"
        .then((userCredentials) => {
            sessionStorage.setItem("uid", userCredentials.user.uid)
            db.collection("users").doc().set({
                firstname: fname,
                lastname: lname,
                address: address,
                zip: zip,
                city: city,
                email: email,
                userId: userCredentials.user.uid
            })
                .then(function () {
                    window.location.href = "home.html";
                })
        })

        .catch((err) => {
            alert(err.message)
            console.log(err.code);
            console.log(err.message);
        });
}
