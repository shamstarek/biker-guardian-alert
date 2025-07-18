import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, AlertTriangle, CheckCircle } from "lucide-react";
import { EmergencyButton } from "@/components/ui/emergency-button";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const handleSOSPress = async () => {
    setIsLoading(true);
    
    try {
      // Simulate SOS sending process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAlertSent(true);
      toast({
        title: "✅ SOS Alerts Sent Successfully",
        description: "Emergency contacts have been notified with your location.",
        duration: 5000,
      });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setAlertSent(false);
      }, 5000);
      
    } catch (error) {
      toast({
        title: "❌ SOS Alert Failed",
        description: "Unable to send emergency alerts. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Settings */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Biker SOS</h1>
        <button
          onClick={() => navigate("/settings")}
          className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-6 w-6 text-secondary-foreground" />
        </button>
      </header>

      {/* Main SOS Button Area */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center space-y-8">
          {/* Status Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Emergency Alert Ready
            </h2>
            <p className="text-muted-foreground text-lg">
              Tap the button below to send SOS alert to your contacts
            </p>
          </div>

          {/* SOS Button */}
          <div className="relative">
            <EmergencyButton
              variant={alertSent ? "success" : "emergency"}
              size="massive"
              onClick={handleSOSPress}
              disabled={isLoading}
              className="relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 border-4 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                  <span className="text-xl">Sending...</span>
                </div>
              ) : alertSent ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-12 w-12" />
                  <span className="text-xl">Sent!</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-16 w-16" />
                  <span className="text-3xl font-black">SOS</span>
                </div>
              )}
            </EmergencyButton>

            {/* Pulse animation ring for emergency state */}
            {!isLoading && !alertSent && (
              <div className="absolute inset-0 rounded-full border-4 border-emergency-red animate-ping opacity-75 pointer-events-none" />
            )}
          </div>

          {/* Instructions */}
          <div className="max-w-md mx-auto space-y-3 text-center">
            <p className="text-muted-foreground">
              <strong className="text-warning">Hold for 2 seconds</strong> to activate emergency alert
            </p>
            <p className="text-sm text-muted-foreground">
              Configure your emergency contacts and message in Settings
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          Stay safe on the road. Your emergency contacts are ready to help.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;