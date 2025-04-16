import { useEffect, useState } from "react";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/players`);
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#0f0f0f] text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Jogadores</h1>

      {loading ? (
        <p className="text-center text-lg">Carregando jogadores...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">{player.name}</h2>
              <p><strong>Clã:</strong> {player.clan}</p>
              <p><strong>Troféus:</strong> {player.trophies}</p>
              <p><strong>Vitórias:</strong> {player.wins}</p>
              <p><strong>Derrotas:</strong> {player.losses}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
