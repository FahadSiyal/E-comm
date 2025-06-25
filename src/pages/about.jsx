
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingBag,
  Users,
  Globe,
  Award,
  Heart,
  Shield,
  Truck,
  Star,
  CheckCircle,
  Target,
  Lightbulb,
  Handshake,
} from "lucide-react"

const AboutUs = () => {
  const stats = [
    {
      number: "50K+",
      label: "Happy Customers",
      icon: <Users className="w-6 h-6" />,
      id: "1",
    },
    {
      number: "500K+",
      label: "Products Sold",
      icon: <ShoppingBag className="w-6 h-6" />,
      id: "2",
    },
    {
      number: "25+",
      label: "Countries Served",
      icon: <Globe className="w-6 h-6" />,
      id: "3",
    },
    {
      number: "99%",
      label: "Customer Satisfaction",
      icon: <Award className="w-6 h-6" />,
      id: "4",
    },
  ]

  const team = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/men-1.jpg",
      bio: "10+ years in e-commerce, passionate about sustainable retail",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Head of Product",
      image: "/women-1.jpg",
      bio: "Former tech lead at major retailers, loves innovation",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Customer Experience Director",
      image: "/children-sample.jpg",
      bio: "Dedicated to creating exceptional customer journeys",
    },
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Customer First",
      description: "Every decision we make starts with our customers in mind",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Quality Guaranteed",
      description: "We stand behind every product with our quality promise",
    },
    {
      icon: <Truck className="w-8 h-8 text-green-500" />,
      title: "Fast & Reliable",
      description: "Quick shipping and dependable service you can count on",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "Innovation",
      description: "Constantly improving to serve you better",
    },
  ]

  const testimonials = [
    {
      name: "Jessica Williams",
      role: "Verified Customer",
      content: "Amazing quality and service! I've been shopping here for 2 years and never disappointed.",
      rating: 5,
    },
    {
      name: "David Thompson",
      role: "Verified Customer",
      content: "Fast shipping, great prices, and excellent customer support. Highly recommended!",
      rating: 5,
    },
    {
      name: "Maria Garcia",
      role: "Verified Customer",
      content: "The best online shopping experience I've had. Quality products and hassle-free returns.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-black text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">About Our Story</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Redefining Online Shopping</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              We're on a mission to make quality products accessible to everyone, with exceptional service that exceeds
              expectations.
            </p>
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="flex justify-center mb-4 text-red-600">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-red-100 text-red-800">Our Journey</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">From Vision to Reality</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, we started with a simple belief: online shopping should be easy, reliable, and
                enjoyable. What began as a small team with big dreams has grown into a trusted platform serving
                customers worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we're proud to offer thousands of carefully curated products, backed by exceptional customer
                service and a commitment to quality that never wavers.
              </p>
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">Trusted by 50,000+ customers</span>
              </div>
            </div>
            <div className="relative">
              <img
                src="/cloths.jpg"
                alt="Our team working"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Our Mission</div>
                    <div className="text-sm text-gray-600">Excellence in every order</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-800">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Drives Us Forward</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values guide every decision we make and every interaction we have
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-800">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the People Behind the Magic</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to making your shopping experience exceptional
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
            {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-black text-white my-10 max-w-7xl mx-auto rounded-lg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Handshake className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who trust us for their shopping needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Start Shopping
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-800">Customer Love</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

export default AboutUs
