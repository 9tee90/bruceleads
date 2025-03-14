'use client';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'AI Sales Trigger Detection',
    description:
      'Automatically identifies high-intent prospects based on real-time company signals',
    bruce: true,
    apollo: false,
    seamless: false,
    clay: false,
  },
  {
    name: 'Ethical Data Collection',
    description: '100% compliant with platform terms of service, no risk of account bans',
    bruce: true,
    apollo: false,
    seamless: false,
    clay: true,
  },
  {
    name: 'Real-time Growth Monitoring',
    description: 'Instant alerts for funding rounds, hiring sprees, and expansion signals',
    bruce: true,
    apollo: true,
    seamless: false,
    clay: true,
  },
  {
    name: 'AI-Powered Personalization',
    description: 'Context-aware message customization based on prospect data',
    bruce: true,
    apollo: false,
    seamless: false,
    clay: false,
  },
  {
    name: 'Response Rate Optimization',
    description: 'Smart timing and messaging to maximize engagement',
    bruce: true,
    apollo: false,
    seamless: false,
    clay: false,
  },
  {
    name: 'Dedicated Success Team',
    description: 'Expert guidance and strategy optimization',
    bruce: true,
    apollo: false,
    seamless: true,
    clay: false,
  },
  {
    name: 'Time-Saving Automation',
    description: 'Reduces prospecting time by up to 80%',
    bruce: true,
    apollo: true,
    seamless: true,
    clay: true,
  },
];

const ComparisonTable = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const Check = () => (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
    >
      <motion.path
        d="M20 6L9 17L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </motion.svg>
  );

  return (
    <div className="w-full px-4 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="text-center mb-8 sm:mb-16"
      >
        <h2 className="text-4xl sm:text-5xl font-light text-gray-900">Compare Bruce</h2>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          See how Bruce stacks up against other prospecting tools
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="max-w-6xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        {/* Header - Mobile Optimized */}
        <div className="bg-gray-50 p-4 sm:p-6 border-b border-gray-100">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-4">
            <div className="col-span-2">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Features</h3>
            </div>
            <div className="hidden sm:block sm:col-span-1 text-center">
              <div className="text-base sm:text-lg font-bold text-gray-900">Bruce</div>
              <div className="text-xs sm:text-sm text-green-500 mt-1">Recommended</div>
            </div>
            <div className="hidden sm:block sm:col-span-1 text-center">
              <div className="text-base sm:text-lg font-medium text-gray-700">Apollo.io</div>
            </div>
            <div className="hidden sm:block sm:col-span-1 text-center">
              <div className="text-base sm:text-lg font-medium text-gray-700">Seamless.ai</div>
            </div>
            <div className="hidden sm:block sm:col-span-1 text-center">
              <div className="text-base sm:text-lg font-medium text-gray-700">Clay</div>
            </div>
          </div>
        </div>

        {/* Features - Mobile Optimized */}
        <div className="divide-y divide-gray-100">
          {features.map((feature, _index) => (
            <motion.div
              key={feature.name}
              variants={rowVariants}
              className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Mobile View */}
              <div className="sm:hidden">
                <h4 className="font-medium text-gray-900">{feature.name}</h4>
                <p className="text-sm text-gray-500 mt-1 mb-3">{feature.description}</p>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-600 mb-1">Bruce</span>
                    <div className="text-green-500">{feature.bruce && <Check />}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-600 mb-1">Apollo</span>
                    <div className="text-gray-400">{feature.apollo && <Check />}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-600 mb-1">Seamless</span>
                    <div className="text-gray-400">{feature.seamless && <Check />}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-600 mb-1">Clay</span>
                    <div className="text-gray-400">{feature.clay && <Check />}</div>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:grid sm:grid-cols-6 sm:gap-4">
                <div className="col-span-2">
                  <h4 className="font-medium text-gray-900">{feature.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                </div>
                <div className="flex justify-center items-center text-green-500">
                  {feature.bruce && <Check />}
                </div>
                <div className="flex justify-center items-center text-gray-400">
                  {feature.apollo && <Check />}
                </div>
                <div className="flex justify-center items-center text-gray-400">
                  {feature.seamless && <Check />}
                </div>
                <div className="flex justify-center items-center text-gray-400">
                  {feature.clay && <Check />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div variants={rowVariants} className="bg-gray-50 p-4 sm:p-6 text-center">
          <motion.button
            onClick={() => window.open('https://calendly.com/beyondbusinessgroup/30min', '_blank')}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-bold text-base sm:text-lg rounded-full shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: '0 25px 25px -5px rgb(0 0 0 / 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 <strong>Try Bruce Now</strong>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComparisonTable;
