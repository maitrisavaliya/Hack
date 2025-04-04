import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Calendar, Eye, Heart, MessageCircle } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Essential Nutrients for Each Trimester of Pregnancy',
    excerpt: 'Learn about the key nutrients you need during each stage of pregnancy and why they\'re important for your baby\'s development.',
    date: 'June 15, 2023',
    author: 'Dr. Sarah Johnson',
    authorRole: 'OB-GYN & Nutrition Specialist',
    image: 'https://images.unsplash.com/photo-1581954564002-c4e2672a8cf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Pregnancy',
    views: 1245,
    likes: 86,
    comments: 24,
  },
  {
    id: 2,
    title: 'The Postpartum Diet: Nourishing Your Body After Birth',
    excerpt: 'Your body needs special care after giving birth. Discover the foods that will help you recover faster and support breastfeeding.',
    date: 'June 8, 2023',
    author: 'Emma Wilson',
    authorRole: 'Registered Dietitian',
    image: 'https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Postpartum',
    views: 987,
    likes: 72,
    comments: 18,
  },
  {
    id: 3,
    title: 'Introducing Solid Foods to Your Baby: A Complete Guide',
    excerpt: 'When and how to start giving your baby solid foods, with age-appropriate recommendations and warning signs to watch for.',
    date: 'May 27, 2023',
    author: 'Dr. Michael Chen',
    authorRole: 'Pediatric Nutritionist',
    image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Baby',
    views: 1567,
    likes: 103,
    comments: 35,
  },
  {
    id: 4,
    title: 'Safe Exercise During Pregnancy: Trimester by Trimester',
    excerpt: 'How to stay active safely during each stage of pregnancy, with specific workouts and modifications for your changing body.',
    date: 'May 20, 2023',
    author: 'Jessica Martinez',
    authorRole: 'Prenatal Fitness Specialist',
    image: 'https://images.unsplash.com/photo-1562088287-bde35a1ea917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Pregnancy',
    views: 876,
    likes: 64,
    comments: 12,
  },
  {
    id: 5,
    title: 'Common Nutrient Deficiencies in Pregnancy and How to Prevent Them',
    excerpt: 'Iron, folate, calcium, and more - learn about the most common nutrient deficiencies during pregnancy and how to ensure you\'re getting enough.',
    date: 'May 12, 2023',
    author: 'Dr. Rebecca Torres',
    authorRole: 'Maternal Health Specialist',
    image: 'https://images.unsplash.com/photo-1576400883215-7083980b6193?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Pregnancy',
    views: 1342,
    likes: 91,
    comments: 28,
  },
  {
    id: 6,
    title: 'Breastfeeding Diet: What to Eat & What to Avoid',
    excerpt: 'Optimize your nutrition while breastfeeding with this comprehensive guide to foods that benefit both you and your baby.',
    date: 'May 5, 2023',
    author: 'Lisa Johnson',
    authorRole: 'Lactation Consultant',
    image: 'https://images.unsplash.com/photo-1590228947498-5ef5a6add59e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Breastfeeding',
    views: 1689,
    likes: 118,
    comments: 42,
  },
];

const featuredPost = blogPosts[0];
const recentPosts = blogPosts.slice(1, 4);

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nutrition & Health Blog</h1>
          <p className="text-muted-foreground">Expert articles on pregnancy, postpartum, and early childhood nutrition.</p>
        </div>
        
        <div className="mt-4 md:mt-0 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-2 border rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-nurture-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Featured Article */}
      <div className="mb-12">
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img 
                src={featuredPost.image}
                alt={featuredPost.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="mb-2">
                <span className="text-xs font-semibold px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">
                  {featuredPost.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-nurture-100 flex items-center justify-center">
                    <span className="text-nurture-600 font-semibold">{featuredPost.author.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium">{featuredPost.author}</p>
                  <p className="text-sm text-muted-foreground">{featuredPost.authorRole}</p>
                </div>
              </div>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{featuredPost.views} views</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{featuredPost.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-10">
        <TabsList>
          <TabsTrigger value="all">All Articles</TabsTrigger>
          <TabsTrigger value="pregnancy">Pregnancy</TabsTrigger>
          <TabsTrigger value="postpartum">Postpartum</TabsTrigger>
          <TabsTrigger value="baby">Baby & Toddler</TabsTrigger>
          <TabsTrigger value="breastfeeding">Breastfeeding</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-nurture-100 flex items-center justify-center">
                        <span className="text-nurture-600 font-semibold">{post.author.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pregnancy" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(post => post.category === 'Pregnancy').map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {/* Same card structure as above */}
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-nurture-100 flex items-center justify-center">
                        <span className="text-nurture-600 font-semibold">{post.author.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Other category tabs with similar structure */}
        <TabsContent value="postpartum" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(post => post.category === 'Postpartum').map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {/* Same card structure */}
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-nurture-100 flex items-center justify-center">
                        <span className="text-nurture-600 font-semibold">{post.author.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="baby" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(post => post.category === 'Baby').map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {/* Same card structure */}
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-nurture-100 flex items-center justify-center">
                        <span className="text-nurture-600 font-semibold">{post.author.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="breastfeeding" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(post => post.category === 'Breastfeeding').map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {/* Same card structure */}
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-nurture-100 flex items-center justify-center">
                        <span className="text-nurture-600 font-semibold">{post.author.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-nurture-100 to-mom-100 rounded-xl p-8 mb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-muted-foreground mb-6">
            Get the latest articles, recipes, and nutrition advice for pregnancy and early childhood delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow rounded-md px-4 py-2 border-nurture-200 focus:border-nurture-300 focus:ring focus:ring-nurture-200 focus:ring-opacity-50"
            />
            <button className="bg-nurture-500 hover:bg-nurture-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
