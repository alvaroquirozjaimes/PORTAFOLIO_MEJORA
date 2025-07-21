document.addEventListener("DOMContentLoaded", function () {
  const scriptURL = "https://script.google.com/macros/s/AKfycbyTFB-42-yMYMa-nlrZeQupegqcKpGq3_spd_fYZvDUR3cmaeMt9MLgbcF_k1CJDDM25A/exec";
  const form = document.getElementById("contactForm");
  const submitBtn = form?.querySelector(".submit-btn");
  const originalBtnText = submitBtn?.textContent || "Enviar Mensaje";

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
        submitBtn.style.opacity = "0.7";
      }

      const formData = new FormData(form);

      fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString()
      })
        .then(response => response.json())
        .then(data => {
          if (data.result === "success") {
            showNotification("✅ Mensaje enviado correctamente.", "success");
            form.reset();
          } else {
            throw new Error("Respuesta no exitosa del servidor");
          }
        })
        .catch(error => {
          console.error("Error al enviar email:", error);
          showNotification("❌ Error al enviar el mensaje. Intenta de nuevo.", "error");
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.opacity = "1";
          }
        });
    });
  }

  // Aquí puedes mantener el resto de tu JS, por ejemplo showNotification, menú hamburguesa, etc.
  // ...

  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 1.2rem; cursor: pointer; margin-left: 10px;">×</button>
    `;
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      zIndex: "9999",
      maxWidth: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease"
    });

    if (type === "success") {
      notification.style.background = "linear-gradient(135deg, #22c55e, #10b981)";
    } else if (type === "error") {
      notification.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
    } else {
      notification.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentElement) notification.remove();
      }, 300);
    }, 5000);
  }
});



function toggleDescription(id, btn) {
    const content = document.getElementById(id);
    content.classList.toggle('collapsed');
    btn.textContent = content.classList.contains('collapsed') ? 'Ver más' : 'Ver menos';
  }


  document.addEventListener("DOMContentLoaded", () => {
    const projects = Array.from(document.querySelectorAll(".project-card"));
    const pagination = document.getElementById("pagination");
    const itemsPerPage = 3;
    let currentPage = 1;
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    function showPage(page) {
      // Validar límites
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;
      currentPage = page;

      // Ocultar todos
      projects.forEach((card, index) => {
        card.style.display = "none";
        if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
          card.style.display = "block";
        }
      });

      updatePagination();
    }

    function updatePagination() {
      pagination.innerHTML = "";

      // Botón anterior <<
      const prev = document.createElement("button");
      prev.textContent = "<<";
      prev.disabled = currentPage === 1;
      prev.onclick = () => showPage(currentPage - 1);
      pagination.appendChild(prev);

      // Números
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => showPage(i);
        pagination.appendChild(btn);
      }

      // Botón siguiente >>
      const next = document.createElement("button");
      next.textContent = ">>";
      next.disabled = currentPage === totalPages;
      next.onclick = () => showPage(currentPage + 1);
      pagination.appendChild(next);
    }

    showPage(1); // Inicializar
  });




    function filterTech(category) {
        const items = document.querySelectorAll('.tech-item');
        const filterButtons = document.querySelectorAll('button[onclick^="filterTech"]');

        // First, reset all filter buttons to their default style
        filterButtons.forEach(button => {
            button.style.background = '#1e293b'; // Your default button background
            button.style.color = '#cbd5e1'; // Your default button text color
        });

        // Then, find the button that was just clicked and apply the green style
        // We use 'event.currentTarget' to get the specific button that triggered the function
        if (event && event.currentTarget) { // Ensure event is available (it usually is with onclick)
            event.currentTarget.style.background = '#4CAF50'; // Green color for active button
            event.currentTarget.style.color = '#ffffff'; // White text for contrast
        }

        // Now, filter the tech items based on the category
        items.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block'; // Or 'grid' if your tech-grid uses grid display
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Optional: Set the 'Todos' button as active and show all items when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        const allButton = document.querySelector('button[onclick="filterTech(\'all\')"]');
        if (allButton) {
            allButton.style.background = '#4CAF50'; // Set 'Todos' to green
            allButton.style.color = '#ffffff'; // Set 'Todos' text to white
        }
        filterTech('all'); // Ensure all items are visible by default
    }); 


    fetch('https://alvaroquirozjaimes.github.io/PORTAFOLIO_MEJORA/')
  .then(res => res.json())
  .then(data => {
    document.getElementById('visits').textContent = data.value;
  });



  