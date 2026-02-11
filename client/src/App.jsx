import { Suspense, useState } from "react";
import "./App.css"
import Website from "./pages/Website";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Layout from "./components/Layout/Layout";
import Properties from "./pages/Properties/Properties";
import Property from "./pages/Property/Property"
import AdminProperty from "./pages/AdminProperty/AdminProperty";
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from  "react-query/devtools"
import { ToastContainer } from "react-toastify";
import UserDetailContext from "./context/UserDetailContext";
import "react-toastify/dist/ReactToastify.css"
import Admin from "./pages/Admin/Admin"
import Addsubscriber from "./pages/Addsubscriber/Addsubscriber"
import Approveproperties from "./pages/Approveproperties/Approveproperties"
import AdminPropertyCard from "./components/AdminPropertyCard/AdminPropertyCard";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Favourites from "./pages/Favourites/Favourites";
import AcceptProperties from "./pages/AcceptProperties/AcceptProperties";
import RejectProperties from "./pages/RejectProperties/RejectProperties";
function App() {
  const queryClient = new QueryClient()
  const [userDetails, setUserDetails] = useState({
    favourites:[],
    bookings:[],
    token: null
  })
  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Website />} />
            <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
            </Route>
                <Route path="/admin" element={<Admin />} />
                <Route path="/addsubscriber" element={<Addsubscriber />} />
                <Route path="/approveproperties">
                <Route index element={<Approveproperties />} />
                  <Route path=":propertyId" element={<AdminProperty />} />
                </Route>
                <Route path="/acceptproperties" element={ <AcceptProperties />} />
                <Route path="/rejectproperties" element={ <RejectProperties />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
      </Routes>
      </Suspense>
      </BrowserRouter>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
      </UserDetailContext.Provider>
  );
}

export default App;
