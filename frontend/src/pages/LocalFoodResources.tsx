
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Phone, Clock, Star, ExternalLink } from 'lucide-react';

const resources = [
  {
    id: 1,
    name: "Sunshine Farmers Market",
    category: "Farmers Market",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Fresh, organic produce directly from local farmers. Great source of seasonal fruits and vegetables for pregnant women.",
    address: "123 Market Street, Pleasantville, CA",
    phone: "(555) 123-4567",
    hours: "Saturdays 8AM-1PM, Wednesdays 3PM-7PM",
    website: "www.sunshinefarmersmarket.com",
    rating: 4.8,
    pregnancySafe: true,
    featured: true,
  },
  {
    id: 2,
    name: "Maternal Nutrition Center",
    category: "Specialty Store",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Specialized store offering prenatal vitamins, supplements, and nutritional products for expectant mothers and infants.",
    address: "456 Health Avenue, Pleasantville, CA",
    phone: "(555) 234-5678",
    hours: "Mon-Fri 9AM-6PM, Sat 10AM-4PM",
    website: "www.maternalnutrition.com",
    rating: 4.6,
    pregnancySafe: true,
    featured: true,
  },
  {
    id: 3,
    name: "Green Earth Grocery",
    category: "Grocery Store",
    image: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Organic and natural grocery store with a wide selection of pregnancy-safe foods and baby products.",
    address: "789 Organic Lane, Pleasantville, CA",
    phone: "(555) 345-6789",
    hours: "Daily 8AM-9PM",
    website: "www.greenearthgrocery.com",
    rating: 4.5,
    pregnancySafe: true,
    featured: false,
  },
  {
    id: 4,
    name: "Mother & Child Cafe",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Family-friendly cafe with a menu designed for pregnant women and children. All dishes avoid unsafe ingredients for pregnancy.",
    address: "101 Family Court, Pleasantville, CA",
    phone: "(555) 456-7890",
    hours: "Tue-Sun 7AM-3PM, Closed Mondays",
    website: "www.motherchildcafe.com",
    rating: 4.7,
    pregnancySafe: true,
    featured: true,
  },
  {
    id: 5,
    name: "Community Food Bank",
    category: "Food Assistance",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Provides free food assistance to pregnant women and families with young children. Includes fresh produce and nutritious staples.",
    address: "202 Community Drive, Pleasantville, CA",
    phone: "(555) 567-8901",
    hours: "Mon-Fri 10AM-4PM",
    website: "www.communityfoodbank.org",
    rating: 4.9,
    pregnancySafe: true,
    featured: false,
  },
  {
    id: 6,
    name: "Fresh Start Meal Delivery",
    category: "Meal Service",
    image: "https://images.unsplash.com/photo-1530554764233-e79e16c91d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Prepared meal delivery service with special pregnancy and postpartum meal plans designed by nutritionists.",
    address: "303 Delivery Road, Pleasantville, CA",
    phone: "(555) 678-9012",
    hours: "Delivery available 7 days a week",
    website: "www.freshstartmeals.com",
    rating: 4.4,
    pregnancySafe: true,
    featured: false,
  },
];

const LocalFoodResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  
  const featuredResources = resources.filter(resource => resource.featured);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Local Food Resources</h1>
        <p className="text-muted-foreground">
          Find pregnancy-safe food options and nutrition resources in your area.
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-nurture-50 to-mom-50 rounded-xl p-6 mb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Find Resources Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="What are you looking for?"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Your location (city, ZIP)"
                className="pl-10"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            
            <Button className="bg-nurture-500 hover:bg-nurture-600">
              Search Resources
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-10">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="farmers">Farmers Markets</TabsTrigger>
          <TabsTrigger value="stores">Specialty Stores</TabsTrigger>
          <TabsTrigger value="restaurants">Pregnancy-Safe Restaurants</TabsTrigger>
          <TabsTrigger value="assistance">Food Assistance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="farmers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.category === "Farmers Market").map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stores" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.category === "Specialty Store" || r.category === "Grocery Store").map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="restaurants" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.category === "Restaurant").map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="assistance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.category === "Food Assistance" || r.category === "Meal Service").map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ResourceCardProps {
  resource: typeof resources[0];
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img 
          src={resource.image} 
          alt={resource.name}
          className="absolute h-full w-full object-cover"
        />
        {resource.pregnancySafe && (
          <div className="absolute top-3 right-3 bg-nurture-500 text-white text-xs px-2 py-1 rounded-full">
            Pregnancy Safe
          </div>
        )}
      </div>
      
      <CardHeader>
        <div className="mb-1">
          <span className="text-xs font-semibold px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">
            {resource.category}
          </span>
        </div>
        <CardTitle>{resource.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(resource.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-1 text-sm">{resource.rating}</span>
          </div>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{resource.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-nurture-500" />
            <span>{resource.address}</span>
          </div>
          
          <div className="flex items-start">
            <Phone className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-nurture-500" />
            <span>{resource.phone}</span>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-nurture-500" />
            <span>{resource.hours}</span>
          </div>
          
          <div className="flex items-center">
            <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0 text-nurture-500" />
            <a 
              href={`https://${resource.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-nurture-600 hover:underline"
            >
              {resource.website}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalFoodResources;
