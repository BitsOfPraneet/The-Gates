import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import SpookyLoader from '@/components/SpookyLoader';
import { LogOut, Ghost, Flame, Skull, Save, Edit3 } from 'lucide-react';
import { toast } from 'sonner';
import spookyBg from '@/assets/spooky-bg.jpg';

const GHOST_AVATARS = [
  '👻', '🎃', '💀', '🧛', '🧟', '👹', 
  '👺', '🤡', '👽', '💩', '🤖', '🎭',
  '🔮', '🌙', '⚰️', '🕷️', '🦇', '🕸️'
];

const Profile = () => {
  const { currentUser, userData, logout, updateUserData } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(userData?.profilePicture || '👻');
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    age: '',
    phone: '',
    email: '',
    dateOfBirth: ''
  });

  // Update local state when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        bio: userData.bio || '',
        age: userData.age || '',
        phone: userData.phone || '',
        email: userData.email || '',
        dateOfBirth: userData.dateOfBirth || ''
      });
      setSelectedAvatar(userData.profilePicture || '👻');
    }
  }, [userData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) return;

    // Validation
    if (formData.username.trim().length < 3) {
      toast.error("Your spirit name must be at least 3 characters!");
      return;
    }

    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 150)) {
      toast.error("Please enter a valid age between 1 and 150!");
      return;
    }

    try {
      setIsUpdating(true);
      
      const updatedData = {
        username: formData.username.trim(),
        bio: formData.bio.trim(),
        age: formData.age.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        dateOfBirth: formData.dateOfBirth.trim(),
        profilePicture: selectedAvatar
      };

      await updateUserData(updatedData);
      
      toast.success("Your spirit profile has been updated!", {
        description: "The ancient scrolls now reflect your essence."
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("The dark forces rejected your changes...");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have vanished from the realm...", {
        description: "Your spirit has returned to the void."
      });
    } catch (error) {
      toast.error("The spirits refuse to let you leave...");
    }
  };

  // Format date properly handling Firestore timestamps
  const formatDate = (date: any) => {
    if (!date) return 'Unknown';
    
    // Handle Firestore Timestamp
    if (date.toDate && typeof date.toDate === 'function') {
      return date.toDate().toLocaleDateString();
    }
    
    // Handle regular Date object
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    
    // Handle date string or number
    return new Date(date).toLocaleDateString();
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SpookyLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 relative">
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
      
      {/* Loading Overlay */}
      {isUpdating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <SpookyLoader />
        </div>
      )}
      
      <div className="container mx-auto max-w-2xl relative z-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-creepster text-4xl text-primary mb-2 animate-pulse">
            The Crypt
          </h1>
          <p className="text-muted-foreground font-lato">
            Welcome to your eternal resting place, {userData.username}
          </p>
        </div>

        {/* Profile Card */}
        <Card className="tombstone-shadow spooky-glow red-aura border-border/50 bg-card/95 backdrop-blur-sm mb-6">
          <CardHeader className="text-center relative">
            {/* Flickering Candle */}
            <div className="absolute top-4 right-4">
              <div className="text-spooky-orange animate-pulse">
                <Flame className="w-6 h-6 flicker" />
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-primary/30 p-1 spooky-glow">
                  <Avatar className="w-full h-full">
                    <AvatarFallback className="bg-secondary text-6xl">
                      {selectedAvatar}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button
                  onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 spooky-glow"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>

              {/* Avatar Selector */}
              {showAvatarSelector && (
                <Card className="w-full max-w-md spooky-glow border-primary/30 bg-card/95 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h4 className="font-creepster text-lg mb-3 text-center">Choose Your Spirit</h4>
                    <div className="grid grid-cols-6 gap-2">
                      {GHOST_AVATARS.map((avatar, index) => (
                        <Button
                          key={index}
                          onClick={() => {
                            setSelectedAvatar(avatar);
                            setShowAvatarSelector(false);
                          }}
                          variant={selectedAvatar === avatar ? "default" : "ghost"}
                          className="w-10 h-10 p-0 text-2xl hover:scale-110 transition-transform"
                        >
                          {avatar}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <CardTitle className="font-creepster text-2xl text-primary">
                {userData.username}
              </CardTitle>
              
              <p className="text-muted-foreground font-lato">
                Soul bound since {formatDate(userData.createdAt)}
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Profile Form */}
            <div className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="font-lato text-lg">
                  Spirit Name
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="spooky-glow bg-input/50 font-lato"
                  placeholder="Enter your spirit name..."
                />
              </div>

              {/* Bio Section */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="font-lato text-lg flex items-center gap-2">
                  <Skull className="w-5 h-5" />
                  Your Legend
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="spooky-glow bg-input/50 min-h-[120px] font-lato"
                  placeholder="Tell the world about your dark journey..."
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="font-lato text-lg">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="spooky-glow bg-input/50 font-lato"
                  placeholder="Enter your age..."
                  min="1"
                  max="150"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-lato text-lg">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="spooky-glow bg-input/50 font-lato"
                  placeholder="Enter your phone number..."
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-lato text-lg">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="spooky-glow bg-input/50 font-lato"
                  placeholder="Enter your email..."
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="font-lato text-lg">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="spooky-glow bg-input/50 font-lato"
                />
              </div>

              {/* Update Button */}
              <Button
                onClick={handleUpdateProfile}
                disabled={isUpdating}
                className="w-full spooky-glow mt-6"
                size="lg"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            </div>
            
            {/* User Info */}
            <div className="bg-secondary/30 rounded-lg p-4 space-y-2 border border-border/50">
              <h3 className="font-lato font-semibold text-lg mb-3">Spirit Details</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Soul ID:</span>
                  <span className="font-mono text-xs">{userData.uid.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Realm Status:</span>
                  <span className="text-primary font-semibold">Active Haunt</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Logout Button */}
        <Card className="tombstone-shadow border-destructive/20 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="font-creepster text-xl text-destructive">Vanish from the Realm</h3>
              <p className="text-sm text-muted-foreground font-lato">
                Return your spirit to the void and leave this haunted place
              </p>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="spooky-glow"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Vanish
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;