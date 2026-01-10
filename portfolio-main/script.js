document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('copyButton');
  if (!btn) return;

  // Optional: element do wyświetlania krótkiej informacji (jeśli istnieje w HTML)
  const message = document.getElementById('copyMessage');

  btn.addEventListener('click', async () => {
    const email = btn.getAttribute('data-email') || btn.textContent.trim();

    try {
      await navigator.clipboard.writeText(email);
      const previous = btn.textContent;
      btn.textContent = 'Skopiowano!';
      btn.disabled = true;
      if (message) {
        message.style.display = 'inline';
      }
      setTimeout(() => {
        btn.textContent = previous;
        btn.disabled = false;
        if (message) {
          message.style.display = 'none';
        }
      }, 2000);
      return;
    } catch (err) {
      // fallback
    }

    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const succeeded = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (succeeded) {
        const previous = btn.textContent;
        btn.textContent = 'Skopiowano!';
        btn.disabled = true;
        if (message) {
          message.style.display = 'inline';
        }
        setTimeout(() => {
          btn.textContent = previous;
          btn.disabled = false;
          if (message) {
            message.style.display = 'none';
          }
        }, 2000);
      } else {
        throw new Error('execCommand failed');
      }
    } catch (err2) {
      document.body.removeChild(textarea);
      alert('Nie udało się skopiować adresu. Skopiuj ręcznie: ' + email);
    }
  });
});