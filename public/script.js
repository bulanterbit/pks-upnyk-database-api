document.getElementById('pksForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = data.message;
        if (data.id) {
            // Jika data berhasil disimpan, kita bisa memberikan link untuk mengunduh dokumen
            const downloadLink = document.createElement('a');
            downloadLink.href = `/generate/${data.id}`;
            downloadLink.innerText = 'Unduh Dokumen PKS';
            downloadLink.target = '_blank';
            document.getElementById('responseMessage').appendChild(downloadLink);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'Terjadi kesalahan saat mengirim data.';
    });
});