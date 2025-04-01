// apiServiceLogin.ts

export interface LoginPayload {
  email: string;
  password: string;
}

const API_BASE_URL = "http://localhost:8080";

export const loginUsuario = async (payload: LoginPayload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro ao fazer login (resposta inválida).");
    }

    const result = await response.json();

    
    if (result.token) {
      localStorage.setItem("token", result.token);
    }

    return result;

  } catch (error: any) {
    if (error.message === "Failed to fetch") {
      throw new Error("Não foi possível conectar ao servidor. Verifique se a API está rodando.");
    }
    throw error;
  }
};
