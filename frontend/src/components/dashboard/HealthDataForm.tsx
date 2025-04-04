
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

// Define the form schema
const healthDataSchema = z.object({
  age: z.string().min(1, { message: "Age is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  height: z.string().min(1, { message: "Height is required" }),
  pregnancyWeek: z.string().min(1, { message: "Pregnancy week is required" }),
  trimester: z.string().min(1, { message: "Trimester is required" }),
  dietaryRestrictions: z.array(z.string()).optional(),
  foodAllergies: z.string().optional(),
  ironDeficiency: z.boolean().default(false),
  calciumDeficiency: z.boolean().default(false),
  vitaminDDeficiency: z.boolean().default(false),
  folateDeficiency: z.boolean().default(false)
});

type HealthDataValues = z.infer<typeof healthDataSchema>;

interface HealthDataFormProps {
  onSubmit: (data: HealthDataValues) => void;
  initialData?: Partial<HealthDataValues>;
}

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "glutenFree", label: "Gluten-Free" },
  { id: "dairyFree", label: "Dairy-Free" },
  { id: "lowCarb", label: "Low Carb" },
];

export default function HealthDataForm({ onSubmit, initialData }: HealthDataFormProps) {
  const form = useForm<HealthDataValues>({
    resolver: zodResolver(healthDataSchema),
    defaultValues: {
      age: initialData?.age || "",
      weight: initialData?.weight || "",
      height: initialData?.height || "",
      pregnancyWeek: initialData?.pregnancyWeek || "24",
      trimester: initialData?.trimester || "second",
      dietaryRestrictions: initialData?.dietaryRestrictions || [],
      foodAllergies: initialData?.foodAllergies || "",
      ironDeficiency: initialData?.ironDeficiency || false,
      calciumDeficiency: initialData?.calciumDeficiency || false,
      vitaminDDeficiency: initialData?.vitaminDDeficiency || false,
      folateDeficiency: initialData?.folateDeficiency || false
    },
  });

  const handleSubmit = (values: HealthDataValues) => {
    onSubmit(values);
    toast.success("Health data updated successfully!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age (years)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (lbs)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="150" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (inches)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="65" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pregnancyWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pregnancy Week</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="42" placeholder="24" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trimester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trimester</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trimester" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="first">First Trimester (Weeks 1-12)</SelectItem>
                    <SelectItem value="second">Second Trimester (Weeks 13-26)</SelectItem>
                    <SelectItem value="third">Third Trimester (Weeks 27-40+)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dietaryRestrictions"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Dietary Restrictions</FormLabel>
                <FormDescription>
                  Select any dietary restrictions that apply to you.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {dietaryOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="dietaryRestrictions"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.id}
                          className="flex flex-row items-start space-x-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value || [], option.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== option.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foodAllergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Allergies</FormLabel>
              <FormControl>
                <Input placeholder="e.g., nuts, shellfish, eggs" {...field} />
              </FormControl>
              <FormDescription>
                List any food allergies separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-nurture-50 p-4 rounded-lg">
          <h3 className="font-medium text-nurture-700 mb-2">Deficiencies</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check any nutrients you might be deficient in based on previous tests
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="ironDeficiency"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Iron Deficiency
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="calciumDeficiency"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Calcium Deficiency
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="vitaminDDeficiency"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Vitamin D Deficiency
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="folateDeficiency"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Folate Deficiency
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="bg-nurture-500 hover:bg-nurture-600">
          Update Health Data
        </Button>
      </form>
    </Form>
  );
}
