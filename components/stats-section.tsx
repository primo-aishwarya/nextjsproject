import { Users, BookOpen, Heart, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "2,500+",
    label: "Children Supported",
    description: "Vulnerable children receiving educational assistance",
  },
  {
    icon: BookOpen,
    number: "15,000+",
    label: "Books Distributed",
    description: "Educational materials provided to students",
  },
  {
    icon: Heart,
    number: "50+",
    label: "Communities Reached",
    description: "Local communities across Ghana",
  },
  {
    icon: Award,
    number: "8",
    label: "Years of Service",
    description: "Dedicated to improving children's lives",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-emerald-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Our Impact in Numbers</h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Through discrete support and community partnerships, we've made a significant difference in the lives of
            Ghana's most vulnerable children.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <div className="text-2xl lg:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg lg:text-xl font-semibold mb-2">{stat.label}</div>
              <p className="text-emerald-100 text-xs lg:text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
