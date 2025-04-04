
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const nutritionData = [
  { name: 'Protein', value: 85, fullValue: 100, fill: '#9b5ed3' },
  { name: 'Iron', value: 60, fullValue: 100, fill: '#d6738d' },
  { name: 'Calcium', value: 75, fullValue: 100, fill: '#7dd3fc' },
  { name: 'Vitamin D', value: 40, fullValue: 100, fill: '#a67adc' },
  { name: 'Folate', value: 90, fullValue: 100, fill: '#e59aac' }
];

const trimesterData = [
  { name: 'Week 8', weight: 0.5, development: 'Embryo' },
  { name: 'Week 16', weight: 3.5, development: 'Fetus' },
  { name: 'Week 24', weight: 1.3, development: 'Viable' },
  { name: 'Week 32', weight: 3.8, development: 'Developed' },
  { name: 'Week 40', weight: 7.5, development: 'Full Term' }
];

const DataVisualizationSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Track Your Progress</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualize your pregnancy journey and nutritional needs with our interactive tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-center">Daily Nutrient Intake</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={nutritionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Current %" fill="#8884d8" />
                  <Bar dataKey="fullValue" name="Goal" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-center">Pregnancy Trimester Progress</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trimesterData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="weight" name="Baby Weight (lbs)" fill="#d6738d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualizationSection;
