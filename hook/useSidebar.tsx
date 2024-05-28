import React, { useState } from 'react'

const useSidebar = () => {
  
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const optionSelect = (option: number) => {
    setSelectedOption(prevOption => (prevOption === option ? null : option));
  };

  return { selectedOption, optionSelect };
}


export default useSidebar
