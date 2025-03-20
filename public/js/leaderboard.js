document.addEventListener('DOMContentLoaded', () => {
    fetchLeaderboardData();
  });
  
  async function fetchLeaderboardData() {
    try {
      const response = await fetch('/leaderboard/data');
      const data = await response.json();
      displayLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  }
  
  function displayLeaderboard(data) {
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';
  
    data.sort((a, b) => b.score - a.score);
  
    data.forEach((player, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.score}</td>
      `;
      leaderboardBody.appendChild(row);
    });
  }
  