// Prendi gli elementi del DOM
const videoElem = document.getElementById('preview');
const outputElem = document.getElementById('output');

// Imposta il percorso del worker per la libreria qr-scanner
QrScanner.WORKER_PATH = 'https://cdn.jsdelivr.net/npm/qr-scanner@1.4.1/qr-scanner-worker.min.js';

// Inizializza il QR scanner
const qrScanner = new QrScanner(videoElem, result => {
    console.log('QR Code Scanned:', result);
    outputElem.textContent = `Risultato: ${result}`;
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
