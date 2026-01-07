const button = document.getElementById('copyButton');

    button.addEventListener('click', () => {
      const email = button.getAttribute('data-email');

      navigator.clipboard.writeText(email).then(() => {
        alert(`Skopiowano Twój email: ${email}`);
      }).catch(err => {
        console.error('Błąd przy kopiowaniu: ', err);
      });
    });
