import { SwitchProvider, useSwitch } from "./contexts/SwitchContext";
import Header from "./elements/Header";
import FreeMode from "./page/FreeMode";
import NormalMode from "./page/NormalMode";


const AppContent = () => {
  const { enabled } = useSwitch();
  return <div className="mt-8">{!enabled ? <FreeMode /> : <NormalMode />}</div>;
};

const targetPublicKey = import.meta.env.VITE_TARGET_PUBLIC_KEY; // Chiave target dichiarata
console.log("Target public key:", targetPublicKey);
function App() {
  return (
    <SwitchProvider>
      <div className="pb-8 flex flex-col min-h-screen h-auto bg-amber-300 overflow-x-hidden select-none font-title">
        <Header />
        <AppContent />
      </div>
    </SwitchProvider>
  );
}

export default App;
