import React, {useState,useEffect} from 'react'
import { FaWindowClose } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import subCategories from "../assets/subCategories.js"

import {
  FaUniversity, FaGift, FaBriefcase, FaGraduationCap, FaLaptopCode, FaRegMoneyBillAlt,
  FaBus, FaStethoscope, FaMobileAlt, FaHeart, FaFilm, FaDumbbell, FaHandsHelping,
  FaHospital, FaMoneyCheckAlt, FaUtensils, FaTools, FaShoppingBag, FaUserGraduate,
  FaWifi, FaRegLaughBeam, FaPiggyBank, FaPeopleCarry, FaDollarSign, FaSearch  
} from "react-icons/fa";

import { MdWork, MdVolunteerActivism, MdSchool, MdOutlineHealthAndSafety } from "react-icons/md";

const incomeCategoryIcons = {
  "Family support": <FaHandsHelping />,
  "Scholarships/Grants": <FaGift />,
  "Personal Income": <FaDollarSign />,
  "Internships": <FaBriefcase />,
  "Freelancing/Gigs": <FaLaptopCode />,
  "Business Income": <FaPiggyBank />,
  "Passive Income": <FaRegMoneyBillAlt />,
  "Government Income": <FaUniversity />
};

const expenseCategoryIcons = {
  "Tuition": <MdSchool />,
  "Essentials": <FaShoppingBag />,
  "Food": <FaUtensils />,
  "Course material": <FaGraduationCap />,
  "Technology": <FaLaptopCode />,
  "Transportation": <FaBus />,
  "Medical and Health Expenses": <FaStethoscope />,
  "Cell Phone and Communication": <FaMobileAlt />,
  "Personal Care": <FaRegLaughBeam />,
  "Loan Payments": <FaMoneyCheckAlt />,
  "Entertainment and Subscriptions": <FaFilm />,
  "Fitness and Health": <FaDumbbell />,
  "Gifts": <FaGift />,
  "Romance": <FaHeart />,
  "Emergency Expenses": <MdOutlineHealthAndSafety />
};

const NewEntryModalWindow = ({ isOpen, onClose, onSaveEntry }) => {

  const HOURLY_RATE = 435000; // IRR per hour
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState('');
  const [showCenterSection, setShowCenterSection] = useState(false)

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selectedEntryType, setSelectedEntryType] = useState(''); // 'income' or 'expense'
  
  const categoriesWithIcons =
    selectedEntryType === 'income' ? incomeCategoryIcons : expenseCategoryIcons;


  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategorySearch, setSubCategorySearch] = useState('');
  const [showSubDropdown, setShowSubDropdown] = useState(false);

  

    // Handle save click
  const handleSave = () => {if (!amount || !selectedEntryType) {
    alert("Please select Income or Expense and enter an amount.");
    return;
  }

  const numericAmount = parseInt(amount.replace(/,/g, ''), 10);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }

  if (!selectedCategory) {
    alert("Please select a category.");
    return;
  }

  const availableSubCategories = subCategories[selectedCategory];
  const subRequired = Array.isArray(availableSubCategories) && availableSubCategories.length > 0;

  if (subRequired && !subCategorySearch.trim()) {
    alert("Please select a subcategory.");
    return;
  }

  // Create new entry object
  const newEntry = {
    id: Date.now(),
    amount: numericAmount,
    type: selectedEntryType,
    category: selectedCategory,
    subcategory: subCategorySearch || '',
    categoryIcon: categoriesWithIcons[selectedCategory] || null,
  };

  setEntries((prevEntries) => [...prevEntries, newEntry]);

  if (onSaveEntry) {
    onSaveEntry(newEntry);
  }

  // Reset view to start again
  setShowInput(true);
  setSelectedEntryType('');
  setAmount('');
  setSelectedCategory('');
  setSubCategorySearch('');
  setDropdownOpen(false);}

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      }
    };


  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]); 

  const [entries, setEntries] = useState([]);
  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };


  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  })

    // Reset state when modal closes
    useEffect(() => {
      if (!isOpen) {
        setShowInput(false);
        setAmount('');
        // Leave showCenterSection alone so it stays true after saving
        setSelectedCategory('');
        setSubCategorySearch('');
        setShowCenterSection(false);
      }
    }, [isOpen]);

  // 👇 Helper function to format numbers with commas
  const formatNumber = (value) => {
    // Remove anything that's not a digit
    const cleanedValue = value.replace(/,/g, '').replace(/\D/g, '');
    if (!cleanedValue) return '';
    return parseInt(cleanedValue, 10).toLocaleString('en-US');
  };

  const handleAmountChange = (e) => {
    const formatted = formatNumber(e.target.value);
  setAmount(formatted);

  const numeric = parseInt(formatted.replace(/,/g, ''), 10);
  if (!isNaN(numeric) && numeric > 0 && !showCenterSection) {
    setShowCenterSection(true); // only show it once, don’t hide again
  }
  };

   // 👇 Helper to calculate work hours
  const calculateHours = (amountStr) => {
    const numeric = parseInt(amountStr.replace(/,/g, '')) || 0;
    return numeric / HOURLY_RATE;
  };

  // Handle selecting income or expense
  const handleSelectEntryType = (type) => {
    setSelectedEntryType(type);
    setShowInput(true);
    setAmount('');
  };

  const filteredSubCategories = selectedCategory && Array.isArray(subCategories[selectedCategory])
  ? subCategories[selectedCategory]?.filter((sub) =>
      sub.toLowerCase().includes(subCategorySearch.toLowerCase())
    )
  : [];


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-black z-40" />
        
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.1, ease: "easeOut" }} className="absolute top-40 shadow-2xl rounded-lg p-8 w-[1000px] h-[450px] flex flex-col items-center justify-center z-50 bg-primary" drag dragConstraints={{ top: -10, bottom: 10, left: -50, right: 80 }} dragElastic={0.2} dragMomentum={false}>


            <FaWindowClose onClick={onClose} size={34} className='text-gold icon-default hover:icon-hover cursor-pointer absolute top-4 right-4' />

            {/* Content divided into 3 sections */}
            <div className="flex flex-row w-full h-full">

               {/* Left Section */}
               <div className="flex-1 flex flex-col items-center pt-8 text-gold space-y-4">
                {/* Highlight buttons if selected */}
                <button
                  className={`border-2 px-4 py-2 rounded w-70 font-bold cursor-pointer
                    ${selectedEntryType === 'income' ? 'selected-button' : 'bg-black text-gold border-gold'}`}
                  onClick={() => handleSelectEntryType('income')}
                >
                  Income
                </button>

                <button
                  className={`border-2 px-4 py-2 rounded w-70 font-bold cursor-pointer
                    ${selectedEntryType === 'expense' ? 'selected-button' : 'bg-black text-gold border-gold'}`}
                  onClick={() => handleSelectEntryType('expense')}
                >
                  Expense
                </button>

                {showInput && (
                  <>
                    <div className="mt-4 flex items-center border-2 border-gold rounded w-70 bg-black overflow-hidden">
                      <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount"
                        className="px-4 py-2 bg-black text-gold border-1 focus:outline-none w-full"
                      />
                      <span className="px-3 py-2 bg-black text-gold border-1 border-gold font-bold">IRT</span>
                    </div>

                    {amount && (
                      <p className="text-sm text-gold mt-2">
                        This costs you {calculateHours(amount).toFixed(1)} hours of work.
                      </p>
                    )}

                    <div className="flex space-x-4 mt-0.5">

                      <button
                        className="px-6 py-2 bg-black text-gold border-2 border-gold font-semibold rounded-full hover-gold-black"
                        onClick={() => {
                          setAmount('');
                          setShowCenterSection(false);
                        }}
                      
                        
                      >
                        Clear
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Center Section */}
              <div className="flex-1 flex flex-col items-center pt-8 px-4 text-gold">
                {showCenterSection && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-72">
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="w-full px-4 py-2 bg-black text-gold border-2 border-gold rounded focus:outline-none flex justify-between items-center"
    >
      {selectedCategory ? (
        <span className="flex items-center gap-2">
          {categoriesWithIcons[selectedCategory]} {selectedCategory}
        </span>
      ) : (
        "Select a category"
      )}
      <span  className={`inline-block transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
    </button>

    {dropdownOpen && (
  <ul className="dropdown-menu absolute mt-2 w-full bg-black border-2 border-gold rounded z-10 max-h-60 overflow-y-auto">
    {Object.entries(categoriesWithIcons).map(([label, IconComponent], idx) => {
      const isSelected = selectedCategory === label;
      return (
        <li
          key={idx}
          onClick={() => {
            setSelectedCategory(label);
            setDropdownOpen(false);
          }}
          className={`dropdown-item px-4 py-2 cursor-pointer flex items-center gap-3`}
        >
          {IconComponent} {label}
        </li>
      );
    })}
  </ul>
)}
                    </div>
                    
                    <div className="relative w-72">
  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold pointer-events-none" />

  <input
    type="text"
    placeholder="Search subcategory..."
    className="w-full pl-10 pr-4 py-2 bg-black text-gold border-2 border-gold rounded focus:outline-none"
    value={subCategorySearch}
    onClick={() => setShowSubDropdown(true)} // trigger dropdown
    onBlur={() => setTimeout(() => setShowSubDropdown(false), 100)} // delay hiding so click can register
    onChange={(e) => setSubCategorySearch(e.target.value)}
    disabled={!selectedCategory}
  />

  {/* Dropdown */}
  {showSubDropdown && filteredSubCategories.length > 0 && (
    <ul className="absolute top-full left-0 mt-1 w-full bg-black border-2 border-gold rounded z-20 max-h-60 overflow-y-auto">
      {filteredSubCategories.map((sub, idx) => (
        <li
          key={idx}
          onMouseDown={() => {
            setSubCategorySearch(sub);
            setShowSubDropdown(false);
          }}
          className="px-4 py-2 cursor-pointer hover:bg-gold hover:text-black"
        >
          {sub}
        </li>
      ))}
    </ul>
  )}
</div>

  
                    
<div className="flex flex-col gap-4 mt-5 items-center">
  <button
    className="w-24 px-4 py-2 bg-black text-gold border-2 border-gold font-semibold rounded-full hover-gold-black"
    onClick={handleSave}
  >
    Save
  </button>
  <button
    className="w-60 px-4 py-2 bg-black text-gold border-2 border-gold font-semibold rounded-full hover-gold-black"
    onClick={() => {
      setSubCategorySearch('');
      setSelectedCategory('');
      setShowCenterSection(false);
      setAmount('');
    }}
  >
    New Entry
  </button>
</div>
                  </div>
                )}
              </div>
              

              {/* Right Section */}
              <div className="flex-1 flex flex-col items-center text-gold overflow-auto">
  <h2 className="mb-4">Saved Entries</h2>
  {entries.length === 0 ? (
    <p>No entries yet.</p>
  ) : (
    <ul className="w-full max-h-72 overflow-y-auto">
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-center justify-between px-4 py-2 border-b border-gold">
          <span className="flex items-center gap-2">
            {entry.categoryIcon} {entry.category}
          </span>
          <span>{entry.subcategory || '-'}</span>
          <span>{entry.amount.toLocaleString()} IRT</span>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDelete(entry.id)}
            aria-label="Delete entry"
          >
            <FaWindowClose />
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

            </div>
      
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewEntryModalWindow