import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Bruce has completely transformed how we identify and engage with prospects. The AI-driven insights are incredibly accurate.",
    author: "Sarah Chen",
    title: "VP of Sales",
    company: "TechCorp Solutions",
    rating: 5
  },
  {
    quote: "The ROI we've seen with Bruce is phenomenal. Our response rates have more than tripled since implementing the platform.",
    author: "Michael Rodriguez",
    title: "Sales Director",
    company: "GrowthForce Inc",
    rating: 5
  },
  {
    quote: "Finally, a sales intelligence tool that actually delivers on its promises. The adaptive AI is a game-changer for our team.",
    author: "Emily Thompson",
    title: "Head of Revenue",
    company: "ScaleUp Dynamics",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Loved by Sales Teams Everywhere
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
          >
            See why leading sales teams trust Bruce to drive their revenue growth
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-300 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-sm text-gray-400">{testimonial.title}</div>
                <div className="text-sm text-gray-400">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 