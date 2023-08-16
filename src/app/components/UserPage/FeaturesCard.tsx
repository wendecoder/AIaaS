'use client'
import React, { useState, useEffect } from "react"; 
import { motion } from "framer-motion";
import FeatureModal from "../ServiceModel/FeatureModal";
const FeaturesCard: React.FC = () => {
   const [activeFeature, setActiveFeature] = useState<string | null>(null);

   const openModal = (feature: string) => {
      setActiveFeature(feature);
      // Scroll the page to the top when the pop-up is opened
    window.scrollTo({ top: 0, behavior: "smooth" });
    };

  const closeModal = () => {
    setActiveFeature(null);
  };
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if(window.scrollY > 0){
          setScrolled(true);
        }
        else{
          setScrolled(false);
        }
      };
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [])
    return(
<section className={`pt-10 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6] ${scrolled && !activeFeature ? 'mt-24' : ''}`}>
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
                     onClick={() => openModal("homeFortune")}
                     >
                  Try The Magic
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
                  Try The Magic
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
                     onClick={() => openModal("aniclassify")}
                     >
                  Try The Magic
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
                     onClick={() => openModal("sentix")}
                     >
                  Try The Magic
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
                  Try The Magic
                  </motion.a>
               </div>
            </motion.div>
         </motion.div>
      </motion.div>
   </div>
 {/* Modal for displaying feature content */}
 {activeFeature && <FeatureModal activeFeature={activeFeature} onClose={closeModal} />}
      {/* Darkened backdrop */}
      {activeFeature && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-1000"
          onClick={closeModal}
          style={{ pointerEvents: "auto" }}
        />
      )}
</section>
    )
};

export default FeaturesCard;