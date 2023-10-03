import React, { FC } from "react";
import HomeFortune from "./HomeFortune";
import AniClassify from "./AniClassify";
import Sentix from "./Sentix";
import SemanticSearch from "./SemSearch";
import MedicognizePopup from "./MediCognize";

interface FeatureModalProps {
  activeFeature: string | null;
  onClose: () => void;
}

const FeatureModal: FC<FeatureModalProps> = ({ activeFeature, onClose }) => {
  // Determine which content to display based on the active feature
  const renderContent = () => {
    switch (activeFeature) {
      case "homeFortune":
        return <HomeFortune onClose={onClose} />;
      case "aniclassify":
        return <AniClassify onClose={onClose} />;
      case "sentix":
        return <Sentix onClose={onClose} />
      case "semsearch":
        return <SemanticSearch onClose={onClose} />
      case "medicognize":
        return <MedicognizePopup onClose={onClose} />
      // Add cases for other features
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center shadow-lg justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default FeatureModal;
