import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import SpookyLoader from '@/components/SpookyLoader';
import { Eye, EyeOff, Ghost, Skull } from 'lucide-react';
import spookyBg from '@/assets/spooky-bg.jpg';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  const { signup, login, resetPassword } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError("A name is required to join the coven!");
      return;
    }
    
    if (!email.includes('@')) {
      setError("A valid spirit vessel (email) is required!");
      return;
    }
    
    if (password.length < 6) {
      setError("A more powerful incantation (password) is required! At least 6 characters.");
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, username);
    } catch (error: any) {
      setError(getSpookyErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      setError("A valid spirit vessel (email) is required!");
      return;
    }
    
    if (!password) {
      setError("Your secret incantation (password) is needed!");
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (error: any) {
      setError(getSpookyErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email.includes('@')) {
      setError("Enter your spirit vessel (email) first!");
      return;
    }

    try {
      setError('');
      await resetPassword(email);
      setResetEmailSent(true);
    } catch (error: any) {
      setError(getSpookyErrorMessage(error.code));
    }
  };

  const getSpookyErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return "This soul has not joined our realm yet...";
      case 'auth/wrong-password':
        return "The spirits reject this incantation...";
      case 'auth/email-already-in-use':
        return "This spirit vessel is already claimed by another...";
      case 'auth/weak-password':
        return "Your incantation is too weak to protect your spirit!";
      case 'auth/invalid-email':
        return "The spirit realm doesn't recognize this vessel...";
      default:
        return "The dark forces are blocking your path... Try again.";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SpookyLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Spooky Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url('${spookyBg}')` }}
      ></div>
      
      {/* Animated Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
          <div className="animate-sway-left absolute bottom-0 left-10 w-8 h-24 bg-spooky-orange/30 rounded-t-full transform origin-bottom"></div>
          <div className="animate-sway-right absolute bottom-0 left-20 w-6 h-20 bg-spooky-orange/25 rounded-t-full transform origin-bottom delay-1000"></div>
          <div className="animate-sway-left absolute bottom-0 left-32 w-10 h-28 bg-spooky-orange/35 rounded-t-full transform origin-bottom delay-2000"></div>
          <div className="animate-sway-right absolute bottom-0 right-10 w-8 h-24 bg-spooky-orange/30 rounded-t-full transform origin-bottom delay-500"></div>
          <div className="animate-sway-left absolute bottom-0 right-20 w-6 h-20 bg-spooky-orange/25 rounded-t-full transform origin-bottom delay-1500"></div>
          <div className="animate-sway-right absolute bottom-0 right-32 w-10 h-28 bg-spooky-orange/35 rounded-t-full transform origin-bottom delay-3000"></div>
        </div>
        <div className="absolute inset-0">
          <div className="animate-fall-leaf-1 absolute top-0 left-1/4 w-3 h-3 bg-spooky-orange rounded-full opacity-60"></div>
          <div className="animate-fall-leaf-2 absolute top-0 left-1/2 w-2 h-2 bg-halloween-red rounded-full opacity-40 delay-1000"></div>
          <div className="animate-fall-leaf-3 absolute top-0 left-3/4 w-4 h-4 bg-spooky-orange rounded-full opacity-50 delay-2000"></div>
          <div className="animate-fall-leaf-1 absolute top-0 right-1/4 w-3 h-3 bg-halloween-red rounded-full opacity-45 delay-3000"></div>
          <div className="animate-fall-leaf-2 absolute top-0 right-1/3 w-2 h-2 bg-spooky-orange rounded-full opacity-35 delay-4000"></div>
        </div>
      </div>
      
      <div className="w-full max-w-md relative z-20">
        <Card className="tombstone-shadow spooky-glow red-aura border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="text-primary text-4xl animate-float">
                <Ghost className="w-12 h-12" />
              </div>
            </div>
            <CardTitle className="font-creepster text-3xl text-primary">
              The Gates
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter the realm of shadows...
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
                <TabsTrigger value="login" className="font-lato">
                  Enter the Abyss
                </TabsTrigger>
                <TabsTrigger value="signup" className="font-lato">
                  Join the Coven
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-lato">Spirit Vessel (Email)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="spooky-glow bg-input/50"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-lato">Secret Incantation</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="spooky-glow bg-input/50 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  {error && (
                    <Alert className="border-destructive/50 bg-destructive/10">
                      <Skull className="h-4 w-4" />
                      <AlertDescription className="font-lato">{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {resetEmailSent && (
                    <Alert className="border-primary/50 bg-primary/10">
                      <Ghost className="h-4 w-4" />
                      <AlertDescription className="font-lato">
                        A mystical message has been sent to your spirit vessel!
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button type="submit" className="w-full spooky-glow" disabled={loading}>
                    Cross the Threshold
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-sm text-muted-foreground hover:text-primary"
                    onClick={handleResetPassword}
                  >
                    Lost your spirit?
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username" className="font-lato">Your Dark Name</Label>
                    <Input
                      id="signup-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="spooky-glow bg-input/50"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="font-lato">Spirit Vessel (Email)</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="spooky-glow bg-input/50"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="font-lato">Secret Incantation</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="spooky-glow bg-input/50 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      At least 6 characters to ward off evil spirits
                    </p>
                  </div>
                  
                  {error && (
                    <Alert className="border-destructive/50 bg-destructive/10">
                      <Skull className="h-4 w-4" />
                      <AlertDescription className="font-lato">{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button type="submit" className="w-full spooky-glow" disabled={loading}>
                    Bind Your Soul
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;