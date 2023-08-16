import React, { FC } from "react";
import HomeFortune from "./HomeFortune";
import { X } from "react-feather";
import AniClassify from "./AniClassify";
import Sentix from "./Sentix";

interface FeatureModalProps {
  activeFeature: string | null;
  onClose: () => void;
}

const FeatureModal: FC<FeatureModalProps> = ({ activeFeature, onClose }) => {
  // Determine which content to display based on the active feature
  const renderContent = () => {
    switch (activeFeature) {
      case "homeFortune":
        return <HomeFortune />;
      case "aniclassify":
        return <AniClassify />;
      case "sentix":
        return <Sentix />
      // Add cases for other features
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center shadow-lg justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={onClose}
          className="absolute top-0 right-90 m-4 text-red-500 font-semibold hover:text-gray-700 hover:scale-125 transition duration-300 ease-in-out"
        >
         X Close
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default FeatureModal;
