import { useTranslation } from "react-i18next";
import { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";

function SelectLanguageButton() {
  const { i18n } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language || "ko"
  );

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <LanguageIcon
        onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
        style={{
          color: "#4f4f4f",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#ebebeb",
          padding: "8px",
        }}
      >
        {selectedLanguage === "ko" ? "한국어" : "English"}
      </LanguageIcon>

      {isLanguageMenuOpen && (
        <div className="absolute right-0 bg-white rounded-md shadow-lg bottom-[50px]">
          <button
            className="w-20 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleLanguageChange("ko")}
          >
            한국어
          </button>
          <button
            className="w-20 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleLanguageChange("en")}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}

export default SelectLanguageButton;
