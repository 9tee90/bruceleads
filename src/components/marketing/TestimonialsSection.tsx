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
    <div className="relative">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Loved by Sales Teams Everywhere
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
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
            className="relative rounded-2xl border border-white/10 bg-[#0B1120]/40 p-8"
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
              <div className="text-gray-400">{testimonial.title}</div>
              <div className="text-gray-500">{testimonial.company}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 