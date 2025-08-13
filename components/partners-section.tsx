import { Card, CardContent } from "@/components/ui/card"

const partners = [
  {
    name: "Ghana Education Service",
    logo: "/placeholder.svg?height=80&width=200",
    description: "Official education ministry partnership",
  },
  {
    name: "UNICEF Ghana",
    logo: "/placeholder.svg?height=80&width=200",
    description: "Child welfare and education support",
  },
  {
    name: "World Vision Ghana",
    logo: "/placeholder.svg?height=80&width=200",
    description: "Community development partnership",
  },
  {
    name: "Access Bank Ghana",
    logo: "/placeholder.svg?height=80&width=200",
    description: "Financial services partner",
  },
  {
    name: "Ghana Health Service",
    logo: "/placeholder.svg?height=80&width=200",
    description: "Health and nutrition support",
  },
  {
    name: "Local Communities",
    logo: "/placeholder.svg?height=80&width=200",
    description: "Grassroots community networks",
  },
]

export function PartnersSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Partners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We work closely with government agencies, international organizations, and local communities to maximize our
            impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-8">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-16 mx-auto mb-4 object-contain"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
