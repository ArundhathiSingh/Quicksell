import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Popover } from "react-tiny-popover";
import FilterSVG from "../../assets/svg/filter.svg";
import ArrowUp from "../../assets/svg/arrow-up.svg";
import ArrowDown from "../../assets/svg/arrow-down.svg";
import Select from "react-select";

const GroupingOptions = [
  { value: "status", label: "Status" },
  { value: "user", label: "User" },
  { value: "priority", label: "Priority" },
];

const OrderingOptions = [
  { value: "priority", label: "Priority" },
  { value: "title", label: "Title" },
];

const Navbar = ({ filterState, setFilterState }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid lightgray",
      backgroundColor: "white",
      minWidth: "120px",
    }),
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.status_selector_button}>
        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom", "right"]}
          padding={10}
          reposition={true}
          onClickOutside={() => setIsPopoverOpen(false)}
          content={({ position, nudgedLeft, nudgedTop }) => (
            <div className={styles.statusfilter}>
              {/* filter 1 */}
              <div className={styles.filterGrp}>
                <div className="p4 color-gray-2">Grouping</div>
                <div className="p4">
                  <Select
                    styles={selectStyles}
                    options={GroupingOptions}
                    value={filterState.grouping}
                    onChange={(e) => {
                      localStorage.setItem(
                        "filterState",
                        JSON.stringify({ ...filterState, grouping: e })
                      );
                      setFilterState((o) => ({ ...o, grouping: e }));
                    }}
                  />
                </div>
              </div>
              {/* filter 2 */}
              <div className={styles.filterGrp}>
                <div className="p4 color-gray-2">Ordering</div>
                <div className="p4">
                  <Select
                    styles={selectStyles}
                    options={OrderingOptions}
                    value={filterState.ordering}
                    onChange={(e) => {
                      localStorage.setItem(
                        "filterState",
                        JSON.stringify({ ...filterState, ordering: e })
                      );
                      setFilterState((o) => ({ ...o, ordering: e }));
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        >
          <button
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className={styles.statusBtn}
          >
            <img
              src={FilterSVG}
              alt="horizontal-settings-mixer--v1"
              style={{ height: 15, width: 15 }}
              fill="white"
            />
            <div className="p4">Display</div>
            <img src={ArrowDown} alt="chevron-down" style={{ height: 15, width: 15 }} />
          </button>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
