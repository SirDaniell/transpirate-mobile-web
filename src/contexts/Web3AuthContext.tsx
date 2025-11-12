import React, { createContext, useContext, useState, useEffect } from "react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { useToast } from "@/hooks/use-toast";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface Web3AuthContextType {
  isAuthenticated: boolean;
  tokens: AuthTokens | null;
  login: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined);

export const Web3AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const address = useAddress();
  const sdk = useSDK();
  const { toast } = useToast();
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored tokens
    const storedTokens = localStorage.getItem("web3_auth_tokens");
    if (storedTokens) {
      setTokens(JSON.parse(storedTokens));
    }
  }, []);

  const login = async () => {
    if (!address || !sdk) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Sign authentication challenge
      const message = `Sign this message to authenticate with your wallet: ${address}\nTimestamp: ${Date.now()}`;
      const signature = await sdk.wallet.sign(message);

      // TODO: Send to backend for JWT token generation
      // const response = await fetch(`${API_BASE_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ address, signature, message })
      // });
      // const data = await response.json();

      // Mock tokens for now
      const mockTokens: AuthTokens = {
        accessToken: `mock_access_${address}`,
        refreshToken: `mock_refresh_${address}`,
      };

      setTokens(mockTokens);
      localStorage.setItem("web3_auth_tokens", JSON.stringify(mockTokens));

      toast({
        title: "Authentication successful",
        description: "You are now logged in",
      });
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication failed",
        description: "Failed to sign message or authenticate",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setTokens(null);
    localStorage.removeItem("web3_auth_tokens");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <Web3AuthContext.Provider
      value={{
        isAuthenticated: !!tokens && !!address,
        tokens,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error("useWeb3Auth must be used within Web3AuthProvider");
  }
  return context;
};
