'use client'
import React from "react";
import { motion } from "framer-motion";
const FeaturesCard = () => {
    return(
<section className="pt-10 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]">
   <div className="container">
        <motion.p 
        initial={{y:200}}
        whileInView={{y: [0, 50, 0], transition: {duration: 1.5, ease: 'easeInOut'}}}
        className="text-3xl mb-10 text-center font-extrabold">Features</motion.p>
        <motion.div
          initial={{ y: 200 }} // Initial animation state (opacity: 0 for fade-in effect, y: 200 for lifting from bottom)
          whileInView={{y: 0 }}   // Animation state to transition to (opacity: 1 for full visibility, y: 0 for lifting to original position)
          transition={{ duration: 0.8 }}   // Transition duration
          className="flex flex-wrap ml-10 mt-20"
        >
         <motion.div 
         initial={{ y: 200 }} // Initial animation state (opacity: 0 for fade-in effect, y: 200 for lifting from bottom)
         whileInView={{y: 0 }}   // Animation state to transition to (opacity: 1 for full visibility, y: 0 for lifting to original position)
         transition={{ duration: 0.8 }}
         className="w-full md:w-1/2 xl:w-1/3 px-4 transform hover:transition-opacity hover:opacity-75">
                        <motion.div 
            // initial={{x:200}}
            // whileInView={{x:0, transition: {duration: 1, ease: 'easeInOut'}}}
            className="bg-white rounded-lg overflow-hidden mb-10">
               <img
                  src="/homefortune.png"
                  alt="image"
                  className="w-full"
                  />
               <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <motion.h3
                  initial={{x: 200}}
               whileInView={{x: 0, transition: {duration: 0.8, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}>
                     <a
                        href="javascript:void(0)"
                        className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     Home Fortune
                     </a>
                  </motion.h3>
                  <motion.p 
                  initial={{y: 200}}
               whileInView={{y: 0, transition: {duration: 1, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}
                  className="text-base text-body-color leading-relaxed mb-7">
                  Explore the power of AI with Home Fortune! Predicting future property prices has never been this easy. Experience how AI algorithms analyze historical data to provide insightful price estimates, demonstrating the potential of AI in decision-making
                  </motion.p>
                  <motion.a
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1, transition: {duration: 2}}}
                     href="javascript:void(0)"
                     className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black hover:font-semibold
                     "
                     >
                  Explore more
                  </motion.a>
               </div>
            </motion.div>
         </motion.div>
         <motion.div 
         initial={{ y: 200 }} // Initial animation state (opacity: 0 for fade-in effect, y: 200 for lifting from bottom)
         whileInView={{ y: 0 }}   // Animation state to transition to (opacity: 1 for full visibility, y: 0 for lifting to original position)
         transition={{ duration: 0.8 }}
         className="w-full md:w-1/2 xl:w-1/3 px-4 transform hover:transition-opacity hover:opacity-75">
            <motion.div 
            initial={{x:200}}
            whileInView={{x:0, transition: {duration: 1, ease: 'easeInOut'}}}
            className="bg-white rounded-lg overflow-hidden mb-10">
               <img
                  src="/medicognize.png"
                  alt="image"
                  className="w-full"
                  />
               <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <motion.h3
                  initial={{x: 200}}
               whileInView={{x: 0, transition: {duration: 0.8, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}>
                     <a
                        href="javascript:void(0)"
                        className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                      MediCognize
                     </a>
                  </motion.h3>
                  <motion.p 
                  initial={{y: 200}}
               whileInView={{y: 0, transition: {duration: 1, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}
                  className="text-base text-body-color leading-relaxed mb-7">
                  Step into the world of AI and healthcare with MediCognize! Witness how AI models evaluate medical data to classify health conditions. This hands-on experience showcases the role of AI in medical diagnostics, shedding light on the possibilities of technology in healthcare.
                  </motion.p>
                  <motion.a
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1, transition: {duration: 2}}}
                     href="javascript:void(0)"
                     className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black hover:font-semibold
                     "
                     >
                  Explore More
                  </motion.a>
               </div>
            </motion.div>
         </motion.div>
         <motion.div 
         initial={{ y: 200 }} // Initial animation state (opacity: 0 for fade-in effect, y: 200 for lifting from bottom)
         whileInView={{y: 0 }}   // Animation state to transition to (opacity: 1 for full visibility, y: 0 for lifting to original position)
         transition={{ duration: 0.8 }}
         className="w-full md:w-1/2 xl:w-1/3 px-4 transform hover:transition-opacity hover:opacity-75">
            <motion.div 
            // initial={{x:200}}
            // whileInView={{x:0, transition: {duration: 1, ease: 'easeInOut'}}}
            className="bg-white rounded-lg overflow-hidden mb-10">
               <img
                  src="/aniclassify.png"
                  alt="image"
                  className="w-full"
                  />
               <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <motion.h3
                  initial={{x: 200}}
               whileInView={{x: 0, transition: {duration: 0.8, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}>
                     <a
                        href="javascript:void(0)"
                        className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     AniClassify
                     </a>
                  </motion.h3>
                  <motion.p 
                  initial={{y: 200}}
               whileInView={{y: 0, transition: {duration: 1, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}
               className="text-base text-body-color leading-relaxed mb-7">
                  Discover the magic of AI and image recognition through AniClassify! Witness how AI identifies animals in images, demonstrating the capabilities of machine learning. This interactive feature highlights AI's ability to comprehend visual content.
                  </motion.p>
                  <motion.a
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1, transition: {duration: 2}}}
                     href="javascript:void(0)"
                     className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black hover:font-semibold
                     "
                     >
                  Explore More
                  </motion.a>
               </div>
            </motion.div>
         </motion.div>
         <motion.div 
         initial={{ y: 200 }} // Initial animation state (opacity: 0 for fade-in effect, y: 200 for lifting from bottom)
         whileInView={{y: 0 }}   // Animation state to transition to (opacity: 1 for full visibility, y: 0 for lifting to original position)
         transition={{ duration: 0.8 }}
         className="w-full md:w-1/2 xl:w-1/3 px-4 transform hover:transition-opacity hover:opacity-75">
            <motion.div 
            // initial={{x:200}}
            // whileInView={{x:0, transition: {duration: 1, ease: 'easeInOut'}}}
            className="bg-white rounded-lg overflow-hidden mb-10">
               <img
                  src="/sentix.png"
                  alt="image"
                  className="w-full"
                  />
               <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <motion.h3
                  initial={{x: 200}}
               whileInView={{x: 0, transition: {duration: 0.8, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}>
                     <a
                        href="javascript:void(0)"
                        className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     Sentix
                     </a>
                  </motion.h3>
                  <motion.p 
                  initial={{y: 200}}
               whileInView={{y: 0, transition: {duration: 1, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}
                  className="text-base text-body-color leading-relaxed mb-7">
                  Dive into AI and sentiment analysis with Sentix! Observe how AI analyzes text to gauge sentiment, offering insights into user opinions. This feature exemplifies how AI can comprehend human emotions from text, making technology relatable.
                  </motion.p>
                  <motion.a
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1, transition: {duration: 2}}}
                     href="javascript:void(0)"
                     className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black hover:font-semibold
                     "
                     >
                  Explore More
                  </motion.a>
               </div>
            </motion.div>
         </motion.div>
         <motion.div 
         initial={{ y: 200 }} // Initial animation state (opacity: 0 for fade-in effect, y: 200 for lifting from bottom)
         whileInView={{y: 0 }}   // Animation state to transition to (opacity: 1 for full visibility, y: 0 for lifting to original position)
         transition={{ duration: 0.8 }}
         className="w-full md:w-1/2 xl:w-1/3 px-4 transform hover:transition-opacity hover:opacity-75">
            <motion.div 
            initial={{x:200}}
            whileInView={{x:0, transition: {duration: 1, ease: 'easeInOut'}}}
            className="bg-white rounded-lg overflow-hidden mb-10">
               <img
                  src="/cryptorush.png"
                  alt="image"
                  className="w-full"
                  />
               <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <motion.h3
                  initial={{x: 200}}
               whileInView={{x: 0, transition: {duration: 0.8, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}>
                     <a
                        href="javascript:void(0)"
                        className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     CryptoRush
                     </a>
                  </motion.h3>
                  <motion.p 
                  initial={{y: 200}}
               whileInView={{y: 0, transition: {duration: 1, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}
                  className="text-base text-body-color leading-relaxed mb-7">
                  Experience blockchain technology with CryptoRush! Engage in a playful game of predicting cryptocurrency prices. This interactive activity showcases the transparency and decentralization of blockchain while exploring the exciting world of cryptocurrencies.
                  </motion.p>
                  <motion.a
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1, transition: {duration: 2}}}
                     href="javascript:void(0)"
                     className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black hover:font-semibold
                     "
                     >
                  Explore More
                  </motion.a>
               </div>
            </motion.div>
         </motion.div>
         <motion.div 
         initial={{ y: 200 }} // Initial animation state (opacity: 0 for fade-in effect, y: 200 for lifting from bottom)
         whileInView={{y: 0 }}   // Animation state to transition to (opacity: 1 for full visibility, y: 0 for lifting to original position)
         transition={{ duration: 0.8 }}
         className="w-full md:w-1/2 xl:w-1/3 px-4 transform hover:transition-opacity hover:opacity-75">
                        <motion.div 
            // initial={{x:200}}
            // whileInView={{x:0, transition: {duration: 1, ease: 'easeInOut'}}}
            className="bg-white rounded-lg overflow-hidden mb-10">
               <img
                  src="/aisematicsearch.png"
                  alt="image"
                  className="w-full"
                  />
               <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <motion.h3
                  initial={{x: 200}}
               whileInView={{x: 0, transition: {duration: 0.8, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}>
                     <a
                        href="javascript:void(0)"
                        className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     AI-Semantic Search
                     </a>
                  </motion.h3>
                  <motion.p 
                  initial={{y: 200}}
               whileInView={{y: 0, transition: {duration: 1, ease: 'easeInOut'}}}
               whileHover={{scale: 1.1, transition: {duration: 0.3, ease: 'easeIn'}}}
                  className="text-base text-body-color leading-relaxed mb-7">
                  Unlock Knowledge with AI-SemanticSearch! Explore the AI universe like never before with SemanticSearch. Unveil insights, learn concepts, and stay ahead in the AI game. Unleash your curiosity, and let SemanticSearch redefine your AI journey. Search, learn, and conquer with confidence.
                  </motion.p>
                  <motion.a
                  initial={{opacity: 0}}
                  whileInView={{opacity: 1, transition: {duration: 2}}}
                     href="javascript:void(0)"
                     className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black hover:font-semibold
                     "
                     >
                  Explore more
                  </motion.a>
               </div>
            </motion.div>
         </motion.div>
      </motion.div>
   </div>
</section>
    )
};

export default FeaturesCard;