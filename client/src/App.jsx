import { useState } from 'react';
import { Button } from './components/ui/button';
import { Modal } from './components/Modal';

const App = () => {
  const [isOpen, isSetOpen] = useState(false);
  return (
    <>
      <Button onClick={()=> isSetOpen((open)=>!open)}>Demo</Button>
      <Modal isOpen={isOpen} setIsOpen={isSetOpen} />
    </>
  );
};

export default App;
