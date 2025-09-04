import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ghost, Home, Skull } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="tombstone-shadow spooky-glow border-border/50 bg-card/95 backdrop-blur-sm max-w-md w-full">
        <CardContent className="pt-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="text-primary text-6xl animate-float">
              <Ghost className="w-20 h-20" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="font-creepster text-4xl text-primary">404</h1>
            <h2 className="font-creepster text-2xl text-muted-foreground">
              Lost in the Void
            </h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground font-lato">
              The spirits have whispered that this page has vanished into the ethereal realm...
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Skull className="w-4 h-4" />
              <span>Path: {location.pathname}</span>
            </div>
          </div>
          
          <Button 
            onClick={() => window.location.href = "/"} 
            className="spooky-glow w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to the Gates
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
