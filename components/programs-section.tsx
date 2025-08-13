import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Laptop, Utensils, Shirt, Home } from "lucide-react"

const programs = [
  {
    icon: BookOpen,
    title: "Educational Materials",
    description: "Providing textbooks, notebooks, and learning supplies to children who cannot afford them.",
    image: "/images/children-window-care.jpg",
  },
  {
    icon: Users,
    title: "Mentorship Program",
    description: "Connecting vulnerable children with caring mentors for guidance and emotional support.",
    image: "/images/children-group-happy.jpg",
  },
  {
    icon: Laptop,
    title: "Digital Literacy",
    description: "Teaching computer skills and providing access to technology for modern education.",
    image: "/images/girl-heart-hands.jpg",
  },
  {
    icon: Utensils,
    title: "Nutrition Support",
    description: "Ensuring children have proper nutrition to support their learning and development.",
    image: "/images/mother-child-vulnerable.jpg",
  },
  {
    icon: Shirt,
    title: "School Uniforms",
    description: "Providing school uniforms so children can attend classes with dignity and confidence.",
    image: "/images/child-alone-nature.jpg",
  },
  {
    icon: Home,
    title: "Safe Learning Spaces",
    description: "Creating secure environments where children can study and learn without fear.",
    image: "/images/children-window-happy.jpg",
  },
]

export function ProgramsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive support through various programs designed to address the diverse needs of vulnerable
            children in Ghana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <program.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm lg:text-base">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
