// src/scripts/modal.js

// Declarar función global
window.openPokemonModal = function(pokemonData) {
  const modal = document.getElementById('pokemon-modal');
  if (!modal) return;

  // Actualizar datos
  modal.querySelector('#modal-img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`;
  modal.querySelector('#modal-name').textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
  modal.querySelector('#modal-id').textContent = `#${String(pokemonData.id).padStart(3, '0')}`;
  modal.querySelector('#modal-height').textContent = (pokemonData.height / 10).toFixed(1);
  modal.querySelector('#modal-weight').textContent = (pokemonData.weight / 10).toFixed(1);
  modal.querySelector('#modal-abilities').textContent = pokemonData.abilities.map(a => a.ability.name).join(', ');

  // Estadísticas
  const statsContainer = modal.querySelector('#modal-stats');
  statsContainer.innerHTML = '';
  pokemonData.stats.forEach(stat => {
    const div = document.createElement('div');
    div.className = 'stat';
    div.innerHTML = `
      <span class="stat-name">${stat.stat.name.toUpperCase()}:</span>
      <div class="stat-bar"><div class="stat-fill" style="width: ${(stat.base_stat / 255) * 100}%"></div></div>
      <span class="stat-value">${stat.base_stat}</span>
    `;
    statsContainer.appendChild(div);
  });

  // Mostrar modal
  modal.style.display = 'flex';

  // Cerrar
  modal.querySelector('.close').onclick = () => modal.style.display = 'none';
  window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

  // Confeti al adoptar
  const adoptBtn = modal.querySelector('#adopt-btn');
  adoptBtn.onclick = async () => {
    const { default: confetti } = await import('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    alert(`¡Adoptado! ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)} es tuyo`);
  };
};