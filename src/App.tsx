import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Web3AuthProvider } from "./contexts/Web3AuthContext";
import { SUPPORTED_CHAINS, ACTIVE_CHAIN, THIRDWEB_CLIENT_ID } from "./lib/web3Config";
import Feed from "./pages/Feed";
import Dashboard from "./pages/Dashboard";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Create from "./pages/Create";
import Notifications from "./pages/Notifications";
import Communities from "./pages/Communities";
import CommunityDetail from "./pages/CommunityDetail";
import Friends from "./pages/Friends";
import Watchlist from "./pages/Watchlist";
import Settings from "./pages/Settings";
import Wallet from "./pages/Wallet";
import Verifier from "./pages/Verifier";
import Vids from "./pages/Vids";
import Drafts from "./pages/Drafts";
import Messages from "./pages/Messages";
import Bookmarks from "./pages/Bookmarks";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TokenWallet from "./pages/TokenWallet";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<Create />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/community/:communityId" element={<CommunityDetail />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/token-wallet" element={<TokenWallet />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/verifier" element={<Verifier />} />
          <Route path="/vids" element={<Vids />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/search" element={<Search />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
