import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Baby, Calendar, AppleIcon, Heart, BookOpen } from 'lucide-react';
import HealthDataForm from '@/components/dashboard/HealthDataForm';
import FoodSuggestions from '@/components/dashboard/FoodSuggestions';

const progressData = [
  { name: 'Week 1-4', value: 100 },
  { name: 'Week 5-8', value: 100 },
  { name: 'Week 9-12', value: 100 },
  { name: 'Week 13-16', value: 100 },
  { name: 'Week 17-20', value: 100 },
  { name: 'Week 21-24', value: 75 },
  { name: 'Week 25-28', value: 0 },
  { name: 'Week 29-32', value: 0 },
  { name: 'Week 33-36', value: 0 },
  { name: 'Week 37-40', value: 0 },
];

const nutritionData = [
  { name: 'Protein', actual: 85, goal: 100 },
  { name: 'Iron', actual: 65, goal: 100 },
  { name: 'Calcium', actual: 75, goal: 100 },
  { name: 'Vitamin D', actual: 40, goal: 100 },
  { name: 'Folate', actual: 90, goal: 100 },
];

const weightData = [
  { week: 4, weight: 124 },
  { week: 8, weight: 126 },
  { week: 12, weight: 129 },
  { week: 16, weight: 133 },
  { week: 20, weight: 138 },
  { week: 24, weight: 143 },
];

const COLORS = ['#9b5ed3', '#d6738d', '#7dd3fc', '#efc0cb', '#bfa1e7'];

type HealthData = {
  age: string;
  weight: string;
  height: string;
  pregnancyWeek: string;
  trimester: string;
  dietaryRestrictions?: string[];
  foodAllergies?: string;
  ironDeficiency: boolean;
  calciumDeficiency: boolean;
  vitaminDDeficiency: boolean;
  folateDeficiency: boolean;
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('progress');
  const [healthData, setHealthData] = useState<HealthData>({
    age: "30",
    weight: "143",
    height: "65",
    pregnancyWeek: "24",
    trimester: "second",
    dietaryRestrictions: [],
    foodAllergies: "",
    ironDeficiency: true,
    calciumDeficiency: false,
    vitaminDDeficiency: true,
    folateDeficiency: false
  });
  
  const handleHealthDataSubmit = (data: HealthData) => {
    setHealthData(data);
    setActiveTab('nutrition');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Welcome Back, Emma!</h1>
      <p className="text-muted-foreground mb-8">You're in week {healthData.pregnancyWeek} of your pregnancy journey.</p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="progress" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Progress</span>
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex items-center space-x-2">
            <AppleIcon className="h-4 w-4" />
            <span>Nutrition</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>Health Data</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Resources</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <Baby className="h-4 w-4" />
            <span>My Profile</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Pregnancy Timeline</CardTitle>
                <CardDescription>Current week: 24 (Second Trimester)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.map((period, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{period.name}</span>
                        <span>{period.value}%</span>
                      </div>
                      <Progress value={period.value} className="h-2 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Baby Development</CardTitle>
                <CardDescription>Week 24 Milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <Baby className="h-20 w-20 text-nurture-500" />
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-nurture-100 text-nurture-600 p-1 rounded-full mr-2 text-xs">✓</span>
                    <span>Baby is about the size of a corn on the cob (30cm)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-nurture-100 text-nurture-600 p-1 rounded-full mr-2 text-xs">✓</span>
                    <span>Developing taste buds and can taste what you eat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-nurture-100 text-nurture-600 p-1 rounded-full mr-2 text-xs">✓</span>
                    <span>Lungs are developing rapidly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-nurture-100 text-nurture-600 p-1 rounded-full mr-2 text-xs">✓</span>
                    <span>Can now hear your voice and other sounds</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="nutrition">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FoodSuggestions healthData={healthData} />
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Today's Nutrient Intake</CardTitle>
                  <CardDescription>Your nutrition balance for June 15, 2023</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={nutritionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="actual"
                        nameKey="name"
                      >
                        {nutritionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="health">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weight Tracking</CardTitle>
                <CardDescription>Your pregnancy weight journey</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weightData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#d6738d" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Symptoms Tracker</CardTitle>
                <CardDescription>Log how you're feeling each day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Morning Sickness</p>
                      <div className="flex justify-center">
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-200">●</span>
                        <span className="text-nurture-200">●</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Fatigue</p>
                      <div className="flex justify-center">
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-200">●</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Back Pain</p>
                      <div className="flex justify-center">
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-200">●</span>
                        <span className="text-nurture-200">●</span>
                        <span className="text-nurture-200">●</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Mood Swings</p>
                      <div className="flex justify-center">
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-500">●</span>
                        <span className="text-nurture-200">●</span>
                        <span className="text-nurture-200">●</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-mom-50 rounded-lg">
                    <h4 className="font-medium text-mom-700 mb-2">Today's Notes</h4>
                    <p className="text-sm text-muted-foreground">Felt baby kick more frequently after lunch. Slight back pain in the evening. Need to remember to drink more water.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Reading</CardTitle>
                <CardDescription>Articles for Week 24</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <h4 className="font-medium">Managing Back Pain in the Second Trimester</h4>
                      <p className="text-sm text-muted-foreground mt-1">5 exercises to relieve pregnancy back pain safely.</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <h4 className="font-medium">Preparing for Glucose Test</h4>
                      <p className="text-sm text-muted-foreground mt-1">What to expect at your upcoming glucose test.</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <h4 className="font-medium">Iron-Rich Recipes for Pregnancy</h4>
                      <p className="text-sm text-muted-foreground mt-1">10 delicious meals to boost your iron intake.</p>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your prenatal care schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="p-3 bg-nurture-50 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">Glucose Screening Test</h4>
                      <span className="text-sm text-nurture-600">Week 25</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Dr. Sarah Johnson - June 22, 2023 at 10:00 AM</p>
                  </li>
                  <li className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">Regular Prenatal Checkup</h4>
                      <span className="text-sm text-nurture-600">Week 28</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Dr. Sarah Johnson - July 13, 2023 at 2:30 PM</p>
                  </li>
                  <li className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">Growth Ultrasound</h4>
                      <span className="text-sm text-nurture-600">Week 32</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Imaging Center - August 10, 2023 at 11:15 AM</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Shopping List</CardTitle>
                <CardDescription>Recommended items for Week 24</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" id="item1" className="h-4 w-4 rounded border-gray-300 text-nurture-600 focus:ring-nurture-500" />
                    <label htmlFor="item1" className="text-sm">Pregnancy support pillow</label>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" id="item2" className="h-4 w-4 rounded border-gray-300 text-nurture-600 focus:ring-nurture-500" />
                    <label htmlFor="item2" className="text-sm">Prenatal vitamins refill</label>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" id="item3" className="h-4 w-4 rounded border-gray-300 text-nurture-600 focus:ring-nurture-500" />
                    <label htmlFor="item3" className="text-sm">Calcium supplements</label>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" id="item4" className="h-4 w-4 rounded border-gray-300 text-nurture-600 focus:ring-nurture-500" />
                    <label htmlFor="item4" className="text-sm">Compression socks</label>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" id="item5" className="h-4 w-4 rounded border-gray-300 text-nurture-600 focus:ring-nurture-500" />
                    <label htmlFor="item5" className="text-sm">Stretch mark cream</label>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" id="item6" className="h-4 w-4 rounded border-gray-300 text-nurture-600 focus:ring-nurture-500" />
                    <label htmlFor="item6" className="text-sm">Maternity clothes (larger sizes)</label>
                  </li>
                  <li className="flex items-center space-x-2">
                    <input type="checkbox" id="item7" className="h-4 w-4 rounded border-gray-300 text-nurture-600 focus:ring-nurture-500" />
                    <label htmlFor="item7" className="text-sm">Pregnancy journal</label>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>My Health Profile</CardTitle>
                <CardDescription>
                  Update your health information to get personalized nutrition recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HealthDataForm onSubmit={handleHealthDataSubmit} initialData={healthData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
