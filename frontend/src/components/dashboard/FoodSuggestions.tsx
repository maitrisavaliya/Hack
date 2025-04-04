
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

interface FoodItem {
  name: string;
  nutrients: string[];
  servingSize: string;
  trimesterSuitability: string[];
  restrictions: string[];
}

interface FoodSuggestionsProps {
  healthData: HealthData;
}

// Database of food items for recommendations
const foodDatabase: FoodItem[] = [
  {
    name: "Spinach",
    nutrients: ["iron", "folate", "vitamin A", "vitamin C"],
    servingSize: "2 cups raw or 1 cup cooked",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: [],
  },
  {
    name: "Salmon",
    nutrients: ["protein", "omega-3 fatty acids", "vitamin D", "vitamin B12"],
    servingSize: "4 oz cooked",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: ["vegetarian", "vegan"],
  },
  {
    name: "Greek Yogurt",
    nutrients: ["protein", "calcium", "probiotics", "vitamin B12"],
    servingSize: "1 cup",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: ["vegan", "dairyFree"],
  },
  {
    name: "Lentils",
    nutrients: ["protein", "iron", "folate", "fiber"],
    servingSize: "1 cup cooked",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: [],
  },
  {
    name: "Sweet Potatoes",
    nutrients: ["vitamin A", "fiber", "potassium", "vitamin C"],
    servingSize: "1 medium",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: [],
  },
  {
    name: "Eggs",
    nutrients: ["protein", "choline", "vitamin D", "omega-3 fatty acids"],
    servingSize: "2 large eggs",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: ["vegan", "vegetarian"],
  },
  {
    name: "Avocados",
    nutrients: ["healthy fats", "folate", "potassium", "fiber"],
    servingSize: "1/2 medium",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: [],
  },
  {
    name: "Broccoli",
    nutrients: ["calcium", "folate", "fiber", "vitamin C"],
    servingSize: "1 cup cooked",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: [],
  },
  {
    name: "Quinoa",
    nutrients: ["protein", "iron", "fiber", "magnesium"],
    servingSize: "1 cup cooked",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: [],
  },
  {
    name: "Berries",
    nutrients: ["vitamin C", "antioxidants", "fiber", "water"],
    servingSize: "1 cup",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: [],
  },
  {
    name: "Lean Beef",
    nutrients: ["protein", "iron", "zinc", "vitamin B12"],
    servingSize: "4 oz cooked",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: ["vegetarian", "vegan"],
  },
  {
    name: "Milk",
    nutrients: ["calcium", "vitamin D", "protein", "iodine"],
    servingSize: "1 cup",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: ["vegan", "dairyFree"],
  },
  {
    name: "Fortified Cereals",
    nutrients: ["iron", "folate", "fiber", "B vitamins"],
    servingSize: "1 serving as per package",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: [],
  },
  {
    name: "Chia Seeds",
    nutrients: ["omega-3 fatty acids", "fiber", "calcium", "protein"],
    servingSize: "2 tablespoons",
    trimesterSuitability: ["first", "second", "third"],
    restrictions: [],
  }
];

export default function FoodSuggestions({ healthData }: FoodSuggestionsProps) {
  const { trimester, dietaryRestrictions = [], foodAllergies = "", ironDeficiency, calciumDeficiency, vitaminDDeficiency, folateDeficiency } = healthData;
  
  // Parse allergies into a list
  const allergiesList = foodAllergies.toLowerCase().split(',').map(a => a.trim());
  
  // Filter foods based on dietary restrictions and allergies
  const filteredFoods = foodDatabase.filter(food => {
    // Filter out foods that don't match the trimester
    if (!food.trimesterSuitability.includes(trimester)) {
      return false;
    }
    
    // Filter out foods that conflict with dietary restrictions
    if (dietaryRestrictions.some(r => food.restrictions.includes(r))) {
      return false;
    }
    
    // Filter out foods that might contain allergens
    if (allergiesList.some(allergy => 
      food.name.toLowerCase().includes(allergy) || 
      food.nutrients.some(n => n.toLowerCase().includes(allergy))
    )) {
      return false;
    }
    
    return true;
  });
  
  // Create categories for food recommendations
  const deficiencyFoods = {
    iron: filteredFoods.filter(food => food.nutrients.includes("iron")),
    calcium: filteredFoods.filter(food => food.nutrients.includes("calcium")),
    vitaminD: filteredFoods.filter(food => food.nutrients.includes("vitamin D")),
    folate: filteredFoods.filter(food => food.nutrients.includes("folate")),
  };
  
  // General important foods for pregnancy
  const generalRecommendations = filteredFoods
    .filter(food => 
      food.nutrients.includes("protein") || 
      food.nutrients.includes("omega-3 fatty acids") ||
      food.nutrients.includes("fiber")
    )
    .slice(0, 3);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-nurture-700">Personalized Food Suggestions</h2>
      
      {/* Deficiency-specific recommendations */}
      {ironDeficiency && deficiencyFoods.iron.length > 0 && (
        <Card className="bg-nurture-50 border-nurture-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-nurture-700">Iron-Rich Foods</CardTitle>
            <CardDescription>
              Based on your iron deficiency, try adding these foods to your diet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {deficiencyFoods.iron.slice(0, 3).map((food, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="bg-nurture-100 text-nurture-600 p-1 rounded-full mr-2 text-xs">✓</span>
                  <div>
                    <p className="font-medium">{food.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {food.servingSize} - contains {food.nutrients.join(', ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {calciumDeficiency && deficiencyFoods.calcium.length > 0 && (
        <Card className="bg-mom-50 border-mom-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-mom-700">Calcium-Rich Foods</CardTitle>
            <CardDescription>
              Based on your calcium deficiency, try adding these foods to your diet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {deficiencyFoods.calcium.slice(0, 3).map((food, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="bg-mom-100 text-mom-600 p-1 rounded-full mr-2 text-xs">✓</span>
                  <div>
                    <p className="font-medium">{food.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {food.servingSize} - contains {food.nutrients.join(', ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {vitaminDDeficiency && deficiencyFoods.vitaminD.length > 0 && (
        <Card className="bg-nurture-50 border-nurture-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-nurture-700">Vitamin D-Rich Foods</CardTitle>
            <CardDescription>
              Based on your vitamin D deficiency, try adding these foods to your diet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {deficiencyFoods.vitaminD.slice(0, 3).map((food, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="bg-nurture-100 text-nurture-600 p-1 rounded-full mr-2 text-xs">✓</span>
                  <div>
                    <p className="font-medium">{food.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {food.servingSize} - contains {food.nutrients.join(', ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {folateDeficiency && deficiencyFoods.folate.length > 0 && (
        <Card className="bg-mom-50 border-mom-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-mom-700">Folate-Rich Foods</CardTitle>
            <CardDescription>
              Based on your folate deficiency, try adding these foods to your diet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {deficiencyFoods.folate.slice(0, 3).map((food, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="bg-mom-100 text-mom-600 p-1 rounded-full mr-2 text-xs">✓</span>
                  <div>
                    <p className="font-medium">{food.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {food.servingSize} - contains {food.nutrients.join(', ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {/* General recommendations for this trimester */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recommended for {trimester === "first" ? "First" : trimester === "second" ? "Second" : "Third"} Trimester</CardTitle>
          <CardDescription>
            Important foods for your current stage of pregnancy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {generalRecommendations.map((food, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="bg-muted p-1 rounded-full mr-2 text-xs">✓</span>
                <div>
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {food.servingSize} - contains {food.nutrients.join(', ')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Weekly meal plan suggestion */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Suggested Meal for Today</CardTitle>
          <CardDescription>
            Based on your nutritional needs for week {healthData.pregnancyWeek}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Breakfast</h4>
              <p className="text-sm text-muted-foreground">
                Greek yogurt with berries and fortified cereal
                {calciumDeficiency && " (good for calcium)"}
                {ironDeficiency && " (good for iron from fortified cereal)"}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Lunch</h4>
              <p className="text-sm text-muted-foreground">
                Quinoa salad with spinach, avocado, and {dietaryRestrictions.includes("vegetarian") ? "chickpeas" : "grilled chicken"}
                {ironDeficiency && " (good for iron)"}
                {folateDeficiency && " (good for folate)"}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Dinner</h4>
              <p className="text-sm text-muted-foreground">
                {dietaryRestrictions.includes("vegetarian") ? "Lentil soup" : "Salmon"} with sweet potatoes and broccoli
                {vitaminDDeficiency && !dietaryRestrictions.includes("vegetarian") && " (good for vitamin D)"}
                {ironDeficiency && dietaryRestrictions.includes("vegetarian") && " (good for iron)"}
                {calciumDeficiency && " (broccoli provides calcium)"}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Snacks</h4>
              <p className="text-sm text-muted-foreground">
                Sliced apple with nut butter, hummus with vegetables, or a small handful of nuts and seeds
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
