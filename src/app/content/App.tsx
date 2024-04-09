import { Toolbar } from './components/Toolbar'
import { DataPanel } from './components/DataPanel'
import { MaskLayer } from './components/MaskLayer'
import { SetupPopup } from './components/SetupPopup'
// import { LogPanel } from './components/LogPanel'
import { Toaster } from '@/components/ui/Sonner'

export default function App() {
  return (
    <>
      <MaskLayer></MaskLayer>
      <Toolbar></Toolbar>
      <DataPanel></DataPanel>
      {/* <LogPanel></LogPanel> */}
      <SetupPopup></SetupPopup>
      <Toaster richColors offset="104px" position="top-center"></Toaster>
    </>
  )
}
