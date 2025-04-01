const API_BASE_URL = "http://localhost:8080";

export interface BlogUser {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
  userType: string;
}

export const fetchUserData = async (): Promise<BlogUser | null> => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    console.error("Token ou userId não encontrado no localStorage.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error("Erro ao buscar usuário.");

    const user = await response.json();
    return user as BlogUser;

  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return null;
  }
};
