document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const currentTimeSpan = document.getElementById("current-time");

  // Lógica para alternar o tema
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      // Salvar preferência do usuário
      if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
      } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌞";
      }
    });

    // Aplicar preferência de tema salva
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
      themeToggle.textContent = "🌙";
    } else {
      themeToggle.textContent = "🌞";
    }
  }

  // Lógica para exibir a hora
  if (currentTimeSpan) {
    function updateTime() {
      fetch("http://worldtimeapi.org/api/timezone/America/Sao_Paulo")
        .then(response => response.json())
        .then(data => {
          const datetime = new Date(data.datetime);
          const options = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
          const timeString = datetime.toLocaleTimeString("pt-BR", options);
          const dateOptions = { year: "numeric", month: "long", day: "numeric" };
          const dateString = datetime.toLocaleDateString("pt-BR", dateOptions);
          currentTimeSpan.textContent = ` ${dateString} ${timeString} (Horário de Brasília)`;
        })
        .catch(error => {
          console.error("Erro ao buscar a hora:", error);
          currentTimeSpan.textContent = "Erro ao carregar a hora.";
        });
    }

    updateTime();
    setInterval(updateTime, 1000); // Atualizar a cada segundo
  }
});

