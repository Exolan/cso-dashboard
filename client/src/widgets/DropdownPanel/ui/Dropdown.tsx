import { useState } from "react";

import styles from "./Dropdown.module.scss";
import Dashboard from "../../DashboardPanel/ui/Dashboard";
import type { Program } from "../../../app/types/types";

interface DropdownProps {
  programs: Program[];
}

const Dropdown = ({ programs }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.buttonBlock}>
        <button className={styles.button} onClick={() => handleClick()}>
          <h3>{isOpen ? "Спрятать" : "Показать"}</h3>
        </button>
      </div>

      {isOpen && <Dashboard programs={programs} />}
    </div>
  );
};

export default Dropdown;
