import Form from "./components/Form";
import Header from "./components/Header";
import { Kanban } from "./components/Kanban";
import { useEffect } from "react";
import { createContext , useState} from "react";



interface AppContextProps {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps | null>(null); 


function App() {
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    // Check if 'cases' exists in localStorage that is in case we don`t use an api 
    const cases = localStorage.getItem('cases');
    // If 'cases' doesn't exist, initialize it as an empty array
    if (!cases) {
      localStorage.setItem('cases', JSON.stringify([]));
    }
  }, []);
  return (
    <AppContext.Provider value={{refresh,setRefresh}}>
    <div className="bg-[#d3e5ed] min-h-[100vh] p-5 overflow-y-scroll overflow-x-hidden max-w-[100vw]">
        <Header /> 
      <div className="flex flex-col lg:flex-row w-full gap-4  h-[85vh] overflow-hidden">
        <Form /> {/* Form Section */}
        <Kanban /> {/* Kanban Board Section */}
      </div>
    </div>
    </AppContext.Provider>
  );
}

export default App;
