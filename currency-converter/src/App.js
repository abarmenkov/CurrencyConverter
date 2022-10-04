import React from 'react';
import Header from './components/Header';
import Currency from './components/Currency';
import Converter from './components/Converter';
import { Card } from 'react-bootstrap';
import Footer from './components/Footer';

import {
  BrowserRouter as Router,
  Route, Routes,
} from 'react-router-dom';
import routes from './routes';

const App = () => {
    return (
        <Card className="h-100 d-flex flex-column">
      <Router>
        <Header />
        <Routes>
          <Route path={routes.home()} element={<Currency />}/>
          <Route path={routes.converter()} element={<Converter />}/>
        </Routes>
        <Footer />
      </Router>
        </Card>
    )
}

export default App;
