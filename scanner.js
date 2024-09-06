// Prendi gli elementi del DOM
const videoElem = document.getElementById('preview');
const outputElem = document.getElementById('output');
const imgElem = document.createElement('img'); // Creiamo l'elemento immagine, ma non lo aggiungiamo ancora alla pagina

// Imposta il percorso del worker per la libreria qr-scanner
QrScanner.WORKER_PATH = 'https://cdn.jsdelivr.net/npm/qr-scanner@1.4.1/qr-scanner-worker.min.js';

// Inizializza il QR scanner
const qrScanner = new QrScanner(videoElem, result => {
    console.log('QR Code Scanned:', result);

    // Salva il risultato in una stringa
    let scannedResult = result;
    outputElem.textContent = `Risultato: ${scannedResult}`;

    // Se la stringa è uguale a "1", mostra un'immagine
    if (scannedResult === '1') {
        imgElem.src = 'ori.png'; // Sostituisci con il percorso della tua immagine
        imgElem.alt = 'Immagine visualizzata per il codice 1';
        imgElem.style.maxWidth = '100%'; // Puoi aggiungere del CSS per dimensionare l'immagine
        document.body.appendChild(imgElem); // Aggiungi l'immagine alla pagina
    } else {
        // Se c'è già un'immagine e il risultato non è "1", la rimuoviamo
        if (document.body.contains(imgElem)) {
            document.body.removeChild(imgElem);
        }
    }
});

// Avvia la fotocamera per la scansione
qrScanner.start().then(() => {
    console.log('Camera avviata');
}).catch(err => {
    console.error('Errore nell\'avvio della fotocamera:', err);
    outputElem.textContent = 'Errore: Non è possibile accedere alla fotocamera.';
});

// Ferma la fotocamera quando l'utente lascia la pagina
window.addEventListener('beforeunload', () => {
    qrScanner.stop();
});
