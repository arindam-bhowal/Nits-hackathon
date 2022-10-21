import {
    ChevronRightOutlined,
    DashboardOutlined,
    ShowChart,
    Layers,
    LogoutOutlined,
    Quiz,
    LocalFireDepartment,
    Co2,
  } from "@mui/icons-material";
  import { Button } from "@mui/material";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import "./sidebar.scss";
  
  const Sidebar = () => {
    const navigate = useNavigate()
    // All useStates
    const [isToggled, setisToggled] = useState(false);
  
  
    // For toggling button
    const handleToggle = () => {
      setisToggled(!isToggled);
    };
  
    const handleLogout = () => {
      localStorage.removeItem('admin')
      navigate(0)
    }
  
    return (
      <>
        <nav className={`sidebar ${!isToggled && "close"}`}>
          <header>
            <div className="image-text">
              {/* <span className="image"><img src="/assets/logo.png" alt="" /></span> */}
              <div clareact-roussName="text logo-text">
                <span className="name">🚩Red Flags</span>
              </div>
            </div>
            <ChevronRightOutlined
              className="bx bx-chevron-right toggle"
              onClick={handleToggle}
            />
          </header>
          <div className="menu-bar">
            <div className="menu">
              <ul className="menu-links">
  
                <li className="nav-link">
                  <Link to="/">
                    <Layers className="sidebar-icon" />
                    <span className="text nav-text">Maps</span>
                  </Link>
                </li>
  
                <li className="nav-link">
                  <Link to="/charts">
                    <ShowChart className="sidebar-icon" />
                    <span className="text nav-text">Charts</span>
                  </Link>
                </li>
  
                <li className="nav-link">
                  <Link to="/quiz">
                    <Quiz className="sidebar-icon" />
                    <span className="text nav-text">Quiz</span>
                  </Link>
                </li>
                
                <li className="nav-link">
                  <Link to="/emission">
                    <Co2 className="sidebar-icon" />
                    <span className="text nav-text">Calculator</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="bottom-content">
              <li className="">
                <Button onClick={handleLogout}>
                  <LogoutOutlined className="sidebar-icon" />
                  <span className="text nav-text">Logout</span>
                </Button>
              </li>
  
            </div>
          </div>
        </nav>
      </>
    );
  };
  
  export default Sidebar;