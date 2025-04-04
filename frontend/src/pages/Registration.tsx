
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Registration = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    pregnancyStatus: 'pregnant',
    trimester: '',
    childAge: '',
    dietaryRestrictions: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.email || !formData.password) {
        toast({
          title: "Missing information",
          description: "Please fill out all required fields.",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step === 2) {
      // Validate second step
      if (formData.pregnancyStatus === 'pregnant' && !formData.trimester) {
        toast({
          title: "Missing information",
          description: "Please select your current trimester.",
          variant: "destructive"
        });
        return;
      }
      
      if (formData.pregnancyStatus === 'parent' && !formData.childAge) {
        toast({
          title: "Missing information",
          description: "Please select your child's age.",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form
      toast({
        title: "Account created!",
        description: "Welcome to NurtureMomma. Your personalized dashboard is ready.",
      });
      
      // In a real app, we'd redirect to the dashboard after successful registration
      // history.push('/dashboard');
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleDietaryRestriction = (restriction: string) => {
    if (formData.dietaryRestrictions.includes(restriction)) {
      setFormData({
        ...formData,
        dietaryRestrictions: formData.dietaryRestrictions.filter(r => r !== restriction)
      });
    } else {
      setFormData({
        ...formData,
        dietaryRestrictions: [...formData.dietaryRestrictions, restriction]
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <Card className="border-nurture-100 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
          <CardDescription className="text-center">
            Step {step} of 3 - {step === 1 ? 'Basic Information' : step === 2 ? 'Pregnancy Status' : 'Dietary Preferences'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>I am currently:</Label>
                <RadioGroup 
                  value={formData.pregnancyStatus} 
                  onValueChange={(value) => handleSelectChange('pregnancyStatus', value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pregnant" id="pregnant" />
                    <Label htmlFor="pregnant">Pregnant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="planning" id="planning" />
                    <Label htmlFor="planning">Planning Pregnancy</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parent" id="parent" />
                    <Label htmlFor="parent">Parent of Young Child</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {formData.pregnancyStatus === 'pregnant' && (
                <div className="space-y-3">
                  <Label htmlFor="trimester">Current Trimester</Label>
                  <Select 
                    value={formData.trimester} 
                    onValueChange={(value) => handleSelectChange('trimester', value)}
                  >
                    <SelectTrigger id="trimester">
                      <SelectValue placeholder="Select your trimester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first">First Trimester (1-12 weeks)</SelectItem>
                      <SelectItem value="second">Second Trimester (13-26 weeks)</SelectItem>
                      <SelectItem value="third">Third Trimester (27-40 weeks)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {formData.pregnancyStatus === 'parent' && (
                <div className="space-y-3">
                  <Label htmlFor="childAge">Child's Age</Label>
                  <Select 
                    value={formData.childAge} 
                    onValueChange={(value) => handleSelectChange('childAge', value)}
                  >
                    <SelectTrigger id="childAge">
                      <SelectValue placeholder="Select your child's age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newborn">Newborn (0-3 months)</SelectItem>
                      <SelectItem value="infant">Infant (3-12 months)</SelectItem>
                      <SelectItem value="toddler">Toddler (1-3 years)</SelectItem>
                      <SelectItem value="preschool">Preschool (3-5 years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <Label>Dietary Restrictions (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy', 'Shellfish Allergy', 'Diabetic', 'Low-Sodium'].map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={restriction.toLowerCase().replace(' ', '-')}
                      checked={formData.dietaryRestrictions.includes(restriction)}
                      onChange={() => toggleDietaryRestriction(restriction)}
                      className="h-4 w-4 rounded border-gray-300 text-nurture-600 focus:ring-nurture-500"
                    />
                    <label htmlFor={restriction.toLowerCase().replace(' ', '-')} className="text-sm text-gray-700">{restriction}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handlePreviousStep}>Previous</Button>
          ) : (
            <Link to="/">
              <Button variant="outline">Cancel</Button>
            </Link>
          )}
          
          <Button 
            className="bg-nurture-500 hover:bg-nurture-600" 
            onClick={handleNextStep}
          >
            {step < 3 ? 'Next' : 'Create Account'}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Already have an account? <Link to="/" className="text-nurture-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
