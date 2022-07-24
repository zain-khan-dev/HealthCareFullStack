import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import EmployeeLogin from "./Containers/EmployeeLogin"
import OrganisationPanel from "./Containers/OrganisationPanel"
import Home from './Containers/Home';
import VenueList from './Containers/VenueList';
import Slot from './Containers/Slot';
import VenueAdd from "./Containers/VenueAdd";
import AddSlot from "./Containers/AddSlot";
import EmployeeOps from "./Containers/EmployeeOps";
import { EMPLOYEE, ORGANISATION } from "./utils/Constants";
import UpdateSlot from "./Containers/UpdateSlot"
import EmployeeCreate from "./Containers/EmployeeCreate"


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/panel" element={<EmployeeOps />} />
          <Route path="/employee/venue" element={<VenueList type={EMPLOYEE} />} />
          <Route path="/employee/slot" element={<Slot type={EMPLOYEE} />} />
          <Route path="/employee/create" element={<EmployeeCreate />} />
          <Route path="/employee/slot/add" element={<AddSlot />} />
          <Route path="/employee/slot/update/:slotId" element={<UpdateSlot />} />
          <Route path="/organisation" element={<OrganisationPanel />} />
          <Route path="/organisation/venue" element={<VenueList type={ORGANISATION} />} />
          <Route path="/organisation/venue/add" element={<VenueAdd />} />
          <Route path="/organisation/slot" element={<Slot type={ORGANISATION} />} />
        </Routes>
      </Router>      
    </div>
  )
}

export default App;
