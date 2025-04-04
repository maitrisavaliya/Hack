
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Flag, Search, Users, ThumbsUp, ThumbsDown } from 'lucide-react';

// Sample discussion data
const discussions = [
  {
    id: 1,
    author: 'Emily R.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    title: 'Morning sickness remedies that actually work?',
    content: "I'm 10 weeks pregnant and struggling with severe morning sickness. I've tried ginger tea and crackers but nothing seems to help. Any advice from moms who've been through this?",
    date: '2 hours ago',
    likes: 24,
    comments: 15,
    tags: ['First Trimester', 'Morning Sickness'],
  },
  {
    id: 2,
    author: 'Sarah T.',
    avatar: 'https://i.pravatar.cc/150?img=2',
    title: 'Best iron-rich foods for pregnancy?',
    content: "My doctor told me I need to increase my iron intake. I don't want to just rely on supplements. What are some tasty, iron-rich foods that worked for you during pregnancy?",
    date: '1 day ago',
    likes: 32,
    comments: 28,
    tags: ['Nutrition', 'Iron Deficiency'],
  },
  {
    id: 3,
    author: 'Dr. Lisa Wong',
    avatar: 'https://i.pravatar.cc/150?img=3',
    title: 'Answering your questions about calcium in pregnancy',
    content: "Hello moms! I'm a prenatal nutritionist and wanted to start a thread about calcium needs during pregnancy. Did you know you need about 1,000mg daily? Ask me anything about calcium sources or supplements.",
    date: '3 days ago',
    likes: 67,
    comments: 42,
    tags: ['Expert Advice', 'Calcium', 'Nutrition'],
    isExpert: true,
  },
  {
    id: 4,
    author: 'Jessica M.',
    avatar: 'https://i.pravatar.cc/150?img=4',
    title: 'Baby not taking to solid foods. Help!',
    content: "My 8-month-old refuses all solids. I've tried purees, baby-led weaning, and everything in between. She just turns her head and cries. Anyone dealt with this before?",
    date: '5 days ago',
    likes: 18,
    comments: 35,
    tags: ['Baby', 'Feeding', 'Solid Foods'],
  },
];

// Sample expert answers
const expertAnswers = [
  {
    id: 1,
    questionId: 1,
    author: 'Dr. Rebecca Chen',
    avatar: 'https://i.pravatar.cc/150?img=5',
    content: "Morning sickness can be really challenging. Try eating small, frequent meals and keeping crackers by your bed to eat before getting up. Some women find relief with vitamin B6 supplements or acupressure wristbands. If you're unable to keep fluids down or are losing weight, please see your doctor as you might have hyperemesis gravidarum, which requires medical treatment.",
    date: '1 hour ago',
    likes: 15,
    isExpert: true,
  },
  {
    id: 2,
    questionId: 2,
    author: 'Nutritionist Maria Garcia',
    avatar: 'https://i.pravatar.cc/150?img=6',
    content: "Great sources of iron include lean red meat, beans, lentils, spinach, and fortified cereals. To maximize absorption, pair them with vitamin C-rich foods like citrus fruits or bell peppers. Cooking in cast iron pans can also add iron to your food. Avoid having tea or coffee with meals as they can inhibit iron absorption.",
    date: '12 hours ago',
    likes: 28,
    isExpert: true,
  },
];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  
  // Find the selected post and its expert answers
  const post = discussions.find(d => d.id === selectedPost);
  const answers = selectedPost ? expertAnswers.filter(a => a.questionId === selectedPost) : [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mom's Community</h1>
          <p className="text-muted-foreground">Connect, share experiences, and get advice from other mothers and experts.</p>
        </div>
        
        <div className="mt-4 md:mt-0 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="pl-10 pr-4 py-2 border rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-nurture-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {!selectedPost ? (
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Discussions</TabsTrigger>
            <TabsTrigger value="expert">Expert Advice</TabsTrigger>
            <TabsTrigger value="pregnancy">Pregnancy</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="babies">Babies & Toddlers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:border-nurture-200 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={discussion.avatar} alt={discussion.author} />
                          <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{discussion.author}</p>
                            {discussion.isExpert && (
                              <span className="ml-2 text-xs px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">Expert</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{discussion.date}</p>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="mt-3 text-xl">{discussion.title}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {discussion.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">{discussion.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-mom-500" />
                        <span className="text-sm">{discussion.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{discussion.comments}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-nurture-600 border-nurture-200"
                      onClick={() => setSelectedPost(discussion.id)}
                    >
                      View Discussion
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="expert">
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Expert Advice Section</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Get answers from certified nutritionists, doctors, and childcare professionals.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="pregnancy">
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Pregnancy Discussions</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Share your pregnancy journey and get support from other expecting mothers.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition">
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Nutrition Discussions</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Talk about prenatal nutrition, meal planning, and healthy eating for you and your baby.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="babies">
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Babies & Toddlers</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Discuss feeding, development, and care for babies and toddlers.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="mr-2"
              onClick={() => setSelectedPost(null)}
            >
              ← Back to Discussions
            </Button>
          </div>
          
          {post && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.avatar} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{post.author}</p>
                        {post.isExpert && (
                          <span className="ml-2 text-xs px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">Expert</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </div>
                <CardTitle className="mt-3 text-xl">{post.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-1">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.content}</p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({post.likes})
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Not Helpful
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Expert Answers</h3>
            {answers.length > 0 ? (
              <div className="space-y-4">
                {answers.map((answer) => (
                  <Card key={answer.id} className="border-nurture-200">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={answer.avatar} alt={answer.author} />
                          <AvatarFallback>{answer.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{answer.author}</p>
                            <span className="ml-2 text-xs px-2 py-1 bg-nurture-100 text-nurture-600 rounded-full">Expert</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{answer.date}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{answer.content}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({answer.likes})
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No expert answers yet. Check back later.</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Add Your Comment</h3>
            <Card>
              <CardContent className="pt-6">
                <Textarea placeholder="Share your experience or advice..." className="min-h-[100px]" />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-nurture-500 hover:bg-nurture-600">Post Comment</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
